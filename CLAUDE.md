# CLAUDE.md — 大地農夫內容生成系統

使用者是非工程師，全程用繁體中文回覆，解釋時少用術語。
本檔是唯一索引正本；docs/ 各檔不得重複本檔規則，衝突以本檔為準。

## 硬事實

- React + Vite 單頁應用。主檔 `src/App.jsx`（千行級單檔，全部 UI 邏輯與
  8 個 AI prompt 都在這一檔）。`api/generate.js` 是 Anthropic API 代理，幾乎不動。
- 唯一機器驗證：`npx vite build`（無測試、無 lint）。build 過 ≠ 功能對。
- 部署：push 到 main ＝ 直接上線（Vercel 自動部署，無 staging）。
- 貼文生成模型在 App.jsx 內寫死為 `claude-sonnet-4-5`，出現在多個 fetch 呼叫裡。
- 使用者已授權：日常改動（含 push main 上線）直接做，不用先問。
  例外情況見 docs/rules/judgment.md 第 2 節。

## 工作鐵律（每個任務都適用）

1. **先 Grep 錨點、再分段讀**：用下方檔案地圖定位，只讀該區段（前後約 40 行）。
   優先分段讀取，整檔 Read 約耗 3 萬 token，僅在跨全檔重構時使用。
2. **改任何 BASE_* prompt 常數後**，逐條核對「同步配對表」，
   回報中每條寫「查過、有改」或「查過、不需改」。
3. **push 前 build 必過**；回報完成前逐條自查任務檢查點
   （檢查點＝把使用者需求拆成逐點清單，每點標「已做／不需做＋原因」）。
4. **回報格式**：改了什麼（檔案:行號）、配對表核對結果、build 結果、不確定的點。

## 檔案地圖（src/App.jsx 內用 Grep 找錨點，行號會漂移、錨點不會）

| 要改什麼 | Grep 錨點 |
|---|---|
| FB文案三種聲線 prompt | `BASE_FARMER` `BASE_FARMWIFE` `BASE_YEYANG` |
| 全 prompt 共用語氣規則 | `TONE_RULE`（改它影響所有生成，改前先向使用者確認影響範圍） |
| 影片腳本 prompt | `BASE_VIDEO_SCRIPT` `VIDEO_VOICE_RULES` |
| 溫和腳本 prompt | `BASE_GENTLE_SCRIPT` `GENTLE_VOICE_RULES` |
| IP貼文 prompt 與選項 | `BASE_IP_POST` `IP_TYPES` `IP_DENSITIES` |
| 下拉/按鈕選項常數 | `MOODS` `SEASONS` `VIDEO_THEMES` `GENTLE_THEMES` `VIDEO_VOICES` `GENTLE_VOICES` |
| 生成邏輯（API 呼叫） | `const generate` `generateVideoScripts` `generateGentleScripts` `generateIPPost` |
| 各分頁 UI 區塊 | `tab === "generate"`（其餘：ip / video / gentle / favorites / history） |
| 結果卡片元件 | `PostCard` `VideoScriptCard` `GentleScriptCard` `IPPostCard` |
| 頂部分頁列 | `{ key: "generate", label` |

## 同步配對表（改左邊，必查右邊）

| 改動 | 必查（Grep 錨點在括號內） |
|---|---|
| BASE_FARMER／BASE_FARMWIFE／BASE_YEYANG | generate 分頁三張 PostCard 的 title 與 subtitle 文字（`PostCard title=`） |
| BASE_IP_POST | IP頁定位條（`IP 定位`）、IPPostCard 的 `checkItems`、IP_TYPES/IP_DENSITIES 的 sub 與 desc 文字 |
| BASE_VIDEO_SCRIPT 的七大主題 | `VIDEO_THEMES` 清單、影片頁「使用方式」提示 |
| BASE_GENTLE_SCRIPT | `GENTLE_THEMES`（含 priority 標籤）、溫和頁公式說明條（`溫和調性公式`）、「使用方式」提示 |
| 任一 VOICE_RULES | 對應 VOICES 常數的 sub 副標 |
| TONE_RULE | 影響全部 prompt——改前先向使用者確認影響範圍 |
| 新增或改名分頁 | header 分頁陣列、header 副標「FB 文案 × …」、README.md |

已知未同步（2026-07-04 記錄）：`IP_TYPES` 的比例副標仍是舊版框架的
40/25/15/10/10，v3.0 prompt 的三大主軸是 40/35/25，且類型名稱體系不同。
動到 IP 類型時，先問使用者要不要一起對齊，不要自行改名。

## 驗證清單（按改動類型）

- **改 UI／功能**：build 通過 → 逐條自查檢查點 → 樣式照抄同分頁鄰近元件
  （色系、圓角、字級），優先複製既有 style → git diff 自查無無關改動。
- **改 prompt**：新規則與 TONE_RULE 及該 prompt 的【禁止事項】逐條對照，
  有打架先回報再改 → 同步配對表 → 字數與格式規則前後一致。
- **使用者貼長框架文件要求升級 prompt**：先列「章節 → 落點」對照清單再動手，
  每節標「已納入／合併進X／未納入＋原因」，防漏節。

## 觸發式規則索引（命中情況就先讀該檔再動手）

- 考慮派 subagent、或任務可能超出你的等級 → `docs/rules/dispatch.md`
- 判斷「算不算完成／要不要問人／方向是否錯了」 → `docs/rules/judgment.md`
- 派工 prompt 範本、context 快滿時的 HANDOFF 交接 → `docs/rules/templates.md`
- 要改制度檔本身、踩坑後記教訓、模型版本更新 → `docs/rules/maintenance.md`
- 重跑驗收、看基準數據 → `docs/quality/golden-tasks.md`

## 制度維護

- 制度檔行數與斷鏈由 `scripts/check-rules.sh` 強制檢查（Stop hook 自動跑）。
- 證實沒用的規則記到 `docs/quality/ledger.md`，同檔滿 3 條向使用者提刪除。
- 刪規則需使用者批准；加規則先過 Outgrowth 檢查（Sonnet 沒這條也會做對就不加）。
