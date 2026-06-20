/**
 * 易經占卦分析・線上版 後端（Google Apps Script）
 * --------------------------------------------------
 * 功能：
 *   1. doGet：把排盤工具當網頁 App 提供
 *   2. getLectureSegments：從打包的張慶祥老師講稿索引中，擷取相關卦象/動爻段落
 *   3. getReading：組合提示詞（含「過往校正經驗」回饋）→ 呼叫 Claude → 回傳解卦
 *   4. saveRecord：把占卦結果寫入 Google Sheets，卦象圖存到雲端硬碟
 *   5. listRecords / updateOutcome：歷史紀錄、回填實際結果（占卦邏輯的回饋校正）
 *
 * 第一次使用：在編輯器選 setup 執行一次，會自動建立試算表與圖片資料夾。
 * 設定 Claude 金鑰：專案設定 → 指令碼屬性 → 新增 ANTHROPIC_API_KEY（可選 CLAUDE_MODEL）。
 */

// ---- 常數 ----
var PROP = PropertiesService.getScriptProperties();
var SHEET_RECORDS = '占卦紀錄';
var SHEET_RULES = '校正知識庫';
var DEFAULT_MODEL = 'claude-opus-4-8';
var RECORD_HEADERS = [
  '紀錄ID', '建立時間', '主題', '性別', '國曆時間', '四柱',
  '本卦', '變卦', '動爻', '世應/用神', '六爻明細',
  '卦象圖', 'AI占斷', '實際發生', '準確度(1-5)', '校正筆記', '回填時間'
];

// ============ 1. 網頁進入點 ============
function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setTitle('易經占卦分析')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// 讓 Index.html 用 <?!= include('檔名') ?> 引入其他 HTML 檔
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ============ 2. 設定 / 初始化 ============
function setup() {
  var ss = ensureSpreadsheet_();
  var folder = ensureFolder_();
  var msg = '初始化完成。\n\n試算表：' + ss.getUrl() + '\n圖片資料夾：' + folder.getUrl() +
    '\n\n別忘了到「專案設定 → 指令碼屬性」新增 ANTHROPIC_API_KEY 才能用 AI 解卦。';
  Logger.log(msg);
  return msg;
}

function getConfig() {
  return {
    hasApiKey: !!PROP.getProperty('ANTHROPIC_API_KEY'),
    model: PROP.getProperty('CLAUDE_MODEL') || DEFAULT_MODEL,
    sheetUrl: PROP.getProperty('SHEET_ID') ? SpreadsheetApp.openById(PROP.getProperty('SHEET_ID')).getUrl() : ''
  };
}

function ensureSpreadsheet_() {
  var id = PROP.getProperty('SHEET_ID');
  var ss;
  if (id) {
    try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create('易經占卦紀錄');
    PROP.setProperty('SHEET_ID', ss.getId());
  }
  var rec = ss.getSheetByName(SHEET_RECORDS) || ss.insertSheet(SHEET_RECORDS);
  if (rec.getLastRow() === 0) {
    rec.appendRow(RECORD_HEADERS);
    rec.setFrozenRows(1);
    rec.getRange(1, 1, 1, RECORD_HEADERS.length).setFontWeight('bold');
  }
  var rules = ss.getSheetByName(SHEET_RULES) || ss.insertSheet(SHEET_RULES);
  if (rules.getLastRow() === 0) {
    rules.appendRow(['建立時間', '校正規則 / 心得（會自動帶入未來的解卦提示）']);
    rules.setFrozenRows(1);
    rules.getRange(1, 1, 1, 2).setFontWeight('bold');
  }
  // 預設的空白工作表清掉
  var def = ss.getSheetByName('工作表1') || ss.getSheetByName('Sheet1');
  if (def && ss.getSheets().length > 1) ss.deleteSheet(def);
  return ss;
}

function ensureFolder_() {
  var id = PROP.getProperty('FOLDER_ID');
  if (id) {
    try { return DriveApp.getFolderById(id); } catch (e) { /* fall through */ }
  }
  var folder = DriveApp.createFolder('易經占卦圖');
  PROP.setProperty('FOLDER_ID', folder.getId());
  return folder;
}

// ============ 3. 講稿擷取 ============
function extractCoreName_(guaName) {
  if (!guaName) return '';
  if (guaName.length === 4) return guaName.substring(2);
  if (guaName.length === 3) return guaName.indexOf('為') >= 0 ? guaName[0] : guaName[2];
  return guaName;
}
var CORE_VARIANTS_ = { '無妄': '无妄', '涣': '渙', '節': '節', '颐': '頤' };
function canonGua_(name) { return CORE_VARIANTS_[name] || name; }

/**
 * @param {string} guaName 本卦全名（如「天雷無妄」「乾為天」）
 * @param {string[]} moveLineNames 動爻名（如 ['初九','九五']）
 * @return {string} 組合後的講稿文字
 */
