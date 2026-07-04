#!/usr/bin/env bash
# 制度檔守門員：行數上限、斷鏈、禁用語。由 .claude/settings.json 的 Stop hook 自動執行。
# 違規時 exit 2 並輸出到 stderr（Claude Code 會把訊息回饋給模型要求修正）。
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ERRS=""

# 1) 行數上限：CLAUDE.md ≤150；docs/rules/*.md ≤120
if [ -f "$ROOT/CLAUDE.md" ]; then
  n=$(wc -l < "$ROOT/CLAUDE.md")
  [ "$n" -gt 150 ] && ERRS="$ERRS\nCLAUDE.md 有 $n 行，超過上限 150：先精簡再加內容。"
else
  ERRS="$ERRS\nCLAUDE.md 不存在（索引正本遺失）。"
fi
for f in "$ROOT"/docs/rules/*.md; do
  [ -f "$f" ] || continue
  n=$(wc -l < "$f")
  [ "$n" -gt 120 ] && ERRS="$ERRS\n${f#$ROOT/} 有 $n 行，超過上限 120：先精簡再加內容。"
done

# 2) 斷鏈：CLAUDE.md 引用的 docs/、scripts/ 路徑必須存在
if [ -f "$ROOT/CLAUDE.md" ]; then
  for p in $(grep -oE '(docs|scripts)/[A-Za-z0-9._/-]+' "$ROOT/CLAUDE.md" | sort -u); do
    [ -e "$ROOT/$p" ] || ERRS="$ERRS\nCLAUDE.md 引用了不存在的路徑：$p"
  done
fi

# 3) 禁用語：規則檔不得出現弱模型接不住的留白措辭
for f in "$ROOT/CLAUDE.md" "$ROOT"/docs/rules/*.md; do
  [ -f "$f" ] || continue
  hits=$(grep -nE '視情況|用你的判斷|自行斟酌|請保持同步' "$f" || true)
  [ -n "$hits" ] && ERRS="$ERRS\n${f#$ROOT/} 出現禁用語（規則要寫死）：\n$hits"
done

if [ -n "$ERRS" ]; then
  printf '制度檔檢查未通過：%b\n' "$ERRS" >&2
  exit 2
fi
exit 0
