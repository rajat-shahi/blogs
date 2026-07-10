#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
archive="$(mktemp -t rajat-engineering-blog.XXXXXX.zip)"
trap 'rm -f "$archive"' EXIT

rm -rf "$root/dist"
mkdir -p "$root/dist/client" "$root/dist/server"

cd "$root"
npx mint@4.2.680 validate
npx mint@4.2.680 export --output "$archive"
unzip -q "$archive" -d "$root/dist/client"
cp "$root/sites/worker/index.js" "$root/dist/server/index.js"
cp "$root/sites/worker/wrangler.json" "$root/dist/server/wrangler.json"

test -f "$root/dist/client/index.html"
test -f "$root/dist/server/index.js"
test -f "$root/dist/server/wrangler.json"
