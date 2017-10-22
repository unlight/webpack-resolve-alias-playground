/// <reference types="node" />
/// <reference path="node_modules/typescript/lib/lib.esnext.d.ts" />
import * as fs from 'fs';
import * as Path from 'path';
const sourcePath = Path.join(__dirname, 'src');
const buildPath = Path.join(__dirname, 'dist');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

export = {
	entry: {
		app: './app',
	},
	output: {
		path: buildPath,
		publicPath: '',
		filename: '[name].js',
	},
	devServer: {
		https: false,
		overlay: true,
		noInfo: false,
		contentBase: [sourcePath, buildPath],
		port: 8087,
		historyApiFallback: true,
		hot: true,
		inline: true,
		disableHostCheck: true,
	},
	node: {
		// workaround for webpack-dev-server issue
		// https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
		fs: 'empty',
		net: 'empty',
		buffer: 'empty',
		Buffer: false,
		setimmediate: false,
	},
	target: 'web',
	resolve: {
		extensions: ['.ts', '.js'],
		modules: ['node_modules'],
		alias: {
			rxjs$: 'rxjs/_esm5/Rx.js',
			rxjs: 'rxjs/_esm5'
		}
	},
	module: {
		exprContextCritical: false,
		rules: [
			{
				parser: { amd: false }
			},
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'awesome-typescript-loader',
						options: {
							useTranspileModule: true,
							isolatedModules: true,
							transpileOnly: true,
						}
					},
				]
			},
		],
	},
	plugins: [
		new NamedModulesPlugin(),
	]
}