# Vue+Webpack打造todo应用

### 目的
- 学习前端工程、webpack、vue
- 配置开发时的前段工程、实现一个简单的TODO应用、优化配置达到上线标准( 打包、网络优化、压缩静态资源文件 )
- 前端开发重点不是业务开发，很多的公司业务不复杂，前端应用主要是考虑工程化的问题

### 前端的价值
- 搭建前端工程 ( 加快开发效率，vue-cli是一个通用的vue模板，需要去理解及修改前端工程)
- 网络优化 ( 加快http的速度、缓存http请求)
- API定制 ( 理解后端API接口开发的概念 )
- nodejs层 (至少要知道如何去用nodejs写一个脚本、用nodejs去做代理)

### cmd
> npm install webpack vue vue-loader

> npm install style-loader url-loader file-loader

> npm install stylus-loader stylus-loader

	开发模式
> npm install webpack-dev-server

 	检测平台，不同平台配置不同
> npm install cross-env

> npm i post-css-loader autoprefixer babel-loader babel-core

> npm i babel-preset-env babel-plugin-transform-vue-jsx
> npm i babel-helper-vue-jsx-merge-props

> npm i extract-text-webpack-plugin

### vue.js重点知识

- 双向绑定
- vue文件开发方式
- render方法

#### API重点

- 生命周期方法
- computed
	例如: 姓+名

#### 笔记

- 声明的变量需要放在顶层的组件里面

### 总结

- vue开发基本已经离不开webpack
- 理解vue的重点不是api指令，而是过程
- 眼界要放宽