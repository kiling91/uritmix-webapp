const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	output: {
		chunkFilename: '[name].[contenthash].js',
		filename: '[name].[contenthash].js',
		assetModuleFilename: '[name].[contenthash][ext][query]'
	},
	resolve: {
		alias: {
			process: 'process/browser'
		}
	},
	optimization: {
		runtimeChunk: 'single',
		minimize: true,
		splitChunks: {
			chunks: 'all'
		},
		minimizer: [
			new TerserPlugin({
				include: /\.js$/,
				// cache: true,
				parallel: true,
				// sourceMap: false,
				extractComments: false,
				terserOptions: {
					format: {
						comments: false,
						beautify: false
					},
					warnings: false,
					ecma: 6,
					mangle: true,
					keep_fnames: true,
					compress: {
						sequences: true,
						dead_code: true,
						conditionals: true,
						booleans: true,
						unused: true,
						if_return: true,
						join_vars: true,
						drop_console: false
					}
				}
			})
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: 'process/browser'
		}),
		new webpack.DefinePlugin({
			'process.env.REACT_API_URL': JSON.stringify(process.env.REACT_API_URL),
			'process.env.REACT_BUILD_VERSION': JSON.stringify(
				process.env.REACT_BUILD_VERSION
			)
		})
	]
})
