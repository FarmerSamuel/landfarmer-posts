# 易經占卦分析・線上版

把原本的離線排盤工具（`v14`）做成線上系統，跑在 **Google Apps Script** 上：

- ✅ **占卦歷史紀錄串 Google Sheets**：每次排盤＋解卦自動寫入你自己的試算表。
- ✅ **卦象圖留存**：用 `html2canvas` 產生卦象 PNG，存到你的 Google 雲端硬碟，並把連結記在試算表。
- ✅ **回饋校正占卦邏輯**：可回填「實際發生的事實」與「校正筆記」，系統會把這些經驗自動帶入未來的 AI 解卦提示，逐步修正判斷傾向。
- ✅ **App 內自動呼叫 AI 解卦**：後端直接呼叫 Claude，結合張慶祥老師講稿原文（已打包）給出解卦。

---

## 架構一覽

| 檔案 | 作用 |
|------|------|
| `Code.gs` | 後端：網頁進入點、講稿擷取、AI 解卦、寫入 Sheets／Drive、歷史與回饋 |
| `Index.html` | 前端：排盤、解卦、存檔、歷史／回饋介面（用 `google.script.run` 呼叫後端） |
| `GuaTexts.html` | 六十四卦卦爻辭資料（畫面顯示用，由離線版擷取） |
| `Lectures1.gs … Lectures9.gs` | 打包的張慶祥老師講稿索引（已切塊，每塊約 900KB） |
| `LecturesIndex.gs` | 卦名 → 講稿區塊 對照與懶載入分派器 |
| `tools/build-lectures.mjs` | 由原始 MD 講稿重新產生上面那些講稿檔的工具 |
| `appsscript.json` | GAS 專案設定（時區、OAuth 範圍、Web App 權限） |

> 講稿檔是「自動產生」的。要更新講稿時，把 MD 資料夾準備好，重跑
> `node tools/build-lectures.mjs <MD資料夾路徑>` 即可重新產生。

---

## 部署方式 A：用 clasp（推薦，因講稿檔較大不適合手貼）

需要 Node.js。

```bash
cd iching
npm install                 # 安裝 clasp
npx clasp login             # 用你的 Google 帳號登入授權
npx clasp create --type webapp --title "易經占卦分析" --rootDir .
                            # 會產生 .clasp.json（已被 gitignore）
npx clasp push              # 上傳所有 .gs / .html / appsscript.json
npx clasp open              # 開啟 Apps Script 編輯器
```

接著在編輯器裡：

1. **執行一次 `setup`**（選函式 `setup` → 執行）。會自動建立
   「易經占卦紀錄」試算表與「易經占卦圖」資料夾，並要求授權。
2. **設定 Claude 金鑰**：左側「專案設定 ⚙️ → 指令碼屬性 → 新增屬性」
   - `ANTHROPIC_API_KEY` = 你的 Claude API key（必填，才能自動解卦）
   - `CLAUDE_MODEL` = 模型 ID（可選，預設 `claude-opus-4-8`；想省成本可填 `claude-sonnet-4-6`）
3. **部署 Web App**：右上「部署 → 新增部署 → 類型選『網頁應用程式』」
   - 執行身分：**我自己**
   - 誰可以存取：**只有我自己**（個人使用，最安全）
   - 部署後取得網址，手機加到主畫面即可像 App 一樣用。

> 之後改了程式，重跑 `npx clasp push`，並在部署頁面「管理部署 → 編輯 → 版本選新版」即可更新。

## 部署方式 B：手動貼上（不需 Node）

1. 到 <https://script.google.com> 建立新專案。
2. 依檔名一一新增檔案並貼上內容：`Code.gs`、`LecturesIndex.gs`、`Lectures1`～`Lectures9.gs`
   （指令碼檔），以及 `Index.html`、`GuaTexts.html`（HTML 檔）。
3. 專案設定把 `appsscript.json` 內的 OAuth 範圍與時區對齊（或顯示資訊清單後手動編輯）。
4. 後續步驟（`setup`、指令碼屬性、部署）同方式 A 的 1~3。

> ⚠️ 講稿檔每個約 900KB，手動貼上較費工，建議用方式 A。

---

## 使用流程

1. **排盤 / 解卦** 分頁：輸入日期、主題、性別與六爻 → 「排盤」。
2. 「AI 解卦」：後端組合卦象＋講稿＋過往校正經驗 → 呼叫 Claude → 顯示解卦。
   （若沒設金鑰，可用「複製 AI 指令」貼到外部 AI。）
3. 「存到 Google Sheets」：把這筆占卦（含卦象圖）寫入試算表。
4. **歷史紀錄 / 回饋** 分頁：事後回填「實際發生」「準確度」「校正筆記」。
   這些會進入「校正知識庫」，並在日後解卦時自動帶入，形成回饋學習迴圈。

---

## 隱私與版權

- 試算表、圖片、API 金鑰都在你自己的 Google 帳號下，未對外公開。
- 打包的講稿為張慶祥老師（黃庭書院）講經內容，僅供個人占卦研習之用，請勿散布。
