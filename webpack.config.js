module.exports = {
	mode: "development",
	output: {
		filename: '[name].chunk.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|server.js)/,
				loader: 'babel-loader',
				query: {
					presets: ['@babel/preset-env']
				}
			}
		]
	}
}