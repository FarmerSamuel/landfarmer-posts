/**
 * 把張慶祥老師的易經 MD 講稿，預先處理成 GAS 後端可查詢的索引，
 * 並切成數個 ~1MB 的 Lectures*.gs 區塊檔（避免單一檔過大）。
 *
 * 用法：
 *   1. 把 MD 講稿資料夾（含 易經_001-020.md ... 易經_641-658.md）放好
 *   2. node tools/build-lectures.mjs <MD資料夾路徑>
 *      （省略路徑時，預設讀 ./講稿MD）
 *
 * 產出：iching/Lectures1.gs ... LecturesN.gs，每檔一個 _lecturePartN_() 函式。
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..');
const SRC = process.argv[2] || join(OUT_DIR, '講稿MD');

if (!existsSync(SRC)) {
  console.error(`找不到講稿資料夾：${SRC}\n用法：node tools/build-lectures.mjs <MD資料夾路徑>`);
  process.exit(1);
}

const GUA_NAMES = [
  '乾','坤','屯','蒙','需','訟','師','比','小畜','履','泰','否','同人','大有','謙','豫',
  '隨','蠱','臨','觀','噬嗑','賁','剝','復','无妄','大畜','頤','大過','坎','離','咸','恆',
  '遯','大壯','晉','明夷','家人','睽','蹇','解','損','益','夬','姤','萃','升','困','井',
  '革','鼎','震','艮','漸','歸妹','豐','旅','巽','兌','渙','節','中孚','小過','既濟','未濟'
];
const VARIANTS = {
  '無妄': '无妄', '涣': '渙', '节': '節', '颐': '頤', '谦': '謙',
  '蛊': '蠱', '贲': '賁', '剥': '剝', '复': '復', '随': '隨', '临': '臨', '观': '觀',
};
const ALL_NAMES = [...GUA_NAMES, ...Object.keys(VARIANTS)].sort((a, b) => b.length - a.length);
const toCanonical = (n) => VARIANTS[n] || n;
const LINE_NAMES = ['初九','初六','九二','六二','九三','六三','九四','六四','九五','六五','上九','上六'];
const GUA_KEYWORDS = ['卦象','卦辭','定義','總綱','總論','原文','彖辭','彖','大象辭','象辭','象'];

const stripNum = (t) => t.replace(/^\s*\d+\s*[.．]\s*/, '').trim();

function matchGua(title) {
  for (const name of ALL_NAMES) {
    if (title.startsWith(name + '卦')) return { name: toCanonical(name), remainder: title.slice(name.length + 1) };
    if (title.startsWith(name)) {
      let rest = title.slice(name.length);
      if (rest.startsWith('卦')) rest = rest.slice(1);
      return { name: toCanonical(name), remainder: rest };
    }
  }
  return null;
}
function classify(remainder) {
  const r = remainder.replace(/[．‧·・\-—－：:\s]/g, '');
  for (const ln of LINE_NAMES) if (r.includes(ln)) return { type: 'line', line: ln };
  for (const kw of GUA_KEYWORDS) if (r.includes(kw)) return { type: 'gua' };
  return { type: 'gua' };
}

const index = {};
const ensure = (n) => (index[n] ||= { gua: [], lines: {} });

const files = readdirSync(SRC).filter(f => /^易經_\d/.test(f) && f.endsWith('.md'));
let matched = 0;
for (const f of files) {
  const sections = readFileSync(join(SRC, f), 'utf8').split(/^##\s+/m).slice(1);
  for (const section of sections) {
    const nl = section.indexOf('\n');
    if (nl === -1) continue;
    const rawTitle = section.slice(0, nl).trim();
    const body = section.slice(nl + 1).trim();
    const m = matchGua(stripNum(rawTitle));
    if (!m) continue;
    matched++;
    const entry = ensure(m.name);
    const cls = classify(m.remainder);
    const seg = { title: rawTitle, body };
    if (cls.type === 'line') (entry.lines[cls.line] ||= []).push(seg);
    else entry.gua.push(seg);
  }
}

const missing = GUA_NAMES.filter(n => !index[n]);
if (missing.length) console.warn('警告：以下卦找不到講稿：', missing.join(' '));

// 依每卦 JSON 大小做貪婪分箱，每箱 ~900KB
const TARGET = 900 * 1024;
const entries = Object.entries(index).map(([k, v]) => [k, v, Buffer.byteLength(JSON.stringify(v))]);
entries.sort((a, b) => b[2] - a[2]);
const bins = [];
for (const [k, v, size] of entries) {
  let bin = bins.find(b => b.size + size <= TARGET);
  if (!bin) { bin = { size: 0, obj: {} }; bins.push(bin); }
  bin.obj[k] = v;
  bin.size += size;
}

// 寫出區塊檔 + 卦→區塊 對照
const guaToPart = {};
bins.forEach((bin, i) => {
  const n = i + 1;
  Object.keys(bin.obj).forEach(k => { guaToPart[k] = n; });
  const json = JSON.stringify(bin.obj);
  const content =
`// ⚠️ 自動產生，請勿手動編輯。來源：tools/build-lectures.mjs
// 講稿區塊 ${n}／${bins.length}（含卦：${Object.keys(bin.obj).join('、')}）
function _lecturePart${n}_() {
  return ${json};
}
`;
  writeFileSync(join(OUT_DIR, `Lectures${n}.gs`), content);
  console.log(`寫出 Lectures${n}.gs  (${(bin.size / 1024).toFixed(0)} KB, ${Object.keys(bin.obj).length} 卦)`);
});

// 索引檔：卦名→區塊編號、區塊總數，以及懶載入分派器，供 Code.gs 使用
const dispatchCases = bins
  .map((_, i) => `    case ${i + 1}: return _lecturePart${i + 1}_();`)
  .join('\n');
const indexContent =
`// ⚠️ 自動產生，請勿手動編輯。來源：tools/build-lectures.mjs
var LECTURE_PART_COUNT = ${bins.length};
var GUA_TO_PART = ${JSON.stringify(guaToPart)};

// 依區塊編號取出該區塊的講稿物件（只載入需要的那一塊）
function _lecturePartByNum_(n) {
  switch (n) {
${dispatchCases}
    default: return null;
  }
}
`;
writeFileSync(join(OUT_DIR, 'LecturesIndex.gs'), indexContent);

console.log(`\n完成：${files.length} 檔、${matched} 段、${Object.keys(index).length} 卦、${bins.length} 區塊。`);
