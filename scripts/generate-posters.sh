#!/usr/bin/env bash
# Writes public/posters/<path>.webp from the first frame of each site video.
# Add new videos to the list and rerun. Use path@seconds if the first frame is blank. Needs ffmpeg. Run from the repo root.
set -euo pipefail

videos=(
  img/agent-manager.mp4@2
)

for entry in "${videos[@]}"; do
  video="${entry%@*}"
  seek=0
  [[ "$entry" == *@* ]] && seek="${entry#*@}"
  out="public/posters/${video%.*}.webp"
  mkdir -p "$(dirname "$out")"
  ffmpeg -v error -y -ss "$seek" -i "public/$video" -frames:v 1 \
    -vf "scale='min(1280,iw)':-2" -c:v libwebp -q:v 72 "$out"
done
