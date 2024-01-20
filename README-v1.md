# 🔖 v1.x.x

## 🎯 Description

This version executes the `deploy-v1.sh` file using the `npm run deploy:v1` command specified in the `package.json` file.

It does **not require the installation of additional NPM packages** for it to work.

To use it, you'll need to **customize some data** in the `vue.config.js` and `deploy-v1.sh` files, changing the `<USER_NAME>` and `<REPO_NAME>` variables to match the username and repository name of your GitHub account.

The process involves **manually pushing updates** from the `master` branch to the `gh-pages` branch of a `git` repository uploaded to GitHub.

Throughout the execution process, the terminal displays **detailed information** about the files being built and their publishing locations.

## ⚙️ How it works

### 1️⃣ The `.gitignore` file

#### 1.1. Create new file

In the root of the project, there is a file called `.gitignore`, which was created when creating the [Vue app](https://cli.vuejs.org/guide/creating-a-project.html). If it doesn't exist, create it with the following command:

```bash
touch .gitignore
```

#### 1.2. Copy & Paste code

It is important that the `.gitignore` file includes the `dist` folder, which will be created when building the project for production.

```bash
.DS_Store
node_modules
/dist
```

### 2️⃣ The `vue.config.js` file

#### 2.1. Create new file

In the root of the project, there is the `vue.config.js` file, also created by Vue. If it doesn't exist, create it with the following command:

```bash
touch vue.config.js
```

#### 2.2. Copy & Paste code

Inside the `vue.config.js` file, paste the following code:

```javascript
module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/<REPO_NAME>/" : "/"
};
```

#### 2.3. Customize data

In the previous code, update the [`publicPath`](https://cli.vuejs.org/config/#publicpath) by replacing the `<REPO_NAME>` variable with the name of the repository where the application will be deployed.

```javascript
module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/vue-gh-pages/" : "/"
};
```

### 3️⃣ The `deploy-v1.sh` file

#### 3.1. Create new file

In the root of the project, create the `deploy-v1.sh` file:

```bash
touch deploy-v1.sh
```

#### 3.2. Copy & Paste code

Inside the `deploy-v1.sh` file, paste the following code:

```bash
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
git commit -m "ci(deploy): build files for production in the dist folder"

# Push the new files to the remote repository if you are deploying to github.io
git push -f https://github.com/<USER_NAME>/<REPO_NAME>.git master:gh-pages

# Return to the previous directory
cd -
```

#### 3.3. Explain the code

The `bash` script built in the `deploy-v1.sh` file is executed at the root of the project. It contains the serial execution of the commands necessary for the project release:

1. `#!/usr/bin/env sh`: Runs the next `shell` script written in the `bash` language.
2. `set -e`: Aborts the execution if there are errors.
3. `npm run build`: Builds the files for production, creating the `dist` folder.
4. `cd dist`: Navigates into the `dist` folder, the output directory.
5. `git init`: Initializes a new empty Git repository.
6. `git add .`: Adds all folders and files to the `staging area` of the new Git repository.
7. `git commit -m "ci(deploy): build files for production in the dist folder"`: Creates the first commit with the changes in the `master` branch of this new repository.
8. `git push -f https://github.com/<USER_NAME>/<REPO_NAME>.git master:gh-pages`: Pushes the changes from the `master` branch of the new repository to the `gh-pages` branch, which is automatically created if it does not exist, in our main repository.
9. `cd -`: Returns to the previous directory.

The name `GitHub Pages` originates from the name of the `gh-pages` branch, where the deployment version of the project is located.

#### 3.4. Customize data

Replace the word `<USER_NAME>` with your GitHub username and `<REPO_NAME>` with the name of your repository.
The **last git command** must be replaced with any of the following commands:

- If you are deploying to `https://<USER_NAME>.github.io/<REPO_NAME>`.

```bash
git push -f https://github.com/<USER_NAME>/<REPO_NAME>.git master:gh-pages
```

```bash
git push -f https://github.com/beatrizsmerino/vue-gh-pages.git master:gh-pages
```

- If you have your GitHub account configured to connect via SSH.

```bash
git push -f git@github.com:<USER_NAME>/<REPO_NAME>.git master:gh-pages
```

```bash
git push -f git@github.com:beatrizsmerino/vue-gh-pages.git master:gh-pages
```

### 4️⃣ The `package.json` file

#### 4.1. Copy & Paste code

Create the following NPM script inside the `package.json` file:

```json
"scripts": {
	"deploy:v1": "chmod +x ./deploy-v1.sh && ./deploy-v1.sh"
}
```

#### 4.2. Explain the code

The script executes 2 commands, one after the other:

1. `chmod +x ./deploy-v1.sh`: Assign the execution permission in the root of the project.
2. `./deploy-v1.sh`: Execute the `deploy-v1.sh` file using `shell`.

#### 4.3. Unexpected error

If you have unexpected changes in the `deploy-v1.sh` file after deployment follow the next step:

When you run the command `deploy:v1` which contains `chmod +x ./deploy-v1.sh`, it modifies the file permissions of `deploy-v1.sh` to make it executable. This change in file permissions is considered a modification by version control systems like Git, which is likely why you're seeing the file as modified.

The `chmod +x` command is changing the file's mode to add execute permissions for the user. This is a write operation on the file's metadata, not its content. Even though the content of the `deploy-v1.sh` script remains unchanged, the file system updates the metadata to reflect the new permissions, and hence Git recognizes this as a change.

If you're using Git and the file permissions were not previously committed as executable, the first time you run this command and then check the status with `git status`, you'll see the file listed as modified because of the permission change. To stop seeing it as modified, you can commit this change in permissions to the repository. After that, unless the permissions are changed again, it should not appear as modified in future.

If you commit this change and continue to see the file as modified after running the script, it might be due to a Git configuration that automatically changes file permissions when performing operations like `git add` or `git commit`. You can check and change this behavior by looking at the `core.fileMode` configuration in Git:

```bash
git config core.fileMode false
```

Setting `core.fileMode` to `false` tells Git to ignore file mode changes, which can be helpful if you're working on a project across different operating systems or environments where file permissions may be handled differently.

### 5️⃣ Deploy the application

#### 5.1. How execute the script

Finally, you can deploy the application by running the `npm run deploy:v1` command in the terminal while in the root of the project.

![Info of Vue deployment in the terminal](./README/images/deploy-v1.jpg)

#### 5.2. How watch the results

To see the result, wait for the script execution to finish and open the application in the browser.
Use the following link, replacing the `<USER_NAME>` and `<REPO_NAME>` variables with your data.

```bash
https://<USER_NAME>.github.io/<REPO_NAME>/
```

Here is an example of mine: [https://beatrizsmerino.github.io/vue-gh-pages/](https://beatrizsmerino.github.io/vue-gh-pages/)
