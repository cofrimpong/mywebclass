#!/usr/bin/env bash
# Helper script to create a Sanity Studio in ./cms interactively
# Run from project root: `./create_sanity.sh`

set -euo pipefail

echo "This will run the interactive Sanity create command in ./cms."
echo "During the prompts select:"
echo "  - Dataset: production"
echo "  - TypeScript: yes"
echo "  - Template: Default (the default Studio template)"

npm create sanity@latest ./cms

echo "If the create command completed, change into ./cms and run the studio:"
echo "  cd cms"
echo "  npm install"
echo "  npm run dev"
