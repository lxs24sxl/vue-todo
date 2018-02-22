// 打包前端资源
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// 非js代码的文件打包成一个文件夹
const ExtractPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
	// webpack的编译目标是web平台
	target: 'web',
	// __dirname： 根目录
	entry: path.join(__dirname, 'src/index.js'),
	output: {
		// 打包成一个完整的js
		filename: 'bundle.[hash:8].js',
		path: path.join(__dirname, 'dist' )
	},
	// 加配置，让webpack理解vue文件类型
	module: {
		rules: [
			{
				test: /\.vue$/,
				// 声明一个loader，让vue-loader去解析vue文件
				loader: 'vue-loader'
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader'
			},
			// {
			// 	test: /\.css$/,
			// 	use: [
			// 		'style-loader',
			// 		'css-loader'
			// 	]
			// },
			{
				test: /\.(gif|jpg|jpeg|png|svg)$/,
				'use': [
					{
						loader: 'url-loader',
						// 参数传给loader
						options: {
							// 转成base64格式
							limit: 1024,
							// 原名字,ext： 拓展名
							name: '[name].[ext]'
						}
					}
				]
			}
		]
	},
	// process.env.NODE_ENV = "development"
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? '"development"' : '"production"'
			}
		}),
		new HTMLPlugin()
	]
}

if ( isDev ) {
	// 开发环境
	config.module.rules.push({
				test: /\.styl/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						// 直接使用编译过的sourceMap
						options: {
							sourceMap: true
						}
					},
					'stylus-loader'
				]
			})

	// 完整映射，编译会慢
	config.devtool = '#cheap-module-eval-source-map'
	// webpack2里面加上去的
	config.devServer = {
		// 启动之后是一个服务，给个端口
		port: '8000',
		// 0.0.0.0的好处，可以通过内网IP来访问
		host: '0.0.0.0',
		// 错误检测显示到网页上 
		overlay: {
			errors: true
		},
		// 没有做映射的地址，都映射到入口地址 
		// historyFallback: {

		// },
		// 自动打开网页
		open: true,
		// 改了一个组件的代码，只重新渲染那个组件模块
		hot: true
	}
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)
} else {
	config.entry = {
		app: path.join(__dirname, 'src/index.js'),
		// vue-router
		vendor: ['vue']
	}
	config.output.filename = '[name].[chunkhash:8].js'
	config.module.rules.push(
		{
			test: /\.styl/,
			use: ExtractPlugin.extract({
				fallback: 'style-loader',
				use: [
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						}
					},
					'stylus-loader'
				]
			})
		}
	);
	config.plugins.push(
		new ExtractPlugin('styles.[contentHash:8].css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vuedor'
		}),
		// 新模块加入的时候，长缓存之前的代码
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime'
		})
	)
}

module.exports = config;