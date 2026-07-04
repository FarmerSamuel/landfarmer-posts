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
  # 盲測 A 版等無制度環境會刻意缺 CLAUDE.md，缺檔只警告不擋（不能鎖死 agent）
  echo "提醒：CLAUDE.md 不存在，制度檢查略過。" >&2
  exit 0
fi
for f in "$ROOT"/docs/rules/*.md; do
  [ -f "$f" ] || continue
  n=$(wc -l < "$f")
  [ "$n" -gt 120 ] && ERRS="$ERRS\n${f#$ROOT/} 有 $n 行，超過上限 120：先精簡再加內容。"
done

# 2) 斷鏈：CLAUDE.md 與 docs/rules/*.md 引用的 docs/、scripts/ 路徑必須存在
for src in "$ROOT/CLAUDE.md" "$ROOT"/docs/rules/*.md; do
  [ -f "$src" ] || continue
  for p in $(grep -oE '(docs|scripts)/[A-Za-z0-9._/-]+\.(md|sh)' "$src" | sort -u); do
    [ -e "$ROOT/$p" ] || ERRS="$ERRS\n${src#$ROOT/} 引用了不存在的路徑：$p"
  done
done

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
