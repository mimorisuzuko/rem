const webpack = require('webpack');
const libpath = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const dst = 'app/dst';

module.exports = {
	entry: libpath.join(__dirname, 'src/'),
	output: {
		path: libpath.join(__dirname, dst),
		filename: 'index.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'babili'],
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new CleanWebpackPlugin([dst], {
			root: __dirname,
			verbose: false,
			dry: false,
			exclude: ['index.html', 'index.css']
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		})
	],
	node: {
		__filename: false,
		__dirname: false
	},
	target: 'electron'
};