function getLectureSegments(guaName, moveLineNames) {
  var core = canonGua_(extractCoreName_(guaName));
  var part = GUA_TO_PART[core];
  if (!part) return '（講稿索引中找不到「' + core + '」卦，請確認講稿是否完整打包）';
  var data = _lecturePartByNum_(part);
  var entry = data && data[core];
  if (!entry) return '（講稿索引中找不到「' + core + '」卦）';

  var out = '';
  if (entry.gua && entry.gua.length) {
    out += '【講稿 — ' + core + ' 卦（卦象／卦辭／定義／彖象，共 ' + entry.gua.length + ' 段）】\n\n';
    out += entry.gua.map(function (s) { return '## ' + s.title + '\n' + s.body; }).join('\n\n---\n\n');
    out += '\n\n';
  }
  (moveLineNames || []).forEach(function (ln) {
    var segs = entry.lines && entry.lines[ln];
    if (segs && segs.length) {
      out += '\n【講稿 — ' + core + '·' + ln + ' 動爻（共 ' + segs.length + ' 段）】\n\n';
      out += segs.map(function (s) { return '## ' + s.title + '\n' + s.body; }).join('\n\n---\n\n');
      out += '\n\n';
    }
  });
  return out || '（找不到「' + core + '」的卦象/卦辭/定義或動爻段落）';
}

// ============ 4. AI 解卦（含回饋校正） ============
function getCorrectionContext_() {
  var notes = [];
  try {
    var ss = ensureSpreadsheet_();
    // (a) 使用者整理的校正規則
    var rules = ss.getSheetByName(SHEET_RULES);
    if (rules && rules.getLastRow() > 1) {
      var rv = rules.getRange(2, 2, rules.getLastRow() - 1, 1).getValues();
      rv.forEach(function (r) { if (r[0]) notes.push('• ' + r[0]); });
    }
    // (b) 過往已回填實際結果的案例（最近 12 筆），讓 AI 從命中/落空中學習
    var rec = ss.getSheetByName(SHEET_RECORDS);
    if (rec && rec.getLastRow() > 1) {
      var n = rec.getLastRow() - 1;
      var vals = rec.getRange(2, 1, n, RECORD_HEADERS.length).getValues();
      var done = vals.filter(function (r) { return r[13]; }); // 有「實際發生」
      done.slice(-12).forEach(function (r) {
        notes.push('• 主題「' + r[2] + '」得【' + r[6] + (r[8] ? ' ' + r[8] : '') +
          '】，當時占斷重點：' + truncate_(r[12], 120) +
          '；實際發生：' + r[13] + (r[14] ? '（準確度' + r[14] + '/5）' : '') +
          (r[15] ? '；校正：' + r[15] : ''));
      });
    }
  } catch (e) { /* 校正資料讀取失敗不阻斷解卦 */ }
  return notes;
}

function buildPrompt_(p, lecture, corrections) {
  var corrBlock = corrections.length
    ? '\n【過往校正經驗（請從這些命中與落空中學習，調整你的判斷傾向，避免重複偏誤）】\n' + corrections.join('\n') + '\n'
    : '';
  return '(1) 64卦，為何神明會用【' + p.guaName + '】來表示？這個象的意涵為何？' +
    '(通常卦辭是指占卦事情的大環境、背景。爻辭是指在此大環境下占者所佔的時位。)' +
    '也利用卦序推斷看看前面發生了什麼事。但十二消息卦優先參考十二消息卦陰陽消長的卦序。\n' +
    '(2) 你是一位精通《易經》六爻預測的大師，請以黃庭書院張慶祥先生的分析方向為主幹，並把卦辭、爻辭、納甲合參。\n\n' +
    '【求測背景】\n- 問題：' + p.topic + '\n- 時間：' + p.dateStr + ' (四柱：' + p.baziStr + ')\n\n' +
    '【卦象結構】\n- ' + p.hexStructure + '\n' +
    (p.shiYing ? '- ' + p.shiYing + '\n' : '') +
    corrBlock +
    '\n【張慶祥老師講稿原文】\n' + lecture + '\n\n' +
    '【解卦要求】\n' +
    '1. 請先分析世應關係、用神旺衰（參考日月建）。\n' +
    '2. 詳細解讀動爻之意（若有），以及變卦的吉凶走向。變卦要考慮三爻卦的卦氣是否相通' +
    '（先後天八卦在同位卦，或是五行相同等），來變的過去與否，不是一定很容易變過去。\n' +
    '3. 結合經文含義進行綜合判斷。\n' +
    '4. 最後請用這個格式收尾，方便事後對照：\n' +
    '   【結論】吉／凶／平 + 一句話\n' +
    '   【關鍵時間】（可能應期，如某地支月/日，或事件轉折時機）\n' +
    '   【建議】具體可行動的建議\n' +
    '語氣請專業且溫暖。';
}

