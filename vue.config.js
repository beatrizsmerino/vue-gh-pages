module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/vue-gh-pages/" : "/",
	css: {
		loaderOptions: {
			sass: {
				implementation: require('sass')
			}
		}
	},
};
