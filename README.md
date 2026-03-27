![GitHub dependabot](https://img.shields.io/badge/dependabot-enabled-025e8c?logo=Dependabot)
![node](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/beatrizsmerino/vue-gh-pages/master/package.json&query=$.engines.node&label=node&logo=node.js&color=339933)
![npm](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/beatrizsmerino/vue-gh-pages/master/package.json&query=$.engines.npm&label=npm&logo=npm&color=CB3837)  
![GitHub last commit](https://img.shields.io/github/last-commit/beatrizsmerino/vue-gh-pages)
![GitHub issues](https://img.shields.io/github/issues/beatrizsmerino/vue-gh-pages)
![GitHub forks](https://img.shields.io/github/forks/beatrizsmerino/vue-gh-pages)
![GitHub stars](https://img.shields.io/github/stars/beatrizsmerino/vue-gh-pages)
![GitHub watchers](https://img.shields.io/github/watchers/beatrizsmerino/vue-gh-pages)

# Deploy Vue app to GitHub Pages

![Deploy Vue app](./README/images/vue-gh-pages.jpg)

## 🎯 Description

This repository was inspired by the [vue-gh-pages](https://github.com/cristinafsanz/vue-gh-pages) repository. It is designed with the purpose is to serve as step-by-step tutorial for publishing a `Vue` project on the `github.io` domain using `GitHub Pages`.

**GitHub Pages** is a free service that provides a simple way to host your own website about yourself, your organization, or your project. It takes `HTML`, `CSS` and `JavaScript` files directly from a repository on GitHub, optionally runs the files through a build process, and publishes a website. Therefore, it is a static site hosting service and **does not support server-side code** such as `PHP`, `Ruby` or `Python`.

## 🔖 Tags versions

### [v1.x.x](./README-v1.md)

- Executes a bash file through a NPM script command.
- Does not require the installation of additional NPM packages to work.
- To use it, you need to customize some data in multiple files.
- Provides a complete information about the files extracted, their weight and subsequent compression in the terminal.

### [v2.x.x](./README-v2.md)

- Executes a JavaScript file with NodeJS through a NPM script command.
- Requires the installation of NPM packages to work.
- To use it, you need to customize one data in a single file.
- Provides a concise information about execution steps in the terminal, using colors and emojis for enhanced visibility.

### [v3.x.x](./README-v3.md)

- Executes a JavaScript file with NodeJS triggered by an NPM script command, which runs automatically through a GitHub Actions workflow.
- Requires the installation of the NPM packages used in the version 2.x.x to work.
- To use it, you need to customize some data in multiple files.
- Displays steps information about the deployment process in the GitHub Actions log, rather than in the terminal.

## 🚀 Commands

### Install dependencies

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

## 📜 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as needed.