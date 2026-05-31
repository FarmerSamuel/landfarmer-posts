import { useState, useRef } from "react";

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

const FARMER_PROMPT = `你是「大地農夫」的農夫（一拳），一位在新北市新店區經營田園生活實驗場的農夫，同時也是品牌大地農夫的創辦人。
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

const FARMWIFE_PROMPT = `你是「大地農夫」的農婦（阿雯），在新北市新店區與農夫一起經營田園生活實驗場。
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

另一則：
「周日好天氣
與其去人擠人
不如帶著寶寶到田裡面
挖挖看有什麼寶貝
晚餐時
寶寶吃著 自己勞動的成果
可香了！」

現在根據以下情境，生成一篇 Facebook 貼文：
`;

const YEYANG_PROMPT = `你要模仿台灣作家「葉揚」寫孩子、寫家庭生活的 Facebook 貼文語氣，幫大地農夫的農婦（阿雯）寫一篇關於農場生活的貼文。農婦有一個孩子（寶寶/把拔）。
${TONE_RULE}

【葉揚寫孩子的核心手法——趣味性來源】

1. 「孩子語出驚人」結構：
   先鋪陳一個普通的日常場景，然後孩子突然說出一句完全出乎意料、但邏輯上又無懈可擊的話，
   媽媽整個被將軍——無言以對、或只能苦笑收場。
   例：媽媽說「要選一個玩具」，孩子反問「為什麼醫生不能打高爾夫球？」
   例：全場大人輪流說剪髮很棒，孩子最後說「有陌生人在旁邊加油，也是滿可怕的」

2. 「旁觀自己被擺道」感：
   媽媽不是受害者，是一個帶著苦笑在旁邊記錄的人。
   語氣是「我看著眼前這幕，不知道該說什麼才好」，
   而不是「這個孩子讓我好累好崩潰」。

3. 孩子被賦予「老靈魂」特質：
   孩子說的話或做的事，有一種不像小孩的邏輯——太有主見、太清醒、或太有道理，
   反而讓大人語塞。媽媽是被這個小人物「教育」到的那個人。

4. 對話還原：
   直接寫出對話，不加解釋。讓讀者自己在對話裡笑出來。
   媽媽說了什麼，孩子怎麼回，就這樣。

5. 結尾「輕輕放下」：
   不升華、不說教。就是一句帶著好笑無奈的喃喃自語，
   像是「我想了很久，決定不要跟他繼續爭這個問題。」
   或是「好，好，總裁說得對。」

【格式規則】
- 段落式散文，對話用換行呈現
- 2–4 個段落，每段 2–4 句
- 全文 150–250 字
- hashtag 最多 1–2 個，放最後，要跟內容呼應

【表情符號規則】
- 農婦散文風用最少的符號，整篇最多 2 個，點到為止
- 適合放在結尾那句喃喃自語後面：🌱 🌿 😌 🤭
- 不要打斷散文節奏，只在情緒最高點或結尾輕輕用一個

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

