#!/bin/sh
# Usage: mix_check.sh file.mp4  — fails if no audio stream; prints loudness (target about -16 LUFS integrated for social).
set -e
ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of csv=p=0 "$1" | grep -q . || { echo "FAIL: no audio stream in $1"; exit 1; }
ffmpeg -hide_banner -nostats -i "$1" -af loudnorm=print_format=summary -f null - 2>&1 | grep -E "Input Integrated|Input True Peak"
echo "PASS: audio present"
