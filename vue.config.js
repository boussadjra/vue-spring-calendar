module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/vue-spring-calendar/' : '/',
	chainWebpack: config => {
		config.externals(['@vue/composition-api', 'moment']);
	},
	css: {
		extract: false,
	},
};
