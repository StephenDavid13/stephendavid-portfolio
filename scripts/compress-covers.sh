#!/usr/bin/env bash
# Convert every cover-image.png under public/images/projects/*/ to WebP at
# quality 82, max 1600 px on the long edge. Deletes the original PNG on
# success and updates references in src/app/work/projects/*.mdx.
#
# Usage:  npm run compress-covers
# Needs:  brew install webp

set -euo pipefail

if ! command -v cwebp >/dev/null 2>&1; then
  echo "Error: cwebp not found. Install with:  brew install webp" >&2
  exit 1
fi

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
projects="$root/public/images/projects"
mdx_dir="$root/src/app/work/projects"

if [ ! -d "$projects" ]; then
  echo "Error: $projects not found" >&2
  exit 1
fi

converted=0
total_before=0
total_after=0

shopt -s nullglob
for src in "$projects"/*/cover-image.png; do
  dst="${src%.png}.webp"
  cwebp -quiet -q 82 -resize 1600 0 "$src" -o "$dst"
  src_size=$(stat -f "%z" "$src")
  dst_size=$(stat -f "%z" "$dst")
  rm "$src"
  total_before=$((total_before + src_size))
  total_after=$((total_after + dst_size))
  converted=$((converted + 1))
  pct=$((dst_size * 100 / src_size))
  printf "  %-20s %8d → %7d bytes  (%d%% of original)\n" \
    "$(basename "$(dirname "$src")")" "$src_size" "$dst_size" "$pct"
done
shopt -u nullglob

if [ "$converted" -eq 0 ]; then
  echo "No cover-image.png files to convert — nothing to do."
  exit 0
fi

# Point project MDX frontmatter at the new .webp files.
if [ -d "$mdx_dir" ]; then
  for f in "$mdx_dir"/*.mdx; do
    [ -f "$f" ] && sed -i '' 's|cover-image\.png|cover-image.webp|g' "$f"
  done
fi

saved=$((total_before - total_after))
pct_total=$((saved * 100 / total_before))
echo
echo "Converted $converted image(s)."
printf "Total: %d → %d bytes  (saved %d, %d%% reduction)\n" \
  "$total_before" "$total_after" "$saved" "$pct_total"
echo "Updated MDX references from .png to .webp."
