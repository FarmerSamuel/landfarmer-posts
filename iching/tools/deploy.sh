#!/usr/bin/env bash
# 一鍵部署到 Google Apps Script。
# 前提：先跑過一次 `npx clasp login`（用瀏覽器登入你的 Google 帳號）。
set -e
cd "$(dirname "$0")/.."

if ! npx clasp login --status >/dev/null 2>&1; then
  echo "尚未登入 Google。請先執行：npx clasp login"
  exit 1
fi

if [ ! -f .clasp.json ]; then
  echo "▶ 建立 Apps Script 專案…"
  npx clasp create --type webapp --title "易經占卦分析" --rootDir .
fi

echo "▶ 上傳程式…"
npx clasp push -f

echo "▶ 部署新版本…"
npx clasp deploy -d "iching $(date +%Y%m%d-%H%M%S)"

echo
echo "▶ 目前部署："
npx clasp deployments
echo
echo "網址格式：https://script.google.com/macros/s/<部署ID>/exec"
echo "第一次開啟會要求授權（試算表/雲端硬碟/外部請求），按同意即可。"
echo "開啟後若還沒設金鑰，直接在頁面上貼上 Claude 金鑰存檔即可。"
