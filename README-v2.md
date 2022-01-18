# 🌱 v2.0.0

This version executes the `deploy.js` file using the same npm `deploy` script declared in the `package.json` file. In contrast to the previous version, it has been developed in javascript, although `shell` scripts in `bash` language are still used inside it. The npm script has been improved, now it is simpler, **it is not necessary to enable the execution permissions**, in the root of the project, before executing the js file with node.

This javascript file **depends on the installation of additional npm packages to work**, which can be inconvenient.

-   The [`execa`](https://www.npmjs.com/package/execa) allows us to use `shell` scripts from a javascript file.
-   The [`fs`](https://nodejs.org/api/fs.html) module, you do not need to install it as a dependency in the `package.json` file, as you can access it if you have node installed globally on your computer. It allows you to interact with the file system in a way modeled on the standard `POSIX` functions. The Portable Operating System Interface (POSIX) is a family of standards specified by the IEEE Computer Society to maintain compatibility between operating systems.

The process is the same as in version [1.0.0](https://github.com/beatrizsmerino/vue-gh-pages/tree/1.0.0), it consists in pushing manually (only when we execute the `npm run deploy` command in the terminal) the updates from the `master` branch to the `gh-pages` branch of a `git` repository uploaded to GitHub.

During the execution process, **minimal information is displayed on the terminal**. The messages are created with `console.log` to indicate its start, push and successful or unsuccessful completion. So this would be another disadvantage of this version, as it is not specified which files are extracted, their weight and further compression.

On the other hand, another advantage of this version is that you only have to **customize one data in one file to be able to use it**:

1. In the `vue.config.js` file you have to change the `<REPO_NAME>` variable to the name of your repository in the `pathPublic` property.

# ⚙️ How it works

## 1️⃣ . The `deploy.js` file
