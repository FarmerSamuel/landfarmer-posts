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

const BASE_VIDEO_SCRIPT = `你是大地農夫品牌的短影音腳本規劃師，熟悉行銷專家陳修平的短影片七大主題框架，也深刻理解大地農夫（農夫一拳）的品牌語氣與農場特色。

【大地農夫品牌背景】
農場位於新北市新店區，以真實田園生活、自然農法為核心，目標客群是認同土地價值的城市人。
影片風格：真實、不過度包裝、有溫度、帶著農夫一貫的豁達幽默感。

${TONE_RULE}

【陳修平短影片七大主題框架——選一個最適合的】
1. 曬過程 — 真實紀錄農事過程，讓觀眾感受農夫日常，重點是「真實感」和「節奏美感」
2. 教知識 — 傳授跟農業/食材/土地有關的具體知識，開場先拋出反直覺的問題鉤子
3. 熬雞湯 — 從農事中提煉人生體悟，有溫度不說教，結尾輕輕放下不強求共鳴
4. 說故事 — 講農場上的真實故事，有起承轉合，最後有一個意外的轉折
5. 選立場 — 對農業/飲食/生活議題表達農夫觀點，開場先說出讓人有感的矛盾
6. 賣產品 — 推介大地農夫的蔬菜、農產品或體驗活動，用生活場景帶出產品而非硬廣
7. 演劇情 — 設計輕鬆農場情境，農夫獨白或家人互動，帶點自嘲式幽默

【腳本格式規則】嚴格依照以下格式輸出，不要加任何說明或前言：

▍主題類型
[主題名稱]：[一句吸引人的核心訴求，15字以內]

▍開場鉤子（前3秒）
畫面：[具體要拍什麼場景/動作/特寫，越具體越好]
台詞：[農夫說的一句話，或畫面字幕文字]

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

▍農夫台詞建議
「[第一句，口語自然，像農夫說話，不是廣告詞]」
「[第二句]」
（最多3句，讓農夫對著鏡頭說的話）

▍結尾 CTA
[一句收尾，呼應主題，引導觀眾追蹤或留言]

現在根據以下資訊生成腳本：
`;

const MOODS = ["農事日誌", "產品推廣", "會員故事", "活動預告", "廢文日常", "節氣感懷"];
const SEASONS = ["春", "夏", "秋", "冬"];
const VOICE_LABELS = { farmer: "農夫版", farmwife: "農婦版", yeyang: "農婦散文風版" };

const VIDEO_THEMES = [
  { key: "auto", label: "🤖 AI 自動選", sub: "根據農事推薦最適合的主題" },
  { key: "process", label: "曬過程", sub: "真實農事紀錄" },
  { key: "knowledge", label: "教知識", sub: "農業 / 食材知識" },
  { key: "wisdom", label: "熬雞湯", sub: "土地帶來的體悟" },
  { key: "story", label: "說故事", sub: "農場真實故事" },
  { key: "stance", label: "選立場", sub: "農業 / 飲食觀點" },
  { key: "product", label: "賣產品", sub: "蔬菜 / 體驗活動" },
  { key: "drama", label: "演劇情", sub: "輕鬆農場小短劇" },
];

const VIDEO_DURATIONS = ["30秒", "60秒", "90秒"];

