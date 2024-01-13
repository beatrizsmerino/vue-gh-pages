# 🔖 v3.x.x

## 🎯 Description

This version, building upon the v2.x.x deployment strategy, executes the `deploy-v2.mjs` file using the `npm run deploy:v2` command specified in the `package.json` file.

It does **not require the installation of additional NPM packages** specific to the deployment process, except for those already used in v2.x.x.
But note, that the new `deploy.yml` file uses `actions/checkout` and `actions/setup-node` to make it work.

To use it, you'll need to **customize some data** in the `vue.config.js` and `deploy.yml` files, changing the `<USER_NAME>`, `<USER_EMAIL>` and `<REPO_NAME>` variables to match the username, the user email and repository name of your GitHub account.

The process still uses the script from the previous version, but incorporates **automatic deployment** via `GitHubActions`, which is a significant shift towards automation and CI/CD best practices.
When some changes are pushed to the `master` branch, the `deploy.yml` workflow is executed, which automatically performs certain steps to upload the changes to the `gh-pages` branch of a `git` repository uploaded to GitHub.

This process will **no longer be seen in the terminal** so you will have to go to the github website, search for your repository and watch each step to see if it finishes correctly.

In this configuration I will detail how `GithubActions` can be used to automate the `Deployment` process. But I will also describe how to configure the `Dependabot` file and the workflow for `Node`.
