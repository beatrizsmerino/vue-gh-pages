# 🔖 v2.x.x

## 🎯 Description

This version executes the `deploy-v2.mjs` file using the npm `deploy:v2` script declared in the `package.json` file. In contrast to the previous version, it has been developed in JavaScript, although `shell` scripts in `bash` language are still used inside it. The npm script has been improved; now it is simpler, **it is not necessary to enable the execution permissions** in the root of the project before executing the JS file with Node.

The choice of the file extension `.mjs` or `.cjs` instead of the traditional `.js` is related to the use of ECMAScript modules. The `.mjs` extension signifies that the file is using ESModules syntax, which allows for better compatibility with modern JavaScript features. It's a convention to differentiate files that use ESModules from the ones using CommonJS modules. This distinction can be important, especially when working in an environment that supports both module systems, as is the case in this project.

This javascript file **depends on the installation of additional npm packages to work**, which can be inconvenient.

- The [`execa`](https://www.npmjs.com/package/execa) allows us to use `shell` scripts from a javascript file.
- The [`fs`](https://nodejs.org/api/fs.html) module, you do not need to install it as a dependency in the `package.json` file, as you can access it if you have node installed globally on your computer. It allows you to interact with the file system in a way modeled on the standard `POSIX` functions. The Portable Operating System Interface (POSIX) is a family of standards specified by the IEEE Computer Society to maintain compatibility between operating systems.

The process is the same as in version `1.x.x`, it consists in pushing manually (only when we execute the `npm run deploy:v2` command in the terminal) the updates from the `master` branch to the `gh-pages` branch of a `git` repository uploaded to GitHub.

During the execution process, **minimal information is displayed on the terminal**. The messages are created with `console.log` to indicate its start, push and successful or unsuccessful completion. So this would be another disadvantage of this version, as it is not specified which files are extracted, their weight and further compression.

On the other hand, another advantage of this version is that you only have to **customize one data in one file to be able to use it**:

1. In the `vue.config.js` file you have to change the `<REPO_NAME>` variable to the name of your repository in the `pathPublic` property.

## ⚙️ How it works

In this version the points 1️⃣&nbsp;, 2️⃣&nbsp; and 5️⃣&nbsp;, you can omit them, they work exactly the same as in version `1.x.x`.

### 1️⃣ The `.gitignore` file

1.1. In the root of the project, there is a file called `.gitignore`, which was created when creating the [vue app](https://cli.vuejs.org/guide/creating-a-project.html), if not create it with the next command:

```bash
touch .gitignore
```

1.2. It is important that the `.gitignore` file includes the `dist` folder, which will be created when building the project for production.

```bash
.DS_Store
node_modules
/dist
```

### 2️⃣ The `vue.config.js` file

2.1. In the root of the project, there is also a `vue.config.js` file, if not create it with the next command:

```bash
touch vue.config.js
```

2.2. Inside of the `vue.config.js` file paste the next code:

```javascript
module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/<REPO_NAME>/' : '/'
};
```

2.3. In the previous code, update the [`publicPath`](https://cli.vuejs.org/config/#publicpath) changing the `<REPO_NAME>` variable for the name of the repository where the application will be deployed.

### 3️⃣ The `deploy-v2.mjs` file

3.1. In the root of the project create the `deploy-v2.mjs` file:

```bash
touch deploy-v2.mjs
```

3.2. Inside of the `deploy-v2.mjs` file paste the next code:

```javascript
/* eslint-disable no-console */
const execa = require('execa');
const fs = require('fs');

(async () => {
	try {
		await execa('git', ['checkout', '--orphan', 'gh-pages']);

		console.log('Building started...');
		await execa('npm', ['run', 'build']);

		const folderName = fs.existsSync('dist') ? 'dist' : 'build';
		await execa('git', ['--work-tree', folderName, 'add', '--all']);

		await execa('git', ['--work-tree', folderName, 'commit', '-m', 'gh-pages']);

		console.log('Pushing to gh-pages...');
		await execa('git', ['push', 'origin', 'HEAD:gh-pages', '--force']);

		await execa('rm', ['-r', folderName]);

		await execa('git', ['checkout', '-f', 'master']);

		await execa('git', ['branch', '-D', 'gh-pages']);

		console.log('Successfully deployed, check your settings');
	} catch (e) {
		console.log(e.message);
		process.exit(1);
	}
})();
```

The `deploy-v2.mjs` file is executed at the root of the project, it contains the serial execution of the commands necessary for the project release:

1. `git checkout --orphan gh-pages`: Creates a new branch named `gh-pages`
2. `npm run build`: Build the files for production
3. `folderName`: If the `dist` folder exists, it is used, otherwise the `build` folder is used
4. `git --work-tree folderName add --all`: Adds all files to the new branch
5. `git --work-tree folderName commit -m gh-pages`: Commits the new branch
6. `git push origin HEAD:gh-pages --force`: Pushes the new branch to the `gh-pages` branch of the repository
7. `rm -r folderName`: Removes the `dist` folder
8. `git checkout -f master`: Switches back to the `master` branch
9. `git branch -D gh-pages`: Deletes the `gh-pages` branch

### 4️⃣ The `package.json` file

4.1. Create the next npm script inside of `package.json` file:

```json
"scripts": {
	"deploy:v2": "node deploy-v2.mjs"
}
```

### 5️⃣ Deploy the application

5.1. Finally, you can deploy the application by running the `npm run deploy:v2` command with the terminal while in the root of the project.

![Info of Vue deployment in the terminal](./README/images/deploy-v2.jpg)

5.2. To see the result, wait for the execution of the script to finish and open the application in the browser:

Use the next link replacing the `<USER_NAME>` and `<REPO_NAME>` variables with your data.

```bash
https://<USER_NAME>.github.io/<REPO_NAME>/
```

Here I leave you the example of mine:
[https://beatrizsmerino.github.io/vue-gh-pages/](https://beatrizsmerino.github.io/vue-gh-pages/)
