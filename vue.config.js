const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/vue-gh-pages/' : '/',
	lintOnSave: true,
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
				'./src/assets/scss/styles.scss'
			]
		}
	},
	configureWebpack: {
		plugins: [
			new StyleLintPlugin({
				fix: true,
				files: [
					'src/**/*.{vue,scss}'
				]
			})
		]
	},
	chainWebpack: config => {
		config.module.rule('eslint').use('eslint-loader').
			options({
				fix: true
			});
	}
};