function loadLS(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; } catch { return fallback; }
}
function saveLS(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

export default function App() {
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

  const [videoTasks, setVideoTasks] = useState("");
  const [videoTheme, setVideoTheme] = useState("auto");
  const [videoDuration, setVideoDuration] = useState("60秒");
  const [videoScript, setVideoScript] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoCopied, setVideoCopied] = useState(false);
  const [videoError, setVideoError] = useState("");

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

  const generateVideoScript = async () => {
    if (!videoTasks.trim()) return;
    setVideoLoading(true); setVideoError(""); setVideoScript("");
    try {
      const themeInstruction = videoTheme === "auto"
        ? "根據今日農事工作，自動選擇七大主題中最適合拍攝的一個"
        : `指定主題：${VIDEO_THEMES.find(t => t.key === videoTheme)?.label}`;
      const content = `${BASE_VIDEO_SCRIPT}\n今日農事工作：${videoTasks}\n主題指示：${themeInstruction}\n目標影片長度：${videoDuration}`;
      const result = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1500,
          messages: [{ role: "user", content }],
        }),
      }).then(r => r.json()).then(d => d.content?.map(b => b.text || "").join("") || "");
      setVideoScript(result);
    } catch (e) { setVideoError("生成失敗：" + e.message); }
    setVideoLoading(false);
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key); setTimeout(() => setCopied(""), 2000);
  };

  const copyVideo = () => {
    navigator.clipboard.writeText(videoScript);
    setVideoCopied(true); setTimeout(() => setVideoCopied(false), 2000);
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
        <div style={{ fontSize: 12, color: "#7aac48", marginTop: 4 }}>FB 文案 × 短影音腳本 · AI 生成草稿</div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 4, marginTop: 16, flexWrap: "wrap" }}>
          {[
            { key: "generate", label: "✏️ FB文案" },
            { key: "video", label: "🎬 影片腳本" },
            { key: "favorites", label: `⭐ 好文收藏${favCount ? ` (${favCount})` : ""}` },
            { key: "history", label: `📋 歷史${histCount ? ` (${histCount})` : ""}` },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: "6px 16px",
              borderRadius: "6px 6px 0 0",
              border: "none",
              background: tab === t.key ? "#f7f4ef" : "transparent",
              color: tab === t.key ? "#2d4a1e" : "#a8c97a",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: tab === t.key ? 700 : 400,
              cursor: "pointer",
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
                value={situation}
                onChange={e => setSituation(e.target.value)}
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

        {/* ── 影片腳本頁 ── */}
        {tab === "video" && (
          <>
            <div style={{ background: "#fff", border: "1px solid #d4e8b0", borderRadius: 12, padding: "24px 28px", marginBottom: 20, boxShadow: "0 2px 8px rgba(45,74,30,0.06)" }}>

              <label style={{ fontSize: 13, fontWeight: 600, color: "#2d4a1e", display: "block", marginBottom: 8 }}>今日農事工作項目</label>
              <textarea
                value={videoTasks}
                onChange={e => setVideoTasks(e.target.value)}
                placeholder="例如：採收青花菜（第一次採收）、整理苗床、澆水施肥、除草⋯⋯"
                rows={3}
                style={{ width: "100%", padding: "12px 14px", fontSize: 15, fontFamily: "'Noto Serif TC', serif", border: "1px solid #c8e0a0", borderRadius: 8, background: "#fafff5", color: "#1a2e10", resize: "vertical", outline: "none", boxSizing: "border-box" }}
              />
              <div style={{ fontSize: 12, color: "#8ab561", marginTop: 4 }}>
                越具體越精準 ── 可以列多項，AI 會選最適合拍攝的項目來規劃腳本
              </div>

              {/* 主題選擇 */}
              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: 12, color: "#5a7a3a", display: "block", marginBottom: 8, fontWeight: 600 }}>
                  影片主題 <span style={{ fontWeight: 400, color: "#8ab561" }}>（陳修平七大主題框架）</span>
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {VIDEO_THEMES.map(t => (
                    <button key={t.key} onClick={() => setVideoTheme(t.key)} style={{
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: videoTheme === t.key ? "2px solid #4a7c2e" : "1px solid #c8e0a0",
                      background: videoTheme === t.key ? "#eaf7d8" : "#fafff5",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "inherit",
                      transition: "all 0.15s",
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: videoTheme === t.key ? "#2a5010" : "#2d4a1e" }}>{t.label}</div>
                      <div style={{ fontSize: 11, color: "#7aac48", marginTop: 2 }}>{t.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 長度選擇 */}
              <div style={{ marginTop: 18 }}>
                <label style={{ fontSize: 12, color: "#5a7a3a", display: "block", marginBottom: 8, fontWeight: 600 }}>目標影片長度</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {VIDEO_DURATIONS.map(d => (
                    <button key={d} onClick={() => setVideoDuration(d)} style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: 8,
                      border: videoDuration === d ? "2px solid #4a7c2e" : "1px solid #c8e0a0",
                      background: videoDuration === d ? "#4a7c2e" : "#fafff5",
                      color: videoDuration === d ? "#fff" : "#5a7a3a",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: 15,
                      fontWeight: 700,
                      transition: "all 0.15s",
                    }}>{d}</button>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "#8ab561", marginTop: 6 }}>
                  30秒 = Reels精華款　60秒 = 標準款　90秒 = 較完整的故事款
                </div>
              </div>

              <button
                onClick={generateVideoScript}
                disabled={videoLoading || !videoTasks.trim()}
                style={{
                  width: "100%", marginTop: 20, padding: "14px",
                  background: videoLoading ? "#a0c070" : "#1a3a10",
                  color: "#e8f5d0", border: "none", borderRadius: 8,
                  fontSize: 16, fontFamily: "inherit", fontWeight: 700,
                  cursor: videoLoading || !videoTasks.trim() ? "not-allowed" : "pointer",
                  letterSpacing: 1, transition: "background 0.2s",
                }}
              >
                {videoLoading ? "農夫腳本規劃中⋯⋯" : "🎬 生成拍攝腳本"}
              </button>
              {videoError && <div style={{ fontSize: 13, color: "#c0392b", marginTop: 8 }}>{videoError}</div>}
            </div>

            {videoLoading && !videoScript && (
              <div style={{ background: "#fff", border: "1px solid #d4e8b0", borderRadius: 12, padding: "32px", textAlign: "center", color: "#a0c070", fontSize: 14 }}>
                正在規劃今天要拍什麼⋯⋯
              </div>
            )}

            {videoScript && (
              <VideoScriptCard content={videoScript} onCopy={copyVideo} copied={videoCopied} />
            )}

            <div style={{ marginTop: 28, padding: "16px 20px", background: "#eef7e0", borderRadius: 8, borderLeft: "3px solid #8ab561" }}>
              <div style={{ fontSize: 12, color: "#4a7c2e", fontWeight: 600, marginBottom: 6 }}>使用方式</div>
              <div style={{ fontSize: 12, color: "#5a7a3a", lineHeight: 1.8 }}>
                · 出門前先生成腳本，知道要抓哪些畫面，工作不被打斷<br />
                · 農事工作越詳細，素材清單越精準（可以說「第一次採收」「今天天氣特別好」等細節）<br />
                · 複製後截圖或貼到手機備忘錄，田裡快速查看 □ 清單<br />
                · 選「AI 自動選」讓系統判斷今天最適合拍哪種類型
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
              <div style={{ textAlign: "center", padding: "48px 0", color: "#a0c070", fontSize: 14 }}>
                還沒有收藏。生成貼文後按 ⭐ 收藏你最喜歡的！
              </div>
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
                        <button onClick={() => isFavorited(h.text) ? removeFavorite(favorites.find(f => f.text === h.text)?.id) : addFavorite(h.text, h.voice)}
                          style={{ padding: "3px 10px", fontSize: 11, background: isFavorited(h.text) ? "#fffbea" : "#f4fbea", border: `1px solid ${isFavorited(h.text) ? "#e0c840" : "#c8e0a0"}`, borderRadius: 6, color: isFavorited(h.text) ? "#a08010" : "#5a7a3a", cursor: "pointer", fontFamily: "inherit" }}>
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

function VideoScriptCard({ content, onCopy, copied }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #d4e8b0",
      borderTop: "3px solid #1a3a10",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(45,74,30,0.06)",
      marginBottom: 16,
    }}>
      <div style={{ padding: "14px 20px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #eef5e4" }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#1a3a10" }}>今日拍攝腳本</span>
        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 12, background: "#d8f0b0", color: "#2a5010" }}>出門前必看</span>
      </div>
      <div style={{
        padding: "20px 24px 16px",
        fontSize: 14,
        color: "#1a2e10",
        lineHeight: 2,
        fontFamily: "'Noto Serif TC', serif",
        whiteSpace: "pre-wrap",
      }}>
        {content}
      </div>
      <div style={{ padding: "0 20px 20px" }}>
        <button onClick={onCopy} style={{
          width: "100%",
          padding: "14px",
          background: copied ? "#4a7c2e" : "#1a3a10",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 15,
          fontFamily: "inherit",
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: 1,
          transition: "background 0.25s",
        }}>
          {copied ? "✅ 已複製！存到手機備忘錄吧" : "📋 複製腳本"}
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
          <button onClick={onFavorite} style={{
            flex: "0 0 auto",
            padding: "14px 18px",
            background: isFavorited ? "#fffbea" : "#f4fbea",
            border: `1.5px solid ${isFavorited ? "#e0c840" : "#c8e0a0"}`,
            borderRadius: 8, fontSize: 18, cursor: "pointer",
            transition: "all 0.2s",
          }}>
            {isFavorited ? "⭐" : "☆"}
          </button>
          <button onClick={onCopy} style={{
            flex: 1, padding: "14px", background: copied ? "#4a7c2e" : accentColor,
            color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontFamily: "inherit",
            fontWeight: 700, cursor: "pointer", letterSpacing: 1,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.25s",
          }}>
            {copied ? "✅ 已複製！貼到 FB 吧" : "📋 一鍵複製貼文"}
          </button>
        </div>
      )}
    </div>
  );
}
