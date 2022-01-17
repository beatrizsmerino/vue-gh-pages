#!/usr/bin/env sh

# Abort on errors
set -e

# Build the files for production
npm run build

# Navigate into the build output directory
cd dist

# Inizialize git repository
git init

# Add all files to the repository
git add -A

# Commit the changes
git commit -m 'deploy'

# Push the new files to the remote repository if you are deploying to github.io
git push -f https://github.com/beatrizsmerino/vue-gh-pages.git master:gh-pages

# Return to the previous directory
cd -