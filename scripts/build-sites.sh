#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
archive="$(mktemp -t rajat-engineering-blog.XXXXXX.zip)"
trap 'rm -f "$archive"' EXIT

rm -rf "$root/dist"
mkdir -p "$root/dist/client" "$root/dist/server"

cd "$root"
npx mint@latest validate
npx mint@latest export --output "$archive"
unzip -q "$archive" -d "$root/dist/client"
cp "$root/sites/worker/index.js" "$root/dist/server/index.js"

test -f "$root/dist/client/index.html"
test -f "$root/dist/server/index.js"
