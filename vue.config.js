module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/vue-gh-pages/" : "/",
	lintOnSave: false,
	css: {
		loaderOptions: {
			sass: {
				implementation: require('sass')
			}
		}
	},
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'scss',
			patterns: [
				'./src/assets/scss/styles.scss',
			]
		}
	}
};
