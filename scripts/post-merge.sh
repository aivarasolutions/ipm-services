#!/bin/bash
set -euo pipefail

npm install --legacy-peer-deps --no-audit --no-fund
npm run build