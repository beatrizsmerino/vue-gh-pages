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

## ⚙️ How it works

Begin by following the steps 0️⃣&nbsp;, 1️⃣&nbsp;, 2️⃣&nbsp;, 3️⃣&nbsp;, 4️⃣&nbsp; and 5️⃣&nbsp; outlined in the [README-v2.md](./README-v2.md) file.
This includes the installation of the required packages, the creation of the files and their configuration.

Then return to this version to follow the instructions below.
You should know that the following steps 1️⃣&nbsp; and 2️⃣&nbsp; are an extra to enhance your configuration, they are not required for the deployment.

### 1️⃣ Github Actions. Dependabot configuration

1.1 In the root of the project, there is a file called `.github/dependabot.yml`. If it doesn't exist, create it with the following command:

```bash
mkdir -p .github && touch .github/dependabot.yml
```

Note: The `-p` or `--parents` option of the `mkdir` command will help you create the directory only if it does not already exist.

1.2 Inside the `dependabot.yml` file, paste the following code:

```yml
# For more information see: https://help.github.com/github/administering-a-repository/configuration-options-for-dependency-updates

version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "monthly"
      day: "saturday"
      time: "09:00"
      timezone: "Europe/Madrid"
    reviewers:
      - <USER_NAME>
    assignees:
      - <USER_NAME>
    commit-message:
      prefix: build
      prefix-development: build
      include: scope
    ignore:
      - dependency-name: "*"
        update-types: ["version-update:semver-major"]
    open-pull-requests-limit: 10
  - package-ecosystem: github-actions
    directory: "/"
    schedule:
      interval: "monthly"
      day: "saturday"
      time: "09:00"
      timezone: "Europe/Madrid"
    reviewers:
      - <USER_NAME>
    assignees:
      - <USER_NAME>
    commit-message:
      prefix: build
      prefix-development: build
      include: scope
    ignore:
      - dependency-name: "*"
        update-types: ["version-update:semver-major"]
    open-pull-requests-limit: 10
```

In the previous code, the configuration specifies how `Dependabot` checks for updates and creates Pull Requests (PR) for dependency updates:
1. `package-ecosystem`: Specifies the types of dependencies to update (e.g., `npm` for Node.js packages, `github-actions` for GitHub Actions).
2. `directory`: The location of the dependency files (e.g., `package.json` and `package-lock.json` for NPM).
3. `schedule`: Defines when Dependabot checks for updates. It includes the `interval` (how often), `day` of the week, `time`, and `timezone`.
4. `reviewers` and `assignees`: Specify the GitHub usernames of the individuals who will be assigned to review and manage the created pull requests.
5. `commit-message`: Sets the format for the commit messages Dependabot will use. It includes a `prefix`, `prefix-development`, and whether to `include` the scope.
6. `ignore`: Allows you to specify dependencies that should not be updated automatically. For example, ignoring major version updates.
7. `open-pull-requests-limit`: The maximum number of open pull requests Dependabot will create. Once this limit is reached, it will stop creating new ones until some are merged or closed.

2.3. You can configure the rest of the options if you wish, but for this file to work, the most important thing is to update the `reviewers` and `assignees` by replacing the `<USER_NAME>` variable with the username of the person responsible for reviewing and merging Dependabot pull requests.

```yml
	reviewers:
      - <USER_NAME>
    assignees:
      - <USER_NAME>
```

```yml
	reviewers:
      - beatrizsmerino
    assignees:
      - beatrizsmerino
```

### 2️⃣ Github Actions. Workflow Node

2.1 In the root of the project, there is a file called `.github/workflows/node.yml`. If it doesn't exist, create it with the following command:

```bash
mkdir -p .github/workflows && touch node.yml
```

2.2 Inside the `node.yml` file, paste the following code:

```yml
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: 🚀 Check project in different Node versions
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
jobs:
  check-node-build:
    name: 🧩 Build, test and validate code
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14, 16, 18]
    steps:
    - name: 🔀 Checkout code from repository
      uses: actions/checkout@v4
    - name: 🛠️ Setup Node version ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
    - name: 📦 Install dependencies
      run: npm install
    - name: 🏗️ Run NPM script to build
      run: npm run build --if-present
    - name: 🧪 Run NPM script to test
      run: npm test --if-present
    - name: 🔍 Validate commits to use the commitlint syntax
      run: npx commitlint --from ${{ github.event.pull_request.base.sha }} --to ${{ github.event.pull_request.head.sha }} --verbose
```

The previous code, check the project build on different versions of Node.js, run tests and validate commit messages using commitlint.
You can see the whole process of the steps of this workflow in GitHub Actions:
- **🔀 Checkout code from repository**: Clones your project repository into the GitHub Actions runner, providing access to its codebase.
- **🛠️ Setup Node version x.x**: Specifies Node.js versions (14.x, 16.x, 18.x) to ensure compatibility across multiple versions.
- **📦 Install Dependencies**: Runs `npm install` command to install all the necessary dependencies defined in your `package.json`.
- **🏗️ Run NPM script to build**: Executes `npm run build` command if exist, to build your project. This step is crucial for compiling the project and preparing it for testing.
- **🧪 Run NPM script to test**: Conducts automated tests by running `npm test` command. This step is essential for ensuring that your code works as expected.
- **🔍 Validate commits to use the commitlint syntax**: Ensures that all commit messages in the pull request adhere to the predefined standards, using commitlint. This step is vital for maintaining a clean and consistent commit history.

This GitHub Actions workflow is an integral part of maintaining a robust and compatible Node.js project, ensuring that every change is automatically tested and validated across different Node.js environments.