/**
 * 只組提示詞、不呼叫 AI（給「複製指令」用，或沒設金鑰時的退路）。
 */
function buildReadingPrompt(p) {
  var lecture = getLectureSegments(p.guaName, p.moveLineNames || []);
  return buildPrompt_(p, lecture, getCorrectionContext_());
}

/**
 * 組提示詞並呼叫 Claude，回傳 { prompt, reading }。
 */
function getReading(p) {
  var prompt = buildReadingPrompt(p);
  var apiKey = PROP.getProperty('ANTHROPIC_API_KEY');
  if (!apiKey) {
    return { prompt: prompt, reading: '', error: '尚未設定 ANTHROPIC_API_KEY，無法自動解卦。請改用「複製指令」貼到 AI，或於指令碼屬性設定金鑰。' };
  }
  var model = PROP.getProperty('CLAUDE_MODEL') || DEFAULT_MODEL;
  var resp = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    contentType: 'application/json',
    muteHttpExceptions: true,
    headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    payload: JSON.stringify({
      model: model,
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  var code = resp.getResponseCode();
  var data = JSON.parse(resp.getContentText());
  if (code !== 200) {
    return { prompt: prompt, reading: '', error: 'AI 回應錯誤(' + code + ')：' + (data.error && data.error.message || resp.getContentText()) };
  }
  var reading = (data.content || []).map(function (c) { return c.text || ''; }).join('\n').trim();
  return { prompt: prompt, reading: reading };
}

// ============ 5. 存檔 / 歷史 / 回饋 ============
function saveRecord(p) {
  var ss = ensureSpreadsheet_();
  var sheet = ss.getSheetByName(SHEET_RECORDS);
  var id = Utilities.getUuid().slice(0, 8);

  var imageLink = '';
  if (p.imageData) {
    try {
      var folder = ensureFolder_();
      var base64 = p.imageData.replace(/^data:image\/\w+;base64,/, '');
      var blob = Utilities.newBlob(Utilities.base64Decode(base64), 'image/png', (p.filename || ('卦象_' + id)) + '.png');
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      imageLink = file.getUrl();
    } catch (e) {
      imageLink = '（存圖失敗：' + e.message + '）';
    }
  }

  sheet.appendRow([
    id, new Date(), p.topic || '', p.gender || '', p.dateStr || '', p.baziStr || '',
    p.guaName || '', p.changedGua || '', (p.moveLineNames || []).join('、') || '靜卦',
    p.shiYing || '', p.linesDetail || '',
    imageLink, p.reading || '', '', '', '', ''
  ]);
  return { recordId: id, imageUrl: imageLink, sheetUrl: ss.getUrl() };
}

function listRecords(limit) {
  var ss = ensureSpreadsheet_();
  var sheet = ss.getSheetByName(SHEET_RECORDS);
  if (!sheet || sheet.getLastRow() < 2) return [];
  var n = sheet.getLastRow() - 1;
  var vals = sheet.getRange(2, 1, n, RECORD_HEADERS.length).getValues();
  var rows = vals.map(function (r) {
    return {
      recordId: r[0],
      created: r[1] ? Utilities.formatDate(new Date(r[1]), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm') : '',
      topic: r[2], gender: r[3], dateStr: r[4], bazi: r[5],
      gua: r[6], changedGua: r[7], moveLines: r[8], shiYing: r[9],
      imageUrl: r[11], reading: r[12], outcome: r[13], accuracy: r[14], correction: r[15]
    };
  });
  rows.reverse(); // 新→舊
  return rows.slice(0, limit || 50);
}

function updateOutcome(p) {
  var ss = ensureSpreadsheet_();
  var sheet = ss.getSheetByName(SHEET_RECORDS);
  var ids = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 0), 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (ids[i][0] === p.recordId) {
      var row = i + 2;
      sheet.getRange(row, 14).setValue(p.outcome || '');       // 實際發生
      sheet.getRange(row, 15).setValue(p.accuracy || '');      // 準確度
      sheet.getRange(row, 16).setValue(p.correction || '');    // 校正筆記
      sheet.getRange(row, 17).setValue(new Date());            // 回填時間
      // 校正筆記也匯入知識庫，讓未來解卦帶入
      if (p.correction) {
        ss.getSheetByName(SHEET_RULES).appendRow([new Date(), p.correction]);
      }
      return { ok: true };
    }
  }
  return { ok: false, error: '找不到紀錄 ' + p.recordId };
}

// ============ 工具 ============
function truncate_(s, n) {
  s = String(s || '');
  return s.length > n ? s.slice(0, n) + '…' : s;
}
