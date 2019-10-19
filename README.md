# Como hacer deploy de una aplicación de Vue.js hacia GitHub Pages usando Vue CLI 3

![demo-vue-cli-gh-pages gh-pages](https://github.com/beatrizsmerino/demo-vue-cli-gh-pages/blob/feature/documentation/documentation/images/demo-vue-cli-gh-pages.jpg)

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

Donde `/name-repo/` hace referencia al repositorio donde desplegue la aplicación.

2. En la raíz del proyecto crear el archivo deploy.sh  
   `touch deploy.sh`

Dentro de `deploy.sh` pegar el codigo:

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

Deben reemplazar la palabra `<USERNAME>` por su usuario de GitHub y `<REPO>` por el nombre de su repositorio.

En caso de no tener configurado su cuenta de GitHub para conectarse via SSH debe reemplazar:  
`git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages`  
Por:  
`git push -f https://github.com/<USERNAME>/<REPO>.git master:gh-pages`

3. Abrir la terminal y moverse a la raíz del proyecto. Luego asignar el permiso de ejecución con el comando:  
   `chmod +x deploy.sh`

4. Finalmente ejecutar el comando deploy.sh con el comando:  
   `./deploy.sh`

Esperar que termine la ejecucion del script y abrir en el navegador nuestra aplicación
`https://<USERNAME>.github.io/<REPO>/`

Aqui les dejo el ejemplo de la mia [https://beatrizsmerino.github.io/demo-vue-cli-gh-pages/](https://beatrizsmerino.github.io/demo-vue-cli-gh-pages/)

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
