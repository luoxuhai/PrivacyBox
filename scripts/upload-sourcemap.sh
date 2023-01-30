#!/usr/bin/env bash

RELEASE="2.0.2(1)+codepush:v28"
DIST="v28"

mkdir build

echo "Creating iOS source maps... "

npx react-native bundle \
    --platform ios \
    --dev false \
    --minify false \
    --reset-cache \
    --entry-file index.js \
    --bundle-output "build/main.jsbundle" \
    --sourcemap-output "build/main.jsbundle.map"

echo "✅ Successfully created sources maps"

echo "Uploading iOS source maps... "

npx sentry-cli releases files "${RELEASE}" \
    upload-sourcemaps \
    --dist "${DIST}" \
    --strip-prefix "${PWD}/build" \
    main.jsbundle main.jsbundle.map

echo "✅ Successfully uploaded sources maps"