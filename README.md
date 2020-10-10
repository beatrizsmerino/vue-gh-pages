# How to deploy a Vue.js application to GitHub Pages using Vue CLI 3

![demo-vue-cli-gh-pages gh-pages](https://github.com/beatrizsmerino/demo-vue-cli-gh-pages/blob/master/doc/images/demo-vue-cli-gh-pages.jpg)

## USE

**1. In the root of the project create the file `vue.config.js`:**
```
touch vue.config.js
```


**2. Inside `vue.config.js` paste the code:** 
```
module.exports = {
publicPath: process.env.NODE_ENV === 'production'
	? '/name-repo/'
	: '/'
}
```

`/name-repo/` refers to the repository where the application is deployed.


**3. In the root of the project create the file `deploy.sh`:** 
```
touch deploy.sh
```


**4. Inside the file `deploy.sh` paste the code:** 
```
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist
git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
cd -
```

Replace the word `<USERNAME>` with your GitHub username and `<REPO>` with the name of your repository.

If you do not have your GitHub account configured to connect via SSH, you must replace this:  
```
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
```

With this:  
```
git push -f https://github.com/<USERNAME>/<REPO>.git master:gh-pages
```


**5. Open the terminal and go to the root of the project. Then assign the execute permission with the command:**
```
chmod +x deploy.sh
```

**6. Finally run the command:**  
```
./deploy.sh
```

**7. To see the result, wait for the execution of the script to finish and open the application in the browser:**
```
https://<USERNAME>.github.io/<REPO>/
```

Here I leave you the example of mine [https://beatrizsmerino.github.io/demo-vue-cli-gh-pages/](https://beatrizsmerino.github.io/demo-vue-cli-gh-pages/)

## DOCUMENTATION
[See here the documentation about Deployment with Vue Cli 3.](https://cli.vuejs.org/guide/deployment.html#github-pages)

## PROJECT SETUP

### Install npm packages
```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
