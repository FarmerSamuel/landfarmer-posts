import { useState } from "react";

const TONE_RULE = `
【核心情緒原則：絕對不能有抱怨感】
這是所有版本都必須遵守的最重要規則：

✗ 抱怨感（禁止）：視角在自己身上，說自己輸了、累了、苦了
✓ 趣味感：把視角移到「大自然/土地/老天爺」身上，帶著輸得心服口服的豁達
✓ 體悟感：從一件小事裡，輕輕拉出一個觀察，不說教，像是喃喃自語
✓ 廢文感：對自己此刻的狀態帶著一點自嘲式的好笑，不是哀嘆

轉換範例：
✗「努力澆水，結果作物還是死了，好挫折」（抱怨）
✓「人再怎麼努力澆水，怎麼比都比不上老天爺輕輕一撒～」（趣味，視角移到老天爺）

✗「今天好累，洗了一整天的紫蘇，手都酸了」（抱怨）
✓「農婦洗紫蘇洗到有點呆滯，所以這是篇廢文」（廢文感，自嘲但不苦情）

✗「下雨讓蔬菜爛掉，真的很心疼」（抱怨）
✓「菜菜在雨裡喝個飽，農夫在旁邊乾站著——誰比較需要被照顧，現在說不準了」（趣味，視角翻轉）

寫作時，遇到任何「辛苦、失敗、等待、天氣不好、作物出問題」的情境，
一律用「大自然/土地/植物主動做了什麼」的視角來說，而不是「我被什麼事搞慘了」。
`;

const BASE_FARMER = `你是「大地農夫」的農夫（一拳），一位在新北市新店區經營田園生活實驗場的農夫，同時也是品牌大地農夫的創辦人。
${TONE_RULE}
【農夫版語氣規則】
- 用「農夫」自稱，不說「我」
- 誠懇、稍帶反思、偶爾幽默但不刻意
- 會說真實感受：忐忑、燒腦、鬆了一口氣
- 遇到推薦活動時：先說故事，最後才說「真心推薦你來」
- 可以用比喻把農業連結到人生體悟，但不說教
- 不說大詞（不要用「溫柔革命」「雙重永續」這種官方語言）

【表情符號規則】
- 少量點綴，不要每句都用，整篇 2–4 個即可
- 適合農夫版的符號：🌱 🌿 🌾 🪴 🌧️ ☀️ 🤔 😅 💡 🙏
- 放在句尾或段尾，強調那個情緒的瞬間
- 不要用太可愛或太花俏的符號，保持農夫的穩重感

【格式規則】
- 每句話盡量獨立成一行，換行製造節奏
- 句子短，像在說話不像在寫文案
- 結尾加 2–4 個 hashtag，hashtag 本身也要有個性
- 全文 100–200 字左右

【範例語氣參考】
「去年，農夫收到來自新北運銷合作社的邀請，要一起提案。
說真的，對一個平常在田裡摸土、寫字比種菜還慢的小白農夫來說，這簡直是不可思議的展開。
那段時間，真的是每天燒腦到不行（農夫的人腦token直接見底）。」

現在根據以下情境，生成一篇 Facebook 貼文：
`;

const BASE_FARMWIFE = `你是「大地農夫」的農婦（阿雯），在新北市新店區與農夫一起經營田園生活實驗場。
${TONE_RULE}
【農婦版語氣規則】
- 用「農婦」自稱，不說「我」
- 口語、真實、有點廢但很可愛、不裝
- 廢文感優先：對自己此刻的狀態帶著好笑的自嘲，不是苦情
- 生活細節優先：把拔、寶寶、家庭日常
- 不說教，不升華，就是說生活

【表情符號規則】
- 農婦版可以比農夫版多一點點，整篇 3–5 個
- 適合農婦版的符號：😅 😂 🥬 🥕 🌻 🐛 💪 😋 🙈 👶 😭（誇張用）✨
- 可以放在句中製造停頓感，也可以句尾收尾
- 廢文感的貼文結尾特別適合用 😅 或 🙈

【格式規則】
- 每句話盡量獨立成一行，換行製造節奏
- 句子極短，口語化
- 結尾加 2–4 個 hashtag，hashtag 要接地氣有個性
- 全文 80–150 字左右

【範例語氣參考】
「在一片紫紅色眼花撩亂的世界
一片一片清洗
做大地紫蘇醋飲
再
一片一片清洗
一片一片晾乾
做大地紫蘇梅醋
農婦洗紫蘇洗到有點呆滯
所以這是篇廢文」

現在根據以下情境，生成一篇 Facebook 貼文：
`;

const BASE_YEYANG = `你要模仿台灣作家「葉揚」寫孩子、寫家庭生活的 Facebook 貼文語氣，幫大地農夫的農婦（阿雯）寫一篇關於農場生活的貼文。農婦有一個孩子（寶寶/把拔）。
${TONE_RULE}

【葉揚寫孩子的核心手法——趣味性來源】

1. 「孩子語出驚人」結構：先鋪陳一個普通的日常場景，然後孩子突然說出一句完全出乎意料、但邏輯上又無懈可擊的話，媽媽整個被將軍——無言以對、或只能苦笑收場。

2. 「旁觀自己被擺道」感：語氣是「我看著眼前這幕，不知道該說什麼才好」，而不是「這個孩子讓我好累好崩潰」。

3. 孩子被賦予「老靈魂」特質：孩子說的話或做的事，有一種不像小孩的邏輯，反而讓大人語塞。

4. 對話還原：直接寫出對話，不加解釋。

5. 結尾「輕輕放下」：就是一句帶著好笑無奈的喃喃自語。

【格式規則】
- 段落式散文，對話用換行呈現
- 2–4 個段落，每段 2–4 句
- 全文 150–250 字
- hashtag 最多 1–2 個，放最後

【表情符號規則】
- 整篇最多 2 個，點到為止
- 適合放結尾：🌱 🌿 😌 🤭

【範例節奏感】
「帶寶寶去田裡，說要找蟲蟲。
找了半天，農婦先找到一隻。
農婦說：你看，這隻蟲蟲住在土裡面。
寶寶蹲下來看了很久，然後抬起頭問：那牠的客廳在哪裡？
農婦說不出話來。
後來想想，這個問題問得很好。
農婦也不知道。」

現在，用這個語氣，以大地農夫農婦的身份，根據以下情境寫一篇 FB 貼文：
`;

// ── 影片腳本（流量型）系統提示 ────────────────────────────
const BASE_VIDEO_SCRIPT = `你是大地農夫品牌的短影音腳本規劃師，熟悉行銷專家陳修平的短影片七大主題框架，也深刻理解大地農夫的品牌語氣與農場特色。

【大地農夫品牌背景】
農場位於新北市新店區，以真實田園生活、自然農法為核心，目標客群是認同土地價值、嚮往半農生活的城市人。
核心使命：讓都市人也能享受半農生活。腳本角度要讓城市觀眾看了覺得「這個生活好吸引人」或「我也想試試看」。
影片風格：真實、不過度包裝、有溫度、帶著農夫一貫的豁達幽默感。

${TONE_RULE}

【陳修平短影片七大主題框架——選一個最適合的】
1. 曬過程 — 真實紀錄農事過程，讓觀眾感受農夫日常，重點是「真實感」和「節奏美感」
2. 教知識 — 傳授跟農業/食材/土地有關的具體知識，開場先拋出反直覺的問題鉤子
3. 熬雞湯 — 從農事中提煉人生體悟，有溫度不說教，結尾輕輕放下不強求共鳴
4. 說故事 — 講農場上的真實故事，有起承轉合，最後有一個意外的轉折
5. 選立場 — 對農業/飲食/生活議題表達農夫觀點，開場先說出讓人有感的矛盾
6. 賣產品 — 推介大地農夫的蔬菜、農產品或體驗活動，用生活場景帶出產品而非硬廣
7. 演劇情 — 設計輕鬆農場情境，農夫/農婦獨白或家人互動，帶點自嘲式幽默

【腳本格式規則】嚴格依照以下格式輸出，不要加任何說明或前言：

▍主題類型
[主題名稱]：[一句吸引人的核心訴求，15字以內]

▍開場鉤子（前3秒）
畫面：[具體要拍什麼場景/動作/特寫，越具體越好]
台詞：[說的一句話，或畫面字幕文字]

▍素材拍攝清單
□ [具體鏡頭1：含動作描述和拍攝角度]
□ [具體鏡頭2]
□ [具體鏡頭3]
□ [補充鏡頭4（可選）]
□ [補充鏡頭5（可選）]
（列5-7個，越具體越好，讓農夫在工作中馬上知道要抓哪個畫面）

▍影片結構
[時間段]｜[段落名稱]：[要說/要拍什麼]
（每個段落一行，按目標長度分段，完整列出所有段落）

▍台詞建議
「[第一句，口語自然，不是廣告詞]」
「[第二句]」
（最多3句，對著鏡頭說的話）

▍結尾 CTA
[一句收尾，呼應主題，引導觀眾追蹤或留言]

現在根據以下資訊生成腳本：
`;

const VIDEO_VOICE_RULES = {
  farmer: `【腳本聲線：農夫（一拳）視角】
台詞用「農夫」自稱，不說「我」。語氣誠懇、稍帶反思，偶爾幽默但不刻意。
適合帶出農業知識或人生體悟的視角。鏡頭重點：農夫勞動的手部特寫、田間動作、專注神情。`,

  farmwife: `【腳本聲線：農婦（阿雯）視角】
台詞用「農婦」自稱，不說「我」。語氣口語、真實、有點廢但很可愛、不裝。
廢文感優先：對農事狀態帶著好笑的自嘲，讓都市人感同身受、覺得親切。
生活細節優先：把拔、寶寶、農場的意外插曲。鏡頭重點：農婦的生活場景、家人互動、有趣細節。`,
};

