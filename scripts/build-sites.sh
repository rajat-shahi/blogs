#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
archive="$(mktemp -t rajat-engineering-blog.XXXXXX.zip)"
trap 'rm -f "$archive"' EXIT

rm -rf "$root/dist"
rm -rf "$root/.sites/export"
mkdir -p "$root/.sites/export"

cd "$root"
npx mint@4.2.680 validate
npx mint@4.2.680 export --output "$archive"
unzip -q "$archive" -d "$root/.sites/export"
npm run build:sites-worker
mv "$root/dist/blogs" "$root/dist/server"

test -f "$root/dist/client/index.html"
test -f "$root/dist/server/index.js"
test -f "$root/dist/server/wrangler.json"
