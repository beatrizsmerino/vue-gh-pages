# Como hacer deploy de una aplicación de Vue.js hacia GitHub Pages usando Vue CLI 3

![demo-vue-cli-gh-pages gh-pages](https://github.com/beatrizsmerino/demo-vue-cli-gh-pages/blob/master/documentation/images/demo-vue-cli-gh-pages.jpg)

## Pasos

1. En la raíz del proyecto crear el archivo vue.config.js:  
   `touch vue.config.js`

2. Dentro de vue.config.js pegar el codigo:

```
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/name-repo/'
    : '/'
}
```

`/name-repo/` hace referencia al repositorio donde se despliega la aplicación.

3. En la raíz del proyecto crear el archivo deploy.sh  
   `touch deploy.sh`

4. Dentro de `deploy.sh` pegar el codigo:

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

Hay que reemplazar la palabra `<USERNAME>` por tu usuario de GitHub y `<REPO>` por el nombre de tu repositorio.

En caso de no tener configurado tu cuenta de GitHub para conectarse via SSH debe reemplazar:  
`git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages`  
Por:  
`git push -f https://github.com/<USERNAME>/<REPO>.git master:gh-pages`

5. Abre la terminal y ve a la raíz del proyecto. Luego asigna el permiso de ejecución con el comando:  
   `chmod +x deploy.sh`

6. Finalmente ejecuta el comando deploy.sh:  
   `./deploy.sh`

Espera a que termine la ejecución del script y abre en el navegador nuestra aplicación
`https://<USERNAME>.github.io/<REPO>/`

Aqui os dejo el ejemplo de la mia [https://beatrizsmerino.github.io/demo-vue-cli-gh-pages/](https://beatrizsmerino.github.io/demo-vue-cli-gh-pages/)

[Ver aqui la documentación sobre Deployment con Vue Cli 3.](https://cli.vuejs.org/guide/deployment.html#github-pages)

## Project setup

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
