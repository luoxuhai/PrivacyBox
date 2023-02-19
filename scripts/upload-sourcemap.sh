#!/usr/bin/env bash

RELEASE="2.6.0(2)+codepush:v48"
DIST="v48"

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

node_modules/@sentry/cli/bin/sentry-cli releases files "${RELEASE}" \
    upload-sourcemaps \
    --dist "${DIST}" \
    --strip-prefix "${PWD}/build" \
    main.jsbundle main.jsbundle.map

echo "✅ Successfully uploaded sources maps"
