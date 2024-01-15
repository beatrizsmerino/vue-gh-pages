# 🔖 v3.x.x

## 🎯 Description

This version, based on the v2.x.x, executes the `deploy-v2.mjs` file using the `npm run deploy:v2` command specified in the `package.json` file.

It does **not require the installation of additional NPM packages** specific to the deployment process, except for those already used in v2.x.x.
But note, that the new `.github/workflows/deploy.yml` file that we will create in this version, uses `actions/checkout` and `actions/setup-node` to make it work.

In this version, you'll need to **customize some data** in the `vue.config.js` and `.github/workflows/deploy.yml` files, changing the `<USER_NAME>`, `<USER_EMAIL>` and `<REPO_NAME>` variables to match the username, the user email and repository name of your GitHub account.

The process still uses the script from the previous version, but incorporates **automatic deployment** via `GitHub Actions`, which is a significant shift towards automation and CI/CD best practices.
The process works as follows: when some changes are pushed to the `master` branch, the `.github/workflows/deploy.yml` workflow is executed, which automatically performs certain steps to upload the changes from the `dist` folder to the `gh-pages` branch of a `git` repository uploaded to GitHub.

This process **will no longer be seen in the terminal** so you will have to go to the github website, search for your repository and watch each step in the `Actions` tab to see if it finishes correctly.

In this documentation, in addition to detailing how to use `Github Actions` to automate the `Deployment workflow` in the file `.github/workflows/deploy.yml`, I will describe how to build the `Dependabot configuration` in the `.github/dependabot.yml` file and the `Node workflow` in the `.github/workflows/node.yml` file.

## ⚙️ How it works

Begin by following the steps outlined in the [README-v2.md](./README-v2.md) file. This includes the installation of the required packages, the creation of the files and their configuration.
Then return to this version to follow the instructions below.

You should know that the following steps 1️⃣ and 2️⃣ are a recommendation to enhance your configuration, they are not required for the deployment, so you can go to step 3️⃣ directely.

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

In the above code, the configuration specifies how `Dependabot` looks for dependency updates and creates Pull Requests (PR) for them:
1. `package-ecosystem`: Specifies the environment of the dependencies to update (e.g., `npm` for Node.js packages, `github-actions` for GitHub Actions).
2. `directory`: Indicates the main location of the dependencies (e.g., `package.json` and `package-lock.json` files for NPM and `.github` folder for GitHub Actions).
3. `schedule`: Defines when Dependabot checks for updates. It includes the `interval` (how often), `day` of the week, `time`, and `timezone`.
4. `assignees` and `reviewers`: Add the GitHub usernames of the people who will be assigned to manage and review the pull requests created. The `assignees` user takes the necessary steps for conflict resolution and the `reviewers` user reviews the proposed changes, approving them or requesting new changes. Both can leave feedback on the process, but it is important to note that the actual permissions to merge PRs depend on the user's roles and access rights within the GitHub repository. Only users with the appropriate access levels (such as `maintainers` or `administrators`) can merge the PR into the repository.
5. `commit-message`: Sets the format for the commit messages Dependabot will use. It includes a `prefix`, `prefix-development`, and whether to `include` the scope. This helps maintain consistency and readability in your repository's commit history.
6. `ignore`: Allows to ignore dependencies and versions, which should not be automatically updated, preventing a PR to be created for them. For example, major version upgrades.
7. `open-pull-requests-limit`: Defines the maximum number of pull requests Dependabot will create. Once this limit is reached, it will stop creating new ones until some are merged or closed.

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
        node-version: [16, 18, 20]
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

### 3️⃣ Github Actions. Workflow deploy

3.1 In the root of the project, there is a file called `.github/workflows/deploy.yml`. If it doesn't exist, create it with the following command:

```bash
mkdir -p .github/workflows && touch deploy.yml
```

3.2 Inside the `deploy.yml` file, paste the following code:

```yml
# For more information see: https://github.com/beatrizsmerino/vue-gh-pages

name: 🚀 Project deployment in GitHub Pages
on:
  push:
    branches: [ master ]
jobs:
  gh-pages-deploy:
    name: 🧩 Deploying code to gh-pages branch
    runs-on: ubuntu-latest
    steps:
      - name: 🔀 Checkout code from repository
        uses: actions/checkout@v4
      - name: 🛠️ Setup Node version
        uses: actions/setup-node@v4
        with:
          node-version: 20.x
      - name: 📦 Install dependencies
        run: npm ci
      - name: 🙍‍♂️ Setup git user
        run: |
          git config user.name <USER_NAME>
          git config user.email <USER_EMAIL>
      - name: 🏗️ Run NPM script to deploy
        run: npm run deploy:v2
```

This workflow is designed to streamline your project's deployment to `GitHub Pages`.
It automatically triggers a new deployment with every push to the `master` branch, ensuring the live version of your site is consistently synchronized with the latest updates.
You can see the whole process of the steps of this workflow in GitHub Actions:
1. **🔀 Checkout code from repository**: Retrieves the code from your repository, making it available for the workflow.
2. **🛠️ Setup Node version**: Prepares the GitHub Actions runner with Node.js version 20.x. It's important to ensure compatibility with your project's Node.js version requirements.
3. **📦 Install dependencies**: Executes `npm ci` command for a clean install of your project's dependencies, ensuring a consistent environment for the deployment.
4. **🙍‍♂️ Setup git user**: Sets up Git with your name and email. This is crucial for commits made during the deployment process, as it associates them with your identity.
5. **🏗️ Run NPM script to deploy**: Runs the `npm run deploy:v2` command, which triggers the deployment script defined in your `package.json`. This script is responsible for building and deploying your project to the `gh-pages` branch.

3.3. In this file it is necessary to update the values of `user.name` and `user.email` replacing the variables `<USER_NAME>` and `<USER_EMAIL>` with the name and email of the user who will make sure to deploy the repository.

```yml
      - name: 🙍‍♂️ Setup git user
        run: |
          git config user.name <USER_NAME>
          git config user.email <USER_EMAIL>
```

```yml
      - name: 🙍‍♂️ Setup git user
        run: |
          git config user.name "Beatriz Sopeña Merino"
          git config user.email "beatrizsmerino@gmail.com"
```

3.4. Finally, to deploy the application, simply push your changes to the `master` branch, this action will automatically trigger the deployment workflow.
You can track the progress of the deployment by visiting your repository's GitHub page. Navigate to the `Actions` tab to view the workflow in real-time. Here, you'll find detailed logs and status updates for each step of the deployment process, allowing you to monitor and verify the successful deployment of your application.

Use the following link, replacing the `<USER_NAME>` and `<REPO_NAME>` variables with your data.

```bash
https://github.com/<USER_NAME>/<REPO_NAME>/actions
```

Here is an example of mine: [https://github.com/beatrizsmerino/vue-gh-pages/actions](https://github.com/beatrizsmerino/vue-gh-pages/actions)

3.5. To see the result, wait for the script execution to finish and open the application in the browser:

Use the following link, replacing the `<USER_NAME>` and `<REPO_NAME>` variables with your data.

```bash
https://<USER_NAME>.github.io/<REPO_NAME>/
```

Here is an example of mine: [https://beatrizsmerino.github.io/vue-gh-pages/](https://beatrizsmerino.github.io/vue-gh-pages/)
