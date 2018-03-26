const path = require('path')
const webpack = require('webpack')

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Helpers
const concat = pathname => path.join(__dirname, pathname)

// Exports
module.exports = (env = {}) => {
	const isProduction = env.production === false

	const babelConfiguration = {
		'presets': [
			['es2015', { 'modules': false }],
			'stage-0',
			'react'
		],
		'plugins': [
			'transform-decorators-legacy',
			'transform-class-properties',
			'transform-function-bind',
			'babel-plugin-styled-components',
			'dynamic-import-webpack'
		]
	}

	let plugins = [
		new HtmlWebpackPlugin({
			template: isProduction ? concat('www/index.prod.html') : concat('www/index.dev.html'),
			filename: 'index.html',
			inject: 'body'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom',
			Component: ['react', 'Component'],
			styled: ['styled-components', 'default']
		})
	]

	const productionPlugins = [
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: true
		})
	]

	if (isProduction) {
		plugins.push(...productionPlugins)
	}

	return {
		entry: [
			'babel-polyfill',
			concat('src/index.js')
		],
		output: {
			path: concat('www'),
			filename: 'bundle.js',
			sourceMapFilename: 'bundle.map'
		},
		resolve: {
			extensions: ['.js'],
			alias: {
				'#components$': concat('src/components')
			}
		},
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: babelConfiguration
			}]
		},
		plugins: plugins,
		devtool: isProduction ? 'cheap-module-eval-source-map' : 'cheap-module-source-map', // reference: http://bit.ly/2vTwiRU
		devServer: {
			// fine tune webpack-dev-server output
			// https://webpack.js.org/configuration/stats/
			stats: {
				modules: false,
				chunks: false,
				colors: true
			},
			contentBase: concat('www'),
			historyApiFallback: true,
			watchContentBase: true,
			watchOptions: {
				ignored: /node_modules/
			},
			compress: true,
			hot: true,
			open: true,
			port: 8081
		}
	}
}