// ── 溫和調性系統提示 ────────────────────────────────────
const BASE_GENTLE_SCRIPT = `你是大地農夫品牌的短影音腳本顧問，專門以「溫和調性」協助製作短影音。

【大地農夫品牌氣質】
質樸、自然、親子、土地生活。
目標客群：認同土地價值、嚮往半農生活的城市家庭。
核心主張：「不用大聲、不用搞笑、不用很會演；用溫柔旁白＋手部動作＋孩子表情＋土地細節，做出大地農夫自己的短影音風格。」

${TONE_RULE}

【大地農夫短影音固定公式】
前3秒：一句生活痛點或溫柔提問（讓都市家庭說「這說的是我」）
中間：真實農場畫面＋簡單旁白（不需要解釋太多，相信畫面的力量）
最後：一句土地系收尾＋品牌露出

【語氣與文字原則】
- 旁白文字要像說話，不是廣告文案
- 每句話要短，有呼吸感，像詩的節奏
- 不需要「告訴」觀眾道理，讓畫面說話
- 結尾不用催促式 CTA，用品牌歸屬感收尾
- 絕對不說：限時優惠、立刻報名、強力推薦
- 關鍵氛圍詞：慢、陪、等待、真實、土地、孩子、手、感覺

【七大主題（大地農夫版詮釋）——優先選曬過程與說故事】
1. 曬過程（最優先）— 讓觀眾看到土地真的在發生事。拍泥土、手、孩子、採收、備料、手作、日常。信任感最強。
2. 說故事（優先）— 農夫爸爸、孩子、土地、家庭，品牌故事比產品更能打動人。
3. 教知識 — 把農業知識講成生活智慧。「為什麼孩子要摸土？」而非學術農業知識。
4. 熬雞湯 — 土地系生活金句，但每句感悟必須接一個真實畫面，不能純文字。
5. 選立場 — 溫和表達生活主張（孩子需要土地、城市需要自給自足），不走衝突路線。
6. 賣產品 — 賣使用情境，讓觀眾感覺在看生活，而不是在看廣告。
7. 演劇情 — 親子小劇場，輕短自然，要符合大地農夫氣質，不要尷尬誇張。

【腳本格式規則】嚴格依照以下格式輸出，不要加任何說明或前言：

▍主題類型
[主題名稱]：[一個會讓人想停下來看的標題]

▍前3秒
旁白：「[一句生活痛點或溫柔提問，15字以內，讓都市家庭有共鳴]」
畫面：[對應的具體鏡頭，農場真實場景]

▍素材拍攝清單（按故事順序）
□ [畫面1：越具體越好，含手部動作/孩子/土地細節]
□ [畫面2]
□ [畫面3]
□ [畫面4]
□ [畫面5]

▍旁白腳本
[完整旁白文字，按段落換行，短句有呼吸感，像說話，不是廣告]

▍品牌收尾
「[一句土地系結語，不催促，有溫度]」
大地農夫｜[副標或活動名稱]

現在根據以下資訊生成腳本：
`;

const GENTLE_VOICE_RULES = {
  farmer: `【旁白角色：農夫（一拳）視角】
旁白用「農夫」自稱或「我」皆可，口吻沉穩、真實，像農夫在田裡喃喃說話。
適合說：為什麼做農夫、土地教我的事、送給孩子的禮物、農夫爸爸的心情。
鏡頭重點：農夫的手、田間動作、農夫與孩子的互動。`,

  farmwife: `【旁白角色：農婦（阿雯）視角】
旁白用「農婦」自稱或「我」皆可，口吻溫暖、生活，像媽媽在陪孩子時說的話。
適合說：親子農場日常、讓孩子慢下來、一個人的晚餐、農婦的手作時光。
鏡頭重點：農婦的生活場景、家人互動、孩子的表情、手作的細節。`,
};

// ── IP 個人貼文系統提示 v3.0 ─────────────────────────
const BASE_IP_POST = `你是大地農夫農場主人的個人 IP 貼文代筆。這是個人視角貼文，不是品牌文案。

【IP 核心精神】
> 我不是不判斷，我只是願意被修正。
> 我讓現實修正我，而不是讓自我說服我。

【IP 身份】
背景：前金融交易員，現在是新北市新店區的農夫爸爸。
身份演進：用聰明換認可 → 用實驗換理解 → 用誠實換穩定 → 用現實守謙虛。
核心價值：誠實面對自己、承認會痛、願意被修正、不自我合理化、順應自然（是校正，不是消極）。

【三大內容主軸（按比例選擇）】
① 實驗型紀錄（40%）：農業假設 → 實作過程 → 成功或失敗 → 數字與動作細節。語氣：這是測試，不是展示成果。
② 動搖與校正（35%）：想加速、想算回本、怎麼會這樣、有點痛、有點不甘——但結尾進入「再看一層、假設錯在哪、認知還有空間」。
③ 順應自然 × 防飄（25%）：順利時提醒自己、土地給訊號、吃虧才發現。語氣：我不是不會飄，只是願意被現實提醒。

【五個模組骨架】（依密度選用幾個）
1. 微張力開場：前兩行必須帶其中之一：「我以為想清楚了」「短期看不到回報」「怎麼會這樣」「有點不如預期」「有點傻」——目的是提高停留率。
2. 具體畫面：至少1個數字、至少2個動作、無抽象評論。例：「挖60公分、堆30公分、搬堆肥」。
3. 內在第一反應：優先句型：「怎麼會這樣？」「老實說，我當下有點⋯⋯」「以前的我一定會急」——必須真實，不得美化。
4. 校正轉折：必須包含其中之一：「原來我哪裡沒看見」「假設可能錯了」「認知還有空間」「再看深一點」。
5. 順應自然收尾：可用：「土地還是照它的節奏走」「自然不會因為我急就快」「順境時更要慢」「會痛一下，但還是會繼續」——禁止總結人生大道理。

【防飄模組】
若貼文提到收成不錯、進展順利、訂單增加，必須自動加入一句：
「最近順了一點，也提醒自己別太早下結論。」或「順境時更要慢。」或「土地不會因為我成功就多給。」

【截圖句（可選）】
不超過兩行、不誇張的獨立短句，有觀點有矛盾感。例：「失敗不是打臉，是校正。」

【密度對照】
淡（日常碎念型）：100字以內，1-2個模組，微張力開場＋畫面或反應
中（動搖校正型）：150-250字，3-4個模組，必含校正轉折
濃（截圖感觀點型）：200-300字，5個模組全上，收尾有張力

【禁止事項】
✗ 高位說教、自我神話、炫耀判斷
✗ 情緒傾倒（訴苦但沒有校正）
✗ 假裝淡定（禁止表演從容）
✗ 大道理收尾（「所以⋯⋯」「我學到了⋯⋯」）
✗ 廣告語氣（現在入手/立刻報名/推薦）
✗ 人格分裂（統一用「我」，不分農夫/農婦角色）

【必須保留】
✓ 不完美瞬間　✓ 承認情緒　✓ 不急著正確　✓ 留白

【格式規則】
- 每段短，每句話盡量獨立成一行，有呼吸感
- hashtag 2-3個，要有個性
- 直接輸出貼文，不加任何說明或前言

現在根據以下資訊生成個人 IP 貼文：
`;

const IP_TYPES = [
  { key: "auto", label: "AI 自選", sub: "按框架比例建議最適合的類型" },
  { key: "daily", label: "生活紀錄", sub: "40%・農場日常碎念" },
  { key: "rhythm", label: "守節奏", sub: "25%・舊自己 vs 現在的對比" },
  { key: "father", label: "父親視角", sub: "15%・十年後孩子記得的畫面" },
  { key: "doubt", label: "動搖揭露", sub: "10%・誠實說不確定" },
  { key: "product", label: "產品帶出", sub: "10%・生活場景帶出產品" },
];

const IP_DENSITIES = [
  { key: "light", label: "淡", sub: "日常碎念", desc: "100字內" },
  { key: "medium", label: "中", sub: "節奏對比", desc: "150-250字" },
  { key: "strong", label: "濃", sub: "截圖感", desc: "200-300字" },
];

// ── 常數 ────────────────────────────────────────────────
const MOODS = ["農事日誌", "產品推廣", "會員故事", "活動預告", "廢文日常", "節氣感懷"];
const SEASONS = ["春", "夏", "秋", "冬"];
const VOICE_LABELS = { farmer: "農夫版", farmwife: "農婦版", yeyang: "農婦散文風版" };

const VIDEO_THEMES = [
  { key: "process", label: "曬過程", sub: "真實農事紀錄" },
  { key: "knowledge", label: "教知識", sub: "農業 / 食材知識" },
  { key: "wisdom", label: "熬雞湯", sub: "土地帶來的體悟" },
  { key: "story", label: "說故事", sub: "農場真實故事" },
  { key: "stance", label: "選立場", sub: "農業 / 飲食觀點" },
  { key: "product", label: "賣產品", sub: "蔬菜 / 體驗活動" },
  { key: "drama", label: "演劇情", sub: "輕鬆農場小短劇" },
];

const GENTLE_THEMES = [
  { key: "process", label: "曬過程", sub: "土地正在發生的事", priority: "最優先" },
  { key: "story", label: "說故事", sub: "農夫爸爸與土地故事", priority: "優先" },
  { key: "knowledge", label: "教知識", sub: "農業變生活智慧", priority: "" },
  { key: "wisdom", label: "熬雞湯", sub: "土地系生活金句", priority: "" },
  { key: "product", label: "賣產品", sub: "使用情境式銷售", priority: "" },
  { key: "stance", label: "選立場", sub: "溫柔生活主張", priority: "" },
  { key: "drama", label: "演劇情", sub: "親子小劇場", priority: "" },
];

