const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {

	// The base URL your application bundle will be deployed at
	publicPath: process.env.NODE_ENV === 'production' ? '/vue-gh-pages/' : '/',

	// Add configuration for use Dart sass/scss and compile files of 'assets' folder
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

	// Emit 'eslint' errors and warnings in the console
	// https://cli.vuejs.org/config/#lintonsave
	lintOnSave: true,

	// Add configuration for autofix stylelint errors
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

	// A function that recives a ChainableConfig instance based on webpack chain
	// Allows more fine-grained modifications to the internal webpack configuration
	chainWebpack: config => {
		// Add configuration for autofix eslint errors
		config.module.rule('eslint').use('eslint-loader').
			options({
				fix: true
			});
	}
};