const MOODS = ["農事日誌", "產品推廣", "會員故事", "活動預告", "廢文日常", "節氣感懷"];
const SEASONS = ["春", "夏", "秋", "冬"];

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

  const apiCall = (promptText) =>
    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: `${promptText}\n情境：${situation}\n類型：${mood}\n季節：${season}\n\n請直接輸出貼文內容，不要加任何說明或前言。` }],
      }),
    }).then(r => r.json()).then(d => d.content?.map(b => b.text || "").join("") || "");

  const callAPI = async (prompt, setter) => {
    const text = await apiCall(prompt);
    setter(text);
  };

  const generate = async () => {
    if (!situation.trim()) return;
    setLoading(true);
    setError("");
    setFarmerPost(""); setFarmwifePost(""); setYeyangPost("");
    try {
      if (voice === "both") {
        const [ft, wt, yt] = await Promise.all([
          apiCall(FARMER_PROMPT),
          apiCall(FARMWIFE_PROMPT),
          apiCall(YEYANG_PROMPT),
        ]);
        setFarmerPost(ft); setFarmwifePost(wt); setYeyangPost(yt);
      } else if (voice === "farmer") {
        await callAPI(FARMER_PROMPT, setFarmerPost);
      } else if (voice === "farmwife") {
        await callAPI(FARMWIFE_PROMPT, setFarmwifePost);
      } else {
        await callAPI(YEYANG_PROMPT, setYeyangPost);
      }
    } catch (e) {
      setError("生成失敗：" + e.message);
    }
    setLoading(false);
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f7f4ef",
      fontFamily: "'Noto Serif TC', Georgia, serif",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "#2d4a1e",
        padding: "28px 32px 22px",
        borderBottom: "3px solid #8ab561",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#e8f5d0", letterSpacing: 2 }}>大地農夫</span>
          <span style={{ fontSize: 13, color: "#a8c97a", letterSpacing: 1 }}>FB 文案生成器</span>
        </div>
        <div style={{ fontSize: 12, color: "#7aac48", marginTop: 4 }}>農夫 × 農婦 × 散文風 · AI 生成草稿</div>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "28px 24px 48px" }}>
        {/* Input Panel */}
        <div style={{
          background: "#fff",
          border: "1px solid #d4e8b0",
          borderRadius: 12,
          padding: "24px 28px",
          marginBottom: 20,
          boxShadow: "0 2px 8px rgba(45,74,30,0.06)",
        }}>
          {/* Situation */}
          <label style={{ fontSize: 13, fontWeight: 600, color: "#2d4a1e", display: "block", marginBottom: 8 }}>
            今天的情境 / 想說的事
          </label>
          <textarea
            value={situation}
            onChange={e => setSituation(e.target.value)}
            placeholder="例如：今天採了第一批紫蘇，洗到手都黑了，孩子在旁邊玩泥巴⋯⋯"
            rows={3}
            style={{
              width: "100%",
              padding: "12px 14px",
              fontSize: 15,
              fontFamily: "'Noto Serif TC', serif",
              border: "1px solid #c8e0a0",
              borderRadius: 8,
              background: "#fafff5",
              color: "#1a2e10",
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          {/* Controls row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16 }}>
            {/* Mood */}
            <div style={{ flex: "1 1 160px" }}>
              <label style={{ fontSize: 12, color: "#5a7a3a", display: "block", marginBottom: 6 }}>貼文類型</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {MOODS.map(m => (
                  <button key={m} onClick={() => setMood(m)} style={{
                    padding: "5px 12px",
                    fontSize: 12,
                    borderRadius: 20,
                    border: mood === m ? "1.5px solid #4a7c2e" : "1px solid #c8e0a0",
                    background: mood === m ? "#d8f0b0" : "#f4fbea",
                    color: mood === m ? "#2a5010" : "#5a7a3a",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontWeight: mood === m ? 600 : 400,
                  }}>{m}</button>
                ))}
              </div>
            </div>

            {/* Season */}
            <div style={{ flex: "0 0 auto" }}>
              <label style={{ fontSize: 12, color: "#5a7a3a", display: "block", marginBottom: 6 }}>季節</label>
              <div style={{ display: "flex", gap: 6 }}>
                {SEASONS.map(s => (
                  <button key={s} onClick={() => setSeason(s)} style={{
                    width: 36, height: 36,
                    borderRadius: "50%",
                    border: season === s ? "2px solid #4a7c2e" : "1px solid #c8e0a0",
                    background: season === s ? "#4a7c2e" : "#f4fbea",
                    color: season === s ? "#fff" : "#5a7a3a",
                    cursor: "pointer",
                    fontSize: 14,
                    fontFamily: "inherit",
                    fontWeight: 600,
                  }}>{s}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Voice selector */}
          <div style={{ marginTop: 18 }}>
            <label style={{ fontSize: 12, color: "#5a7a3a", display: "block", marginBottom: 8 }}>聲線選擇</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Row 1 */}
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { key: "farmer", label: "農夫", sub: "思考・理念・故事" },
                  { key: "farmwife", label: "農婦", sub: "生活・廢文・日常" },
                ].map(v => (
                  <button key={v.key} onClick={() => setVoice(v.key)} style={{
                    flex: 1,
                    padding: "10px 8px",
                    borderRadius: 8,
                    border: voice === v.key ? "2px solid #4a7c2e" : "1px solid #c8e0a0",
                    background: voice === v.key ? "#eaf7d8" : "#fafff5",
                    cursor: "pointer",
                    textAlign: "center",
                    fontFamily: "inherit",
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#2d4a1e" }}>{v.label}</div>
                    <div style={{ fontSize: 11, color: "#7aac48", marginTop: 2 }}>{v.sub}</div>
                  </button>
                ))}
              </div>
              {/* Row 2 */}
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { key: "yeyang", label: "農婦散文風", sub: "場景・散文・輕升華" },
                  { key: "both", label: "三版全開", sub: "同時生成比較" },
                ].map(v => (
                  <button key={v.key} onClick={() => setVoice(v.key)} style={{
                    flex: 1,
                    padding: "10px 8px",
                    borderRadius: 8,
                    border: voice === v.key ? "2px solid #4a7c2e" : "1px solid #c8e0a0",
                    background: v.key === "yeyang"
                      ? (voice === v.key ? "#f0e8f8" : "#faf5ff")
                      : (voice === v.key ? "#eaf7d8" : "#fafff5"),
                    cursor: "pointer",
                    textAlign: "center",
                    fontFamily: "inherit",
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: v.key === "yeyang" ? "#5a2a8a" : "#2d4a1e" }}>{v.label}</div>
                    <div style={{ fontSize: 11, color: v.key === "yeyang" ? "#9a6acc" : "#7aac48", marginTop: 2 }}>{v.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={generate}
            disabled={loading || !situation.trim()}
            style={{
              width: "100%",
              marginTop: 20,
              padding: "14px",
              background: loading ? "#a0c070" : "#2d4a1e",
              color: "#e8f5d0",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontFamily: "inherit",
              fontWeight: 700,
              cursor: loading || !situation.trim() ? "not-allowed" : "pointer",
              letterSpacing: 1,
              transition: "background 0.2s",
            }}
          >
            {loading ? "農夫正在思考中⋯⋯" : "生成貼文草稿"}
          </button>
          {error && <div style={{ fontSize: 13, color: "#c0392b", marginTop: 8 }}>{error}</div>}
        </div>

        {/* Output panels */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {(voice === "farmer" || voice === "both") && (
            <PostCard
              title="農夫版"
              subtitle="思考型・理念・故事感"
              accentColor="#2d4a1e"
              tagColor="#d8f0b0"
              tagText="#2a5010"
              content={farmerPost}
              loading={loading && !farmerPost}
              onCopy={() => copy(farmerPost, "farmer")}
              copied={copied === "farmer"}
            />
          )}
          {(voice === "farmwife" || voice === "both") && (
            <PostCard
              title="農婦版"
              subtitle="口語型・日常・有點廢"
              accentColor="#7a4a1e"
              tagColor="#f5e8d0"
              tagText="#5a2a10"
              content={farmwifePost}
              loading={loading && !farmwifePost}
              onCopy={() => copy(farmwifePost, "farmwife")}
              copied={copied === "farmwife"}
            />
          )}
          {(voice === "yeyang" || voice === "both") && (
            <PostCard
              title="農婦散文風版"
              subtitle="場景式散文・輕升華"
              accentColor="#6a2a9a"
              tagColor="#f0e8f8"
              tagText="#4a1a7a"
              content={yeyangPost}
              loading={loading && !yeyangPost}
              onCopy={() => copy(yeyangPost, "yeyang")}
              copied={copied === "yeyang"}
            />
          )}
        </div>

        {/* Tips */}
        <div style={{
          marginTop: 28,
          padding: "16px 20px",
          background: "#eef7e0",
          borderRadius: 8,
          borderLeft: "3px solid #8ab561",
        }}>
          <div style={{ fontSize: 12, color: "#4a7c2e", fontWeight: 600, marginBottom: 6 }}>使用提示</div>
          <div style={{ fontSize: 12, color: "#5a7a3a", lineHeight: 1.8 }}>
            · 情境描述越具體，貼文越像真的（例如加上天氣、誰在場、有什麼意外）<br />
            · 葉揚風適合有點感觸的日子，農婦版適合搭配生活照，農夫版適合田間照<br />
            · AI 草稿是起點，建議你微調 1–2 句讓它更像你說話的樣子
          </div>
        </div>
      </div>
    </div>
  );
}

function PostCard({ title, subtitle, accentColor, tagColor, tagText, content, loading, onCopy, copied }) {
  return (
    <div style={{
      background: "#fff",
      border: `1px solid #d4e8b0`,
      borderTop: `3px solid ${accentColor}`,
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(45,74,30,0.06)",
    }}>
      {/* Header */}
      <div style={{
        padding: "14px 20px 12px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderBottom: "1px solid #eef5e4",
      }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: accentColor }}>{title}</span>
        <span style={{
          fontSize: 11,
          padding: "2px 8px",
          borderRadius: 12,
          background: tagColor,
          color: tagText,
        }}>{subtitle}</span>
      </div>

      {/* Content */}
      <div style={{
        padding: "20px 24px 16px",
        minHeight: 100,
        fontSize: 15,
        color: "#1a2e10",
        lineHeight: 2,
        fontFamily: "'Noto Serif TC', serif",
        whiteSpace: "pre-wrap",
      }}>
        {loading ? (
          <div style={{ color: "#a0c070", fontSize: 14 }}>正在生成中⋯⋯</div>
        ) : content ? (
          content
        ) : (
          <div style={{ color: "#c0d8a0", fontSize: 14 }}>貼文將在這裡出現</div>
        )}
      </div>

      {/* Big copy button */}
      {content && (
        <div style={{ padding: "0 20px 20px" }}>
          <button
            onClick={onCopy}
            style={{
              width: "100%",
              padding: "14px",
              background: copied ? "#4a7c2e" : accentColor,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 15,
              fontFamily: "inherit",
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "background 0.25s",
            }}
          >
            {copied ? "✅ 已複製！貼到 FB 吧" : "📋 一鍵複製貼文"}
          </button>
        </div>
      )}
    </div>
  );
}