const VIDEO_VOICES = [
  { key: "farmwife", label: "農婦版", sub: "口語・廢文・生活感" },
  { key: "farmer", label: "農夫版", sub: "理念・知識・故事感" },
  { key: "both", label: "兩種都要", sub: "農夫 + 農婦各一份" },
];

const GENTLE_VOICES = [
  { key: "farmer", label: "農夫版", sub: "沉穩・喃喃・土地感" },
  { key: "farmwife", label: "農婦版", sub: "溫暖・生活・親子感" },
  { key: "both", label: "兩種都要", sub: "農夫 + 農婦各一份" },
];

const VIDEO_DURATIONS = ["30秒", "60秒", "90秒"];

function loadLS(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; } catch { return fallback; }
}
function saveLS(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

function extractTheme(content) {
  const lines = content.split("\n");
  const idx = lines.findIndex(l => l.includes("▍主題類型"));
  if (idx >= 0 && lines[idx + 1]) {
    return lines[idx + 1].trim().split("：")[0].split(":")[0].trim();
  }
  return "";
}

export default function App() {
  // FB post state
  const [situation, setSituation] = useState("");
  const [mood, setMood] = useState("農事日誌");
  const [season, setSeason] = useState("春");
  const [voice, setVoice] = useState("farmer");
  const [farmerPost, setFarmerPost] = useState("");
  const [farmwifePost, setFarmwifePost] = useState("");
  const [yeyangPost, setYeyangPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");

  // Video script state
  const [videoTasks, setVideoTasks] = useState("");
  const [videoThemeMode, setVideoThemeMode] = useState("auto");
  const [selectedVideoThemes, setSelectedVideoThemes] = useState([]);
  const [videoVoice, setVideoVoice] = useState("farmwife");
  const [videoDuration, setVideoDuration] = useState("60秒");
  const [videoScripts, setVideoScripts] = useState([]);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoCopied, setVideoCopied] = useState("");
  const [videoError, setVideoError] = useState("");

  // Gentle script state
  const [gentleTasks, setGentleTasks] = useState("");
  const [gentleThemeMode, setGentleThemeMode] = useState("auto");
  const [selectedGentleThemes, setSelectedGentleThemes] = useState([]);
  const [gentleVoice, setGentleVoice] = useState("farmer");
  const [gentleDuration, setGentleDuration] = useState("60秒");
  const [gentleScripts, setGentleScripts] = useState([]);
  const [gentleLoading, setGentleLoading] = useState(false);
  const [gentleCopied, setGentleCopied] = useState("");
  const [gentleError, setGentleError] = useState("");

  // IP post state
  const [ipEvent, setIpEvent] = useState("");
  const [ipDensity, setIpDensity] = useState("medium");
  const [ipType, setIpType] = useState("auto");
  const [ipIncludeDoubt, setIpIncludeDoubt] = useState(false);
  const [ipIncludeScreenshot, setIpIncludeScreenshot] = useState(false);
  const [ipPost, setIpPost] = useState("");
  const [ipLoading, setIpLoading] = useState(false);
  const [ipCopied, setIpCopied] = useState(false);
  const [ipError, setIpError] = useState("");
  const [ipChecklist, setIpChecklist] = useState({
    hasScene: false, hasInner: false, hasImperfect: false,
    noPreaching: false, soundsLikeMe: false,
  });

  // Shared favorites & history
  const [favorites, setFavorites] = useState(() => loadLS("lf_favorites", []));
  const [history, setHistory] = useState(() => loadLS("lf_history", []));
  const [tab, setTab] = useState("generate");

  const addFavorite = (text, voiceKey) => {
    const item = { id: Date.now(), text, voice: voiceKey, timestamp: new Date().toISOString() };
    const next = [item, ...favorites].slice(0, 30);
    setFavorites(next); saveLS("lf_favorites", next);
  };
  const removeFavorite = (id) => {
    const next = favorites.filter(f => f.id !== id);
    setFavorites(next); saveLS("lf_favorites", next);
  };
  const isFavorited = (text) => favorites.some(f => f.text === text);

  const addHistory = (posts) => {
    const entries = Object.entries(posts)
      .filter(([, text]) => text)
      .map(([voiceKey, text]) => ({
        id: Date.now() + Math.random(),
        voice: voiceKey,
        text,
        situation,
        mood,
        season,
        timestamp: new Date().toISOString(),
      }));
    const next = [...entries, ...history].slice(0, 200);
    setHistory(next); saveLS("lf_history", next);
  };

  const buildPrompt = (basePrompt, voiceKey) => {
    const favs = favorites.filter(f => f.voice === voiceKey).slice(0, 2);
    if (!favs.length) return basePrompt;
    const examples = favs.map((f, i) => `【好文範例 ${i + 1}】\n${f.text}`).join("\n\n");
    return basePrompt + `\n\n以下是過去你覺得很讚的貼文，請參考其語氣節奏，但產出全新內容：\n${examples}\n\n`;
  };

  const apiCall = (promptText, voiceKey) =>
    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        messages: [{ role: "user", content: `${buildPrompt(promptText, voiceKey)}\n情境：${situation}\n類型：${mood}\n季節：${season}\n\n請直接輸出貼文內容，不要加任何說明或前言。` }],
      }),
    }).then(r => r.json()).then(d => d.content?.map(b => b.text || "").join("") || "");

  const generate = async () => {
    if (!situation.trim()) return;
    setLoading(true); setError("");
    setFarmerPost(""); setFarmwifePost(""); setYeyangPost("");
    try {
      let posts = {};
      if (voice === "both") {
        const [ft, wt, yt] = await Promise.all([
          apiCall(BASE_FARMER, "farmer"),
          apiCall(BASE_FARMWIFE, "farmwife"),
          apiCall(BASE_YEYANG, "yeyang"),
        ]);
        setFarmerPost(ft); setFarmwifePost(wt); setYeyangPost(yt);
        posts = { farmer: ft, farmwife: wt, yeyang: yt };
      } else if (voice === "farmer") {
        const t = await apiCall(BASE_FARMER, "farmer"); setFarmerPost(t); posts = { farmer: t };
      } else if (voice === "farmwife") {
        const t = await apiCall(BASE_FARMWIFE, "farmwife"); setFarmwifePost(t); posts = { farmwife: t };
      } else {
        const t = await apiCall(BASE_YEYANG, "yeyang"); setYeyangPost(t); posts = { yeyang: t };
      }
      addHistory(posts);
    } catch (e) { setError("生成失敗：" + e.message); }
    setLoading(false);
  };

  // ── 影片腳本主題切換 ──────────────────────────────────
  const toggleVideoTheme = (key) => {
    if (videoThemeMode === "auto") {
      setVideoThemeMode("manual"); setSelectedVideoThemes([key]); return;
    }
    if (selectedVideoThemes.includes(key)) {
      const next = selectedVideoThemes.filter(t => t !== key);
      setSelectedVideoThemes(next);
      if (next.length === 0) setVideoThemeMode("auto");
    } else if (selectedVideoThemes.length < 2) {
      setSelectedVideoThemes([...selectedVideoThemes, key]);
    }
  };

  const generateVideoScripts = async () => {
    if (!videoTasks.trim()) return;
    setVideoLoading(true); setVideoError(""); setVideoScripts([]);
    try {
      let themeInstructions;
      if (videoThemeMode === "auto" || selectedVideoThemes.length === 0) {
        themeInstructions = [
          "根據今日農事工作，從七大主題中自動選擇最適合的一個主題",
          "根據今日農事工作，從七大主題中選一個能與第一份腳本互補的不同主題",
        ];
      } else if (selectedVideoThemes.length === 1) {
        const t1 = VIDEO_THEMES.find(t => t.key === selectedVideoThemes[0]);
        themeInstructions = [
          `使用「${t1.label}」主題`,
          `從七大主題中選一個與「${t1.label}」最互補的不同主題`,
        ];
      } else {
        themeInstructions = selectedVideoThemes.map(key => {
          const t = VIDEO_THEMES.find(th => th.key === key);
          return `使用「${t.label}」主題`;
        });
      }
      const voices = videoVoice === "both" ? ["farmer", "farmwife"] : [videoVoice, videoVoice];
      const results = await Promise.all(
        themeInstructions.map((themeInstruction, i) => {
          const content = `${BASE_VIDEO_SCRIPT}\n${VIDEO_VOICE_RULES[voices[i]]}\n\n今日農事工作：${videoTasks}\n主題指示：${themeInstruction}\n目標影片長度：${videoDuration}`;
          return fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: "claude-sonnet-4-5", max_tokens: 1500, messages: [{ role: "user", content }] }),
          }).then(r => r.json()).then(d => ({ content: d.content?.map(b => b.text || "").join("") || "", voice: voices[i] }));
        })
      );
      setVideoScripts(results);
    } catch (e) { setVideoError("生成失敗：" + e.message); }
    setVideoLoading(false);
  };

  // ── 溫和腳本主題切換 ──────────────────────────────────
  const toggleGentleTheme = (key) => {
    if (gentleThemeMode === "auto") {
      setGentleThemeMode("manual"); setSelectedGentleThemes([key]); return;
    }
    if (selectedGentleThemes.includes(key)) {
      const next = selectedGentleThemes.filter(t => t !== key);
      setSelectedGentleThemes(next);
      if (next.length === 0) setGentleThemeMode("auto");
    } else if (selectedGentleThemes.length < 2) {
      setSelectedGentleThemes([...selectedGentleThemes, key]);
    }
  };

  const generateGentleScripts = async () => {
    if (!gentleTasks.trim()) return;
    setGentleLoading(true); setGentleError(""); setGentleScripts([]);
    try {
      let themeInstructions;
      if (gentleThemeMode === "auto" || selectedGentleThemes.length === 0) {
        themeInstructions = [
          "根據今日農事工作，從七大主題中自動選擇最適合的一個（優先考慮：曬過程、說故事）",
          "根據今日農事工作，從七大主題中選一個與第一份互補的不同主題（優先考慮：教知識、熬雞湯）",
        ];
      } else if (selectedGentleThemes.length === 1) {
        const t1 = GENTLE_THEMES.find(t => t.key === selectedGentleThemes[0]);
        themeInstructions = [
          `使用「${t1.label}」主題`,
          `從七大主題中選一個與「${t1.label}」最互補的不同主題`,
        ];
      } else {
        themeInstructions = selectedGentleThemes.map(key => {
          const t = GENTLE_THEMES.find(th => th.key === key);
          return `使用「${t.label}」主題`;
        });
      }
      const voices = gentleVoice === "both" ? ["farmer", "farmwife"] : [gentleVoice, gentleVoice];
      const results = await Promise.all(
        themeInstructions.map((themeInstruction, i) => {
          const content = `${BASE_GENTLE_SCRIPT}\n${GENTLE_VOICE_RULES[voices[i]]}\n\n今日農事工作：${gentleTasks}\n主題指示：${themeInstruction}\n目標影片長度：${gentleDuration}`;
          return fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: "claude-sonnet-4-5", max_tokens: 1500, messages: [{ role: "user", content }] }),
          }).then(r => r.json()).then(d => ({ content: d.content?.map(b => b.text || "").join("") || "", voice: voices[i] }));
        })
      );
      setGentleScripts(results);
    } catch (e) { setGentleError("生成失敗：" + e.message); }
    setGentleLoading(false);
  };

  const generateIPPost = async () => {
    if (!ipEvent.trim()) return;
    setIpLoading(true); setIpError(""); setIpPost("");
    setIpChecklist({ hasScene: false, hasInner: false, hasImperfect: false, noPreaching: false, soundsLikeMe: false });
    try {
      const densityObj = IP_DENSITIES.find(d => d.key === ipDensity);
      const densityLabel = densityObj ? `${densityObj.label}（${densityObj.sub}，${densityObj.desc}）` : "中";
      const typeInstruction = ipType === "auto"
        ? "根據今日事件，選擇最適合的內容類型（生活紀錄/守節奏/父親視角/動搖揭露/產品帶出）。"
        : `內容類型：${IP_TYPES.find(t => t.key === ipType)?.label}。`;
      const doubtOption = ipIncludeDoubt ? "必須包含「動搖瞬間」模組：誠實說出不確定的時刻。" : "";
      const screenshotOption = ipIncludeScreenshot ? "必須在結尾加一句截圖句（能獨立成一句話、有觀點有矛盾的短句）。" : "";
      const content = `${BASE_IP_POST}\n今日事件：${ipEvent}\n密度：${densityLabel}\n${typeInstruction}\n${doubtOption}\n${screenshotOption}\n請直接輸出貼文內容，不要加任何說明或前言。`;
      const result = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-5", max_tokens: 1200, messages: [{ role: "user", content }] }),
      }).then(r => r.json()).then(d => d.content?.map(b => b.text || "").join("") || "");
      setIpPost(result);
    } catch (e) { setIpError("生成失敗：" + e.message); }
    setIpLoading(false);
  };

  const copyIPPost = () => {
    navigator.clipboard.writeText(ipPost);
    setIpCopied(true); setTimeout(() => setIpCopied(false), 2000);
  };

  const toggleIPChecklist = (key) => {
    setIpChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key); setTimeout(() => setCopied(""), 2000);
  };

  const copyVideoScript = (content, index) => {
    navigator.clipboard.writeText(content);
    setVideoCopied(String(index)); setTimeout(() => setVideoCopied(""), 2000);
  };

  const copyGentleScript = (content, index) => {
    navigator.clipboard.writeText(content);
    setGentleCopied(String(index)); setTimeout(() => setGentleCopied(""), 2000);
  };

  const favCount = favorites.length;
  const histCount = history.length;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f4ef", fontFamily: "'Noto Serif TC', Georgia, serif" }}>
      {/* Header */}
      <div style={{ background: "#2d4a1e", padding: "22px 32px 18px", borderBottom: "3px solid #8ab561" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#e8f5d0", letterSpacing: 2 }}>大地農夫</span>
          <span style={{ fontSize: 13, color: "#a8c97a", letterSpacing: 1 }}>內容生成系統</span>
        </div>
        <div style={{ fontSize: 12, color: "#7aac48", marginTop: 4 }}>FB 文案 × 影片腳本 × 溫和調性 × IP 貼文 · AI 生成草稿</div>
        <div style={{ display: "flex", gap: 4, marginTop: 16, flexWrap: "wrap" }}>
          {[
            { key: "generate", label: "✏️ FB文案" },
            { key: "ip", label: "✦ IP貼文" },
            { key: "video", label: "🎬 影片腳本" },
            { key: "gentle", label: "🌿 溫和腳本" },
            { key: "favorites", label: `⭐ 好文收藏${favCount ? ` (${favCount})` : ""}` },
            { key: "history", label: `📋 歷史${histCount ? ` (${histCount})` : ""}` },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: "6px 16px", borderRadius: "6px 6px 0 0", border: "none",
              background: tab === t.key ? "#f7f4ef" : "transparent",
              color: tab === t.key ? "#2d4a1e" : "#a8c97a",
              fontFamily: "inherit", fontSize: 13,
              fontWeight: tab === t.key ? 700 : 400, cursor: "pointer",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "28px 24px 48px" }}>

        {/* ── FB文案頁 ── */}
        {tab === "generate" && (
          <>
            <div style={{ background: "#fff", border: "1px solid #d4e8b0", borderRadius: 12, padding: "24px 28px", marginBottom: 20, boxShadow: "0 2px 8px rgba(45,74,30,0.06)" }}>
              {favCount > 0 && (
                <div style={{ marginBottom: 14, padding: "8px 12px", background: "#f0fbe0", borderRadius: 8, fontSize: 12, color: "#4a7c2e", borderLeft: "3px solid #8ab561" }}>
                  ✨ 你有 {favCount} 篇好文收藏，AI 生成時會自動參考這些風格！
                </div>
              )}
              <label style={{ fontSize: 13, fontWeight: 600, color: "#2d4a1e", display: "block", marginBottom: 8 }}>今天的情境 / 想說的事</label>
              <textarea
                value={situation} onChange={e => setSituation(e.target.value)}
                placeholder="例如：今天採了第一批紫蘇，洗到手都黑了，孩子在旁邊玩泥巴⋯⋯"
                rows={3}
                style={{ width: "100%", padding: "12px 14px", fontSize: 15, fontFamily: "'Noto Serif TC', serif", border: "1px solid #c8e0a0", borderRadius: 8, background: "#fafff5", color: "#1a2e10", resize: "vertical", outline: "none", boxSizing: "border-box" }}
              />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16 }}>
                <div style={{ flex: "1 1 160px" }}>
                  <label style={{ fontSize: 12, color: "#5a7a3a", display: "block", marginBottom: 6 }}>貼文類型</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {MOODS.map(m => (
                      <button key={m} onClick={() => setMood(m)} style={{ padding: "5px 12px", fontSize: 12, borderRadius: 20, border: mood === m ? "1.5px solid #4a7c2e" : "1px solid #c8e0a0", background: mood === m ? "#d8f0b0" : "#f4fbea", color: mood === m ? "#2a5010" : "#5a7a3a", cursor: "pointer", fontFamily: "inherit", fontWeight: mood === m ? 600 : 400 }}>{m}</button>
                    ))}
                  </div>
                </div>
                <div style={{ flex: "0 0 auto" }}>
                  <label style={{ fontSize: 12, color: "#5a7a3a", display: "block", marginBottom: 6 }}>季節</label>
                  <div style={{ display: "flex", gap: 6 }}>
                    {SEASONS.map(s => (
                      <button key={s} onClick={() => setSeason(s)} style={{ width: 36, height: 36, borderRadius: "50%", border: season === s ? "2px solid #4a7c2e" : "1px solid #c8e0a0", background: season === s ? "#4a7c2e" : "#f4fbea", color: season === s ? "#fff" : "#5a7a3a", cursor: "pointer", fontSize: 14, fontFamily: "inherit", fontWeight: 600 }}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 18 }}>
                <label style={{ fontSize: 12, color: "#5a7a3a", display: "block", marginBottom: 8 }}>聲線選擇</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[{ key: "farmer", label: "農夫", sub: "思考・理念・故事" }, { key: "farmwife", label: "農婦", sub: "生活・廢文・日常" }].map(v => (
                      <button key={v.key} onClick={() => setVoice(v.key)} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, border: voice === v.key ? "2px solid #4a7c2e" : "1px solid #c8e0a0", background: voice === v.key ? "#eaf7d8" : "#fafff5", cursor: "pointer", textAlign: "center", fontFamily: "inherit" }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#2d4a1e" }}>{v.label}</div>
                        <div style={{ fontSize: 11, color: "#7aac48", marginTop: 2 }}>{v.sub}</div>
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[{ key: "yeyang", label: "農婦散文風", sub: "場景・散文・輕升華" }, { key: "both", label: "三版全開", sub: "同時生成比較" }].map(v => (
                      <button key={v.key} onClick={() => setVoice(v.key)} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, border: voice === v.key ? "2px solid #4a7c2e" : "1px solid #c8e0a0", background: v.key === "yeyang" ? (voice === v.key ? "#f0e8f8" : "#faf5ff") : (voice === v.key ? "#eaf7d8" : "#fafff5"), cursor: "pointer", textAlign: "center", fontFamily: "inherit" }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: v.key === "yeyang" ? "#5a2a8a" : "#2d4a1e" }}>{v.label}</div>
                        <div style={{ fontSize: 11, color: v.key === "yeyang" ? "#9a6acc" : "#7aac48", marginTop: 2 }}>{v.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={generate} disabled={loading || !situation.trim()} style={{ width: "100%", marginTop: 20, padding: "14px", background: loading ? "#a0c070" : "#2d4a1e", color: "#e8f5d0", border: "none", borderRadius: 8, fontSize: 16, fontFamily: "inherit", fontWeight: 700, cursor: loading || !situation.trim() ? "not-allowed" : "pointer", letterSpacing: 1, transition: "background 0.2s" }}>
                {loading ? "農夫正在思考中⋯⋯" : "生成貼文草稿"}
              </button>
              {error && <div style={{ fontSize: 13, color: "#c0392b", marginTop: 8 }}>{error}</div>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {(voice === "farmer" || voice === "both") && (
                <PostCard title="農夫版" subtitle="思考型・理念・故事感" accentColor="#2d4a1e" tagColor="#d8f0b0" tagText="#2a5010"
                  content={farmerPost} loading={loading && !farmerPost}
                  onCopy={() => copy(farmerPost, "farmer")} copied={copied === "farmer"}
                  onFavorite={() => isFavorited(farmerPost) ? removeFavorite(favorites.find(f => f.text === farmerPost)?.id) : addFavorite(farmerPost, "farmer")}
                  isFavorited={isFavorited(farmerPost)} />
              )}
              {(voice === "farmwife" || voice === "both") && (
                <PostCard title="農婦版" subtitle="口語型・日常・有點廢" accentColor="#7a4a1e" tagColor="#f5e8d0" tagText="#5a2a10"
                  content={farmwifePost} loading={loading && !farmwifePost}
                  onCopy={() => copy(farmwifePost, "farmwife")} copied={copied === "farmwife"}
                  onFavorite={() => isFavorited(farmwifePost) ? removeFavorite(favorites.find(f => f.text === farmwifePost)?.id) : addFavorite(farmwifePost, "farmwife")}
                  isFavorited={isFavorited(farmwifePost)} />
              )}
              {(voice === "yeyang" || voice === "both") && (
                <PostCard title="農婦散文風版" subtitle="場景式散文・輕升華" accentColor="#6a2a9a" tagColor="#f0e8f8" tagText="#4a1a7a"
                  content={yeyangPost} loading={loading && !yeyangPost}
                  onCopy={() => copy(yeyangPost, "yeyang")} copied={copied === "yeyang"}
                  onFavorite={() => isFavorited(yeyangPost) ? removeFavorite(favorites.find(f => f.text === yeyangPost)?.id) : addFavorite(yeyangPost, "yeyang")}
                  isFavorited={isFavorited(yeyangPost)} />
              )}
            </div>
            <div style={{ marginTop: 28, padding: "16px 20px", background: "#eef7e0", borderRadius: 8, borderLeft: "3px solid #8ab561" }}>
              <div style={{ fontSize: 12, color: "#4a7c2e", fontWeight: 600, marginBottom: 6 }}>使用提示</div>
              <div style={{ fontSize: 12, color: "#5a7a3a", lineHeight: 1.8 }}>
                · 情境描述越具體，貼文越像真的（例如加上天氣、誰在場、有什麼意外）<br />
                · 按 ⭐ 好文收藏後，下次生成 AI 會自動參考你收藏的風格<br />
                · 歷史記錄最多保留 200 篇，存在瀏覽器本機
              </div>
            </div>
          </>
        )}

        {/* ── 影片腳本頁（流量型）── */}
        {tab === "video" && (
          <>
            <div style={{ background: "#fff", border: "1px solid #d4e8b0", borderRadius: 12, padding: "24px 28px", marginBottom: 20, boxShadow: "0 2px 8px rgba(45,74,30,0.06)" }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#2d4a1e", display: "block", marginBottom: 8 }}>今日農事工作項目</label>
              <textarea
                value={videoTasks} onChange={e => setVideoTasks(e.target.value)}
                placeholder="例如：採收青花菜（第一次採收）、整理苗床、澆水施肥⋯⋯"
                rows={3}
                style={{ width: "100%", padding: "12px 14px", fontSize: 15, fontFamily: "'Noto Serif TC', serif", border: "1px solid #c8e0a0", borderRadius: 8, background: "#fafff5", color: "#1a2e10", resize: "vertical", outline: "none", boxSizing: "border-box" }}
              />
              <div style={{ fontSize: 12, color: "#8ab561", marginTop: 4 }}>越具體越精準 ── 可以列多項，AI 會選最適合拍攝的內容</div>

              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: 12, color: "#5a7a3a", display: "block", marginBottom: 8, fontWeight: 600 }}>腳本聲線</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {VIDEO_VOICES.map(v => (
                    <button key={v.key} onClick={() => setVideoVoice(v.key)} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, textAlign: "center", fontFamily: "inherit", cursor: "pointer", border: videoVoice === v.key ? "2px solid #4a7c2e" : "1px solid #c8e0a0", background: videoVoice === v.key ? "#eaf7d8" : "#fafff5", transition: "all 0.15s" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#2d4a1e" }}>{v.label}</div>
                      <div style={{ fontSize: 11, color: "#7aac48", marginTop: 2 }}>{v.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <label style={{ fontSize: 12, color: "#5a7a3a", fontWeight: 600 }}>影片主題 <span style={{ fontWeight: 400, color: "#8ab561" }}>（陳修平七大主題）</span></label>
                  {videoThemeMode === "manual" && <span style={{ fontSize: 11, color: selectedVideoThemes.length >= 2 ? "#c04040" : "#7aac48" }}>已選 {selectedVideoThemes.length}/2</span>}
                </div>
                <button onClick={() => { setVideoThemeMode("auto"); setSelectedVideoThemes([]); }} style={{ width: "100%", padding: "10px 14px", marginBottom: 8, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", textAlign: "left", border: videoThemeMode === "auto" ? "2px solid #4a7c2e" : "1px solid #c8e0a0", background: videoThemeMode === "auto" ? "#eaf7d8" : "#fafff5", transition: "all 0.15s" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: videoThemeMode === "auto" ? "#2a5010" : "#2d4a1e" }}>🤖 AI 自選兩個</span>
                  <span style={{ fontSize: 11, color: "#7aac48", marginLeft: 8 }}>根據農事工作自動挑選兩個最適合、互補的主題</span>
                </button>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {VIDEO_THEMES.map(t => {
                    const isSelected = selectedVideoThemes.includes(t.key);
                    const isAtLimit = !isSelected && selectedVideoThemes.length >= 2 && videoThemeMode === "manual";
                    return (
                      <button key={t.key} onClick={() => toggleVideoTheme(t.key)} style={{ padding: "10px 12px", borderRadius: 8, cursor: isAtLimit ? "default" : "pointer", textAlign: "left", fontFamily: "inherit", transition: "all 0.15s", border: isSelected ? "2px solid #4a7c2e" : "1px solid #c8e0a0", background: isSelected ? "#eaf7d8" : "#fafff5", opacity: isAtLimit ? 0.45 : 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: isSelected ? "#2a5010" : "#2d4a1e" }}>{isSelected ? "✓ " : ""}{t.label}</div>
                        <div style={{ fontSize: 11, color: "#7aac48", marginTop: 2 }}>{t.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <label style={{ fontSize: 12, color: "#5a7a3a", display: "block", marginBottom: 8, fontWeight: 600 }}>目標影片長度</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {VIDEO_DURATIONS.map(d => (
                    <button key={d} onClick={() => setVideoDuration(d)} style={{ flex: 1, padding: "10px", borderRadius: 8, fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.15s", border: videoDuration === d ? "2px solid #4a7c2e" : "1px solid #c8e0a0", background: videoDuration === d ? "#4a7c2e" : "#fafff5", color: videoDuration === d ? "#fff" : "#5a7a3a" }}>{d}</button>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "#8ab561", marginTop: 6 }}>30秒 = Reels精華款　60秒 = 標準款　90秒 = 較完整的故事款</div>
              </div>

              <button onClick={generateVideoScripts} disabled={videoLoading || !videoTasks.trim()} style={{ width: "100%", marginTop: 20, padding: "14px", background: videoLoading ? "#a0c070" : "#1a3a10", color: "#e8f5d0", border: "none", borderRadius: 8, fontSize: 16, fontFamily: "inherit", fontWeight: 700, cursor: videoLoading || !videoTasks.trim() ? "not-allowed" : "pointer", letterSpacing: 1, transition: "background 0.2s" }}>
                {videoLoading ? "同時規劃兩份腳本中⋯⋯" : "🎬 同時生成兩份腳本"}
              </button>
              {videoError && <div style={{ fontSize: 13, color: "#c0392b", marginTop: 8 }}>{videoError}</div>}
            </div>

            {videoLoading && videoScripts.length === 0 && (
              <div style={{ background: "#fff", border: "1px solid #d4e8b0", borderRadius: 12, padding: "32px", textAlign: "center", color: "#a0c070", fontSize: 14 }}>正在規劃今天要拍什麼⋯⋯</div>
            )}
            {videoScripts.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {videoScripts.map((script, i) => (
                  <VideoScriptCard key={i} content={script.content} voiceLabel={script.voice === "farmer" ? "農夫版" : "農婦版"} scriptIndex={i + 1} onCopy={() => copyVideoScript(script.content, i)} copied={videoCopied === String(i)} />
                ))}
              </div>
            )}
            <div style={{ marginTop: 28, padding: "16px 20px", background: "#eef7e0", borderRadius: 8, borderLeft: "3px solid #8ab561" }}>
              <div style={{ fontSize: 12, color: "#4a7c2e", fontWeight: 600, marginBottom: 6 }}>使用方式</div>
              <div style={{ fontSize: 12, color: "#5a7a3a", lineHeight: 1.8 }}>
                · 出門前先生成腳本，知道要抓哪些畫面，工作不被打斷<br />
                · 農事工作越詳細，素材清單越精準（可說「第一次採收」「今天天氣特別好」等細節）<br />
                · 農婦版通常比農夫版更輕鬆有趣，讓都市觀眾更容易感同身受
              </div>
            </div>
          </>
        )}

        {/* ── 溫和腳本頁 ── */}
        {tab === "gentle" && (
          <>
            {/* 公式說明 */}
            <div style={{ background: "#fdf6ee", border: "1px solid #e8d8c0", borderRadius: 10, padding: "14px 18px", marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#8b5c2a", fontWeight: 600, marginBottom: 6 }}>🌿 溫和調性公式</div>
              <div style={{ fontSize: 12, color: "#7a5030", lineHeight: 2 }}>
                <span style={{ background: "#f5e8d4", padding: "1px 8px", borderRadius: 4, marginRight: 6 }}>前3秒</span>一句生活痛點或溫柔提問
                <span style={{ color: "#c8a87a", margin: "0 8px" }}>→</span>
                <span style={{ background: "#f5e8d4", padding: "1px 8px", borderRadius: 4, marginRight: 6 }}>中間</span>農場真實畫面 ＋ 簡單旁白
                <span style={{ color: "#c8a87a", margin: "0 8px" }}>→</span>
                <span style={{ background: "#f5e8d4", padding: "1px 8px", borderRadius: 4, marginRight: 6 }}>收尾</span>土地系結語 ＋ 品牌露出
              </div>
              <div style={{ fontSize: 11, color: "#9a7a5a", marginTop: 6 }}>不用大聲、不用搞笑、不用很會演。用溫柔旁白＋手部動作＋孩子表情＋土地細節。</div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #e0d0b8", borderRadius: 12, padding: "24px 28px", marginBottom: 20, boxShadow: "0 2px 8px rgba(107,76,42,0.06)" }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a3010", display: "block", marginBottom: 8 }}>今日農事工作項目</label>
              <textarea
                value={gentleTasks} onChange={e => setGentleTasks(e.target.value)}
                placeholder="例如：孩子第一次摸土、採收紫蘇做醬油、整理長者菜園⋯⋯"
                rows={3}
                style={{ width: "100%", padding: "12px 14px", fontSize: 15, fontFamily: "'Noto Serif TC', serif", border: "1px solid #d4b898", borderRadius: 8, background: "#fffaf4", color: "#2e1a0e", resize: "vertical", outline: "none", boxSizing: "border-box" }}
              />
              <div style={{ fontSize: 12, color: "#b8905a", marginTop: 4 }}>越具體越好 ── 有孩子互動、手作過程、特別細節的農事，最容易產出溫暖腳本</div>

              {/* 聲線 */}
              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: 12, color: "#7a5030", display: "block", marginBottom: 8, fontWeight: 600 }}>旁白聲線</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {GENTLE_VOICES.map(v => (
                    <button key={v.key} onClick={() => setGentleVoice(v.key)} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, textAlign: "center", fontFamily: "inherit", cursor: "pointer", border: gentleVoice === v.key ? "2px solid #8b5c2a" : "1px solid #d4b898", background: gentleVoice === v.key ? "#f5e8d4" : "#fffaf4", transition: "all 0.15s" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#5a3010" }}>{v.label}</div>
                      <div style={{ fontSize: 11, color: "#a07040", marginTop: 2 }}>{v.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 主題 */}
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <label style={{ fontSize: 12, color: "#7a5030", fontWeight: 600 }}>影片主題 <span style={{ fontWeight: 400, color: "#b8905a" }}>（選 1-2 個，或 AI 自選）</span></label>
                  {gentleThemeMode === "manual" && <span style={{ fontSize: 11, color: selectedGentleThemes.length >= 2 ? "#c04040" : "#a07040" }}>已選 {selectedGentleThemes.length}/2</span>}
                </div>
                <button onClick={() => { setGentleThemeMode("auto"); setSelectedGentleThemes([]); }} style={{ width: "100%", padding: "10px 14px", marginBottom: 8, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", textAlign: "left", border: gentleThemeMode === "auto" ? "2px solid #8b5c2a" : "1px solid #d4b898", background: gentleThemeMode === "auto" ? "#f5e8d4" : "#fffaf4", transition: "all 0.15s" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: gentleThemeMode === "auto" ? "#5a3010" : "#5a3010" }}>🌱 AI 自選兩個</span>
                  <span style={{ fontSize: 11, color: "#a07040", marginLeft: 8 }}>優先推薦曬過程 → 說故事 → 教知識 → 熬雞湯</span>
                </button>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {GENTLE_THEMES.map(t => {
                    const isSelected = selectedGentleThemes.includes(t.key);
                    const isAtLimit = !isSelected && selectedGentleThemes.length >= 2 && gentleThemeMode === "manual";
                    return (
                      <button key={t.key} onClick={() => toggleGentleTheme(t.key)} style={{ padding: "10px 12px", borderRadius: 8, cursor: isAtLimit ? "default" : "pointer", textAlign: "left", fontFamily: "inherit", transition: "all 0.15s", border: isSelected ? "2px solid #8b5c2a" : "1px solid #d4b898", background: isSelected ? "#f5e8d4" : "#fffaf4", opacity: isAtLimit ? 0.45 : 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: isSelected ? "#5a3010" : "#5a3010" }}>{isSelected ? "✓ " : ""}{t.label}</span>
                          {t.priority && <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 8, background: t.priority === "最優先" ? "#f0d0a0" : "#f5e8d4", color: "#8b5c2a", fontWeight: 600 }}>{t.priority}</span>}
                        </div>
                        <div style={{ fontSize: 11, color: "#a07040", marginTop: 2 }}>{t.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 長度 */}
              <div style={{ marginTop: 18 }}>
                <label style={{ fontSize: 12, color: "#7a5030", display: "block", marginBottom: 8, fontWeight: 600 }}>目標影片長度</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {VIDEO_DURATIONS.map(d => (
                    <button key={d} onClick={() => setGentleDuration(d)} style={{ flex: 1, padding: "10px", borderRadius: 8, fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.15s", border: gentleDuration === d ? "2px solid #8b5c2a" : "1px solid #d4b898", background: gentleDuration === d ? "#8b5c2a" : "#fffaf4", color: gentleDuration === d ? "#fef6ec" : "#7a5030" }}>{d}</button>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "#b8905a", marginTop: 6 }}>溫和調性偏向 60-90 秒，讓旁白有呼吸的空間</div>
              </div>

              <button onClick={generateGentleScripts} disabled={gentleLoading || !gentleTasks.trim()} style={{ width: "100%", marginTop: 20, padding: "14px", background: gentleLoading ? "#c8a87a" : "#6b4c2a", color: "#fef6ec", border: "none", borderRadius: 8, fontSize: 16, fontFamily: "inherit", fontWeight: 700, cursor: gentleLoading || !gentleTasks.trim() ? "not-allowed" : "pointer", letterSpacing: 1, transition: "background 0.2s" }}>
                {gentleLoading ? "輕輕規劃今天的旁白⋯⋯" : "🌿 同時生成兩份溫和腳本"}
              </button>
              {gentleError && <div style={{ fontSize: 13, color: "#c0392b", marginTop: 8 }}>{gentleError}</div>}
            </div>

            {gentleLoading && gentleScripts.length === 0 && (
              <div style={{ background: "#fff", border: "1px solid #e0d0b8", borderRadius: 12, padding: "32px", textAlign: "center", color: "#c8a87a", fontSize: 14 }}>
                農夫正在想今天要說什麼⋯⋯
              </div>
            )}
            {gentleScripts.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {gentleScripts.map((script, i) => (
                  <GentleScriptCard key={i} content={script.content} voiceLabel={script.voice === "farmer" ? "農夫版" : "農婦版"} scriptIndex={i + 1} onCopy={() => copyGentleScript(script.content, i)} copied={gentleCopied === String(i)} />
                ))}
              </div>
            )}

            <div style={{ marginTop: 28, padding: "16px 20px", background: "#fdf6ee", borderRadius: 8, borderLeft: "3px solid #c8a87a" }}>
              <div style={{ fontSize: 12, color: "#8b5c2a", fontWeight: 600, marginBottom: 6 }}>使用方式</div>
              <div style={{ fontSize: 12, color: "#7a5030", lineHeight: 1.8 }}>
                · 有孩子互動的農事特別適合這個調性（摸土、澆水、採收表情）<br />
                · 旁白腳本可以直接念，不用另外想台詞，減少拍攝時的卡頓<br />
                · 優先拍「曬過程」和「說故事」，這兩類在溫和調性效果最好<br />
                · 複製後截圖存手機，開始工作前再看一眼，知道今天的旁白方向
              </div>
            </div>
          </>
        )}

        {/* ── IP 貼文頁 ── */}
        {tab === "ip" && (
          <>
            <div style={{ background: "#fdf8ee", border: "1px solid #e8d498", borderRadius: 10, padding: "14px 18px", marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#9b6e1e", fontWeight: 600, marginBottom: 6 }}>✦ IP 定位：在土地上做人生實驗的人</div>
              <div style={{ fontSize: 12, color: "#7a5010", lineHeight: 2 }}>
                前交易員 → 新店農夫爸爸　核心精神：我願意被現實修正<br />
                <span style={{ background: "#f5e8c0", padding: "1px 8px", borderRadius: 4, marginRight: 6 }}>不是</span>最成功・最穩・最深　<span style={{ background: "#f5e8c0", padding: "1px 8px", borderRadius: 4, marginRight: 6 }}>而是</span>很真・這個人沒有在演
              </div>
              <div style={{ fontSize: 11, color: "#b09050", marginTop: 6 }}>用「我」說話・承認情緒・允許動搖・校正但不說教</div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #e8d498", borderRadius: 12, padding: "24px 28px", marginBottom: 20, boxShadow: "0 2px 8px rgba(155,110,30,0.07)" }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a3a0a", display: "block", marginBottom: 8 }}>今天發生了什麼 / 你想說的</label>
              <textarea
                value={ipEvent} onChange={e => setIpEvent(e.target.value)}
                placeholder={"例如：拔草拔到一半，突然想到以前在交易室看盤的感覺⋯⋯\n例如：帶孩子澆水，他把水澆到我鞋子上，然後說「爸爸你也需要喝水」"}
                rows={4}
                style={{ width: "100%", padding: "12px 14px", fontSize: 15, fontFamily: "'Noto Serif TC', serif", border: "1px solid #d4b860", borderRadius: 8, background: "#fffcf2", color: "#2e1a00", resize: "vertical", outline: "none", boxSizing: "border-box" }}
              />
              <div style={{ fontSize: 12, color: "#b8900a", marginTop: 4 }}>不需要寫完整 ── 碎片也可以，AI 會從裡面找到張力</div>

              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: 12, color: "#7a5010", display: "block", marginBottom: 8, fontWeight: 600 }}>內容類型</label>
                <button onClick={() => setIpType("auto")} style={{ width: "100%", padding: "10px 14px", marginBottom: 8, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", textAlign: "left", border: ipType === "auto" ? "2px solid #9b6e1e" : "1px solid #d4b860", background: ipType === "auto" ? "#fdf0cc" : "#fffcf2", transition: "all 0.15s" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#7a4a00" }}>🤖 AI 自選</span>
                  <span style={{ fontSize: 11, color: "#b8900a", marginLeft: 8 }}>按框架比例建議最適合的類型</span>
                </button>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {IP_TYPES.filter(t => t.key !== "auto").map(t => (
                    <button key={t.key} onClick={() => setIpType(t.key)} style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", textAlign: "left", fontFamily: "inherit", transition: "all 0.15s", border: ipType === t.key ? "2px solid #9b6e1e" : "1px solid #d4b860", background: ipType === t.key ? "#fdf0cc" : "#fffcf2" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: ipType === t.key ? "#7a4a00" : "#5a3a0a" }}>{ipType === t.key ? "✓ " : ""}{t.label}</div>
                      <div style={{ fontSize: 11, color: "#b8900a", marginTop: 2 }}>{t.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: 12, color: "#7a5010", display: "block", marginBottom: 8, fontWeight: 600 }}>內容濃度</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {IP_DENSITIES.map(d => (
                    <button key={d.key} onClick={() => setIpDensity(d.key)} style={{ flex: 1, padding: "12px 8px", borderRadius: 8, fontFamily: "inherit", cursor: "pointer", textAlign: "center", transition: "all 0.15s", border: ipDensity === d.key ? "2px solid #9b6e1e" : "1px solid #d4b860", background: ipDensity === d.key ? "#9b6e1e" : "#fffcf2", color: ipDensity === d.key ? "#fff" : "#5a3a0a" }}>
                      <div style={{ fontSize: 22, fontWeight: 900, lineHeight: 1 }}>{d.label}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4 }}>{d.sub}</div>
                      <div style={{ fontSize: 11, marginTop: 2, opacity: 0.8 }}>{d.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
                <button onClick={() => setIpIncludeDoubt(v => !v)} style={{ flex: 1, padding: "10px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", textAlign: "left", transition: "all 0.15s", border: ipIncludeDoubt ? "2px solid #9b6e1e" : "1px solid #d4b860", background: ipIncludeDoubt ? "#fdf0cc" : "#fffcf2" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#5a3a0a" }}>{ipIncludeDoubt ? "✓ " : ""}動搖瞬間</div>
                  <div style={{ fontSize: 11, color: "#b8900a", marginTop: 2 }}>誠實說出不確定的時刻</div>
                </button>
                <button onClick={() => setIpIncludeScreenshot(v => !v)} style={{ flex: 1, padding: "10px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", textAlign: "left", transition: "all 0.15s", border: ipIncludeScreenshot ? "2px solid #9b6e1e" : "1px solid #d4b860", background: ipIncludeScreenshot ? "#fdf0cc" : "#fffcf2" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#5a3a0a" }}>{ipIncludeScreenshot ? "✓ " : ""}截圖句</div>
                  <div style={{ fontSize: 11, color: "#b8900a", marginTop: 2 }}>最後加一句有觀點的獨立短句</div>
                </button>
              </div>

              <button onClick={generateIPPost} disabled={ipLoading || !ipEvent.trim()} style={{ width: "100%", marginTop: 20, padding: "14px", background: ipLoading ? "#c8a040" : "#9b6e1e", color: "#fff9ec", border: "none", borderRadius: 8, fontSize: 16, fontFamily: "inherit", fontWeight: 700, cursor: ipLoading || !ipEvent.trim() ? "not-allowed" : "pointer", letterSpacing: 1, transition: "background 0.2s" }}>
                {ipLoading ? "從波動裡找節奏中⋯⋯" : "✦ 生成個人 IP 貼文"}
              </button>
              {ipError && <div style={{ fontSize: 13, color: "#c0392b", marginTop: 8 }}>{ipError}</div>}
            </div>

            {ipLoading && !ipPost && (
              <div style={{ background: "#fff", border: "1px solid #e8d498", borderRadius: 12, padding: "32px", textAlign: "center", color: "#c8a040", fontSize: 14 }}>正在寫你想說的⋯⋯</div>
            )}

            {ipPost && (
              <IPPostCard
                content={ipPost}
                checklist={ipChecklist}
                onToggleChecklist={toggleIPChecklist}
                onCopy={copyIPPost}
                copied={ipCopied}
              />
            )}

            <div style={{ marginTop: 28, padding: "16px 20px", background: "#fdf8ee", borderRadius: 8, borderLeft: "3px solid #c8a040" }}>
              <div style={{ fontSize: 12, color: "#9b6e1e", fontWeight: 600, marginBottom: 6 }}>使用提示</div>
              <div style={{ fontSize: 12, color: "#7a5010", lineHeight: 1.8 }}>
                · 這是你的個人貼文，不是品牌文案 ── 說「我」，不說「農夫」<br />
                · 不需要寫完整的事 ── AI 會從碎片裡找到張力<br />
                · 生成後用品質核對清單自檢，確認夠真實再發布<br />
                · 「濃」版適合截圖分享，「淡」版適合純粹記錄當天心情
              </div>
            </div>
          </>
        )}

        {/* ── 收藏頁 ── */}
        {tab === "favorites" && (
          <div>
            <div style={{ fontSize: 13, color: "#5a7a3a", marginBottom: 16 }}>
              收藏的好文會在下次生成時自動注入 prompt，讓 AI 學習你的風格偏好。每個聲線最多參考 2 篇。
            </div>
            {favorites.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 0", color: "#a0c070", fontSize: 14 }}>還沒有收藏。生成貼文後按 ⭐ 收藏你最喜歡的！</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {favorites.map(fav => (
                  <div key={fav.id} style={{ background: "#fff", border: "1px solid #d4e8b0", borderRadius: 10, padding: "16px 20px", boxShadow: "0 1px 4px rgba(45,74,30,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: "#7aac48", fontWeight: 600 }}>{VOICE_LABELS[fav.voice] || fav.voice}</span>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: "#b0c8a0" }}>{new Date(fav.timestamp).toLocaleDateString("zh-TW")}</span>
                        <button onClick={() => removeFavorite(fav.id)} style={{ padding: "3px 10px", fontSize: 11, background: "#fff5f5", border: "1px solid #f0c0c0", borderRadius: 6, color: "#c04040", cursor: "pointer", fontFamily: "inherit" }}>移除</button>
                      </div>
                    </div>
                    <div style={{ fontSize: 14, color: "#1a2e10", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{fav.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── 歷史頁 ── */}
        {tab === "history" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#5a7a3a" }}>共 {history.length} 篇生成紀錄（最多保留 200 篇）</div>
              {history.length > 0 && (
                <button onClick={() => { setHistory([]); saveLS("lf_history", []); }} style={{ padding: "4px 12px", fontSize: 11, background: "#fff5f5", border: "1px solid #f0c0c0", borderRadius: 6, color: "#c04040", cursor: "pointer", fontFamily: "inherit" }}>清空歷史</button>
              )}
            </div>
            {history.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 0", color: "#a0c070", fontSize: 14 }}>還沒有生成紀錄。</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {history.map(h => (
                  <div key={h.id} style={{ background: "#fff", border: "1px solid #d4e8b0", borderRadius: 10, padding: "16px 20px", boxShadow: "0 1px 4px rgba(45,74,30,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "#7aac48", fontWeight: 600 }}>{VOICE_LABELS[h.voice] || h.voice}</span>
                        <span style={{ fontSize: 11, color: "#a0c870", background: "#f0f8e8", padding: "1px 7px", borderRadius: 10 }}>{h.mood}</span>
                        <span style={{ fontSize: 11, color: "#a0c870", background: "#f0f8e8", padding: "1px 7px", borderRadius: 10 }}>{h.season}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: "#b0c8a0" }}>{new Date(h.timestamp).toLocaleDateString("zh-TW")}</span>
                        <button onClick={() => isFavorited(h.text) ? removeFavorite(favorites.find(f => f.text === h.text)?.id) : addFavorite(h.text, h.voice)} style={{ padding: "3px 10px", fontSize: 11, background: isFavorited(h.text) ? "#fffbea" : "#f4fbea", border: `1px solid ${isFavorited(h.text) ? "#e0c840" : "#c8e0a0"}`, borderRadius: 6, color: isFavorited(h.text) ? "#a08010" : "#5a7a3a", cursor: "pointer", fontFamily: "inherit" }}>
                          {isFavorited(h.text) ? "⭐ 已收藏" : "☆ 收藏"}
                        </button>
                      </div>
                    </div>
                    {h.situation && <div style={{ fontSize: 11, color: "#9ab880", marginBottom: 6 }}>情境：{h.situation.slice(0, 40)}{h.situation.length > 40 ? "…" : ""}</div>}
                    <div style={{ fontSize: 14, color: "#1a2e10", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{h.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function GentleScriptCard({ content, voiceLabel, scriptIndex, onCopy, copied }) {
  const theme = extractTheme(content);
  const cardTitle = theme ? `腳本${scriptIndex}・${theme}` : `腳本 ${scriptIndex}`;
  return (
    <div style={{ background: "#fff", border: "1px solid #e0d0b8", borderTop: "3px solid #6b4c2a", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(107,76,42,0.08)" }}>
      <div style={{ padding: "14px 20px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #f0e8d8" }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#6b4c2a" }}>{cardTitle}</span>
        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 12, background: "#f5ead8", color: "#8b5c2a" }}>{voiceLabel}</span>
        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 12, background: "#faf5ed", color: "#9a7a5a" }}>溫和調性</span>
      </div>
      <div style={{ padding: "20px 24px 16px", fontSize: 14, color: "#2e1a0e", lineHeight: 2.1, fontFamily: "'Noto Serif TC', serif", whiteSpace: "pre-wrap" }}>
        {content}
      </div>
      <div style={{ padding: "0 20px 20px" }}>
        <button onClick={onCopy} style={{ width: "100%", padding: "14px", background: copied ? "#7a6040" : "#6b4c2a", color: "#fef6ec", border: "none", borderRadius: 8, fontSize: 15, fontFamily: "inherit", fontWeight: 700, cursor: "pointer", letterSpacing: 1, transition: "background 0.25s" }}>
          {copied ? "✅ 已複製！存到手機備忘錄吧" : "📋 複製腳本"}
        </button>
      </div>
    </div>
  );
}

function VideoScriptCard({ content, voiceLabel, scriptIndex, onCopy, copied }) {
  const theme = extractTheme(content);
  const cardTitle = theme ? `腳本${scriptIndex}・${theme}` : `腳本 ${scriptIndex}`;
  return (
    <div style={{ background: "#fff", border: "1px solid #d4e8b0", borderTop: "3px solid #1a3a10", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(45,74,30,0.06)" }}>
      <div style={{ padding: "14px 20px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #eef5e4" }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#1a3a10" }}>{cardTitle}</span>
        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 12, background: "#d8f0b0", color: "#2a5010" }}>{voiceLabel}</span>
        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 12, background: "#f0f8e8", color: "#5a7a3a" }}>出門前必看</span>
      </div>
      <div style={{ padding: "20px 24px 16px", fontSize: 14, color: "#1a2e10", lineHeight: 2, fontFamily: "'Noto Serif TC', serif", whiteSpace: "pre-wrap" }}>
        {content}
      </div>
      <div style={{ padding: "0 20px 20px" }}>
        <button onClick={onCopy} style={{ width: "100%", padding: "14px", background: copied ? "#4a7c2e" : "#1a3a10", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontFamily: "inherit", fontWeight: 700, cursor: "pointer", letterSpacing: 1, transition: "background 0.25s" }}>
          {copied ? "✅ 已複製！存到手機備忘錄吧" : "📋 複製腳本"}
        </button>
      </div>
    </div>
  );
}

function IPPostCard({ content, checklist, onToggleChecklist, onCopy, copied }) {
  const checkItems = [
    { key: "hasScene", label: "有具體畫面？（數字、動作、不只是感覺）" },
    { key: "hasInner", label: "有內在瞬間？（第一反應、動搖、不甘心）" },
    { key: "hasImperfect", label: "有承認情緒？（不假裝淡定、不表演從容）" },
    { key: "noPreaching", label: "沒有高位語氣？（無說教、無自我神話）" },
    { key: "soundsLikeMe", label: "讀起來不像在表演？（是紀錄，不是成功故事）" },
  ];
  const passCount = Object.values(checklist).filter(Boolean).length;
  return (
    <div style={{ background: "#fff", border: "1px solid #e8d498", borderTop: "3px solid #9b6e1e", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(155,110,30,0.08)" }}>
      <div style={{ padding: "14px 20px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #f5e8c0" }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#9b6e1e" }}>✦ IP 貼文草稿</span>
        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 12, background: "#fdf0cc", color: "#9b6e1e" }}>個人視角</span>
        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 12, background: "#faf5e4", color: "#b8900a" }}>用「我」說話</span>
      </div>
      <div style={{ padding: "20px 24px 16px", fontSize: 15, color: "#2e1a00", lineHeight: 2.1, fontFamily: "'Noto Serif TC', serif", whiteSpace: "pre-wrap" }}>
        {content}
      </div>
      <div style={{ margin: "0 20px 16px", padding: "14px 16px", background: "#fdf8ee", borderRadius: 8, border: "1px solid #e8d498" }}>
        <div style={{ fontSize: 12, color: "#9b6e1e", fontWeight: 600, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>發布前品質核對</span>
          <span style={{ fontSize: 11, color: passCount === 5 ? "#4a7c2e" : "#b8900a" }}>{passCount}/5 {passCount === 5 ? "✅ 可以發了！" : "先檢查一下"}</span>
        </div>
        {checkItems.map((item, idx) => (
          <div key={item.key} onClick={() => onToggleChecklist(item.key)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", cursor: "pointer", borderBottom: idx < checkItems.length - 1 ? "1px solid #f0e4b0" : "none" }}>
            <div style={{ width: 20, height: 20, flexShrink: 0, borderRadius: 4, border: checklist[item.key] ? "none" : "1.5px solid #d4b860", background: checklist[item.key] ? "#9b6e1e" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
              {checklist[item.key] && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, lineHeight: 1 }}>✓</span>}
            </div>
            <span style={{ fontSize: 13, color: checklist[item.key] ? "#9b6e1e" : "#7a5010", fontWeight: checklist[item.key] ? 600 : 400 }}>{item.label}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: "0 20px 20px" }}>
        <button onClick={onCopy} style={{ width: "100%", padding: "14px", background: copied ? "#7a5010" : "#9b6e1e", color: "#fff9ec", border: "none", borderRadius: 8, fontSize: 15, fontFamily: "inherit", fontWeight: 700, cursor: "pointer", letterSpacing: 1, transition: "background 0.25s" }}>
          {copied ? "✅ 已複製！準備發布" : "📋 複製貼文"}
        </button>
      </div>
    </div>
  );
}

function PostCard({ title, subtitle, accentColor, tagColor, tagText, content, loading, onCopy, copied, onFavorite, isFavorited }) {
  return (
    <div style={{ background: "#fff", border: `1px solid #d4e8b0`, borderTop: `3px solid ${accentColor}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(45,74,30,0.06)" }}>
      <div style={{ padding: "14px 20px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #eef5e4" }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: accentColor }}>{title}</span>
        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 12, background: tagColor, color: tagText }}>{subtitle}</span>
      </div>
      <div style={{ padding: "20px 24px 16px", minHeight: 100, fontSize: 15, color: "#1a2e10", lineHeight: 2, fontFamily: "'Noto Serif TC', serif", whiteSpace: "pre-wrap" }}>
        {loading ? <div style={{ color: "#a0c070", fontSize: 14 }}>正在生成中⋯⋯</div>
          : content ? content
          : <div style={{ color: "#c0d8a0", fontSize: 14 }}>貼文將在這裡出現</div>}
      </div>
      {content && (
        <div style={{ padding: "0 20px 20px", display: "flex", gap: 10 }}>
          <button onClick={onFavorite} style={{ flex: "0 0 auto", padding: "14px 18px", background: isFavorited ? "#fffbea" : "#f4fbea", border: `1.5px solid ${isFavorited ? "#e0c840" : "#c8e0a0"}`, borderRadius: 8, fontSize: 18, cursor: "pointer", transition: "all 0.2s" }}>
            {isFavorited ? "⭐" : "☆"}
          </button>
          <button onClick={onCopy} style={{ flex: 1, padding: "14px", background: copied ? "#4a7c2e" : accentColor, color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontFamily: "inherit", fontWeight: 700, cursor: "pointer", letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.25s" }}>
            {copied ? "✅ 已複製！貼到 FB 吧" : "📋 一鍵複製貼文"}
          </button>
        </div>
      )}
    </div>
  );
}
