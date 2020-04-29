const path = require('path')
//导入在内存中自动生成index页面的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 创建该插件的实例对象
const htmlPlugin = new HtmlWebpackPlugin({
    // __dirname项目的根目录
    template: path.join(__dirname, './src/index.html'),//源文件
    filename: 'index.html'//生成的内存中的首页的名称
})
// 向外暴露一个配置对象，webpack是基于node的，所以采用Node的语法
module.exports = {
    mode: 'development',
    // 在webpack4.x中一个大的特性，就是约定大于配置，默认的打包入口文件就是 src->index.js
    plugins: [
        htmlPlugin
    ],
    module: {
        //所有第三方模块的匹配规则
        rules: [
            { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },//千万别忘记添加exclude 排除项
            // ?modules表示为css样式表启用模块化
            { test: /\.css$/,use: ['style-loader','css-loader'] },
            { test: /\.jpg|png|bmp|ttf|woff|woff2|eot|svg$/, use:'url-loader'},//打包处理 字体文件的loader
            { test: /\.scss$/,use: ['style-loader',{ loader: 'css-loader',options: {modules: { localIdentName: '[path][name]-[local]-[hash:5]'},}},'sass-loader']},//打包scss文件
        ]
    },
    resolve: {
        // 默认只有.js和.json
        extensions: ['.js', '.jsx', 'json'],
        alias: {//别名
            '@': path.join(__dirname, './src')//这样@就表示项目根目录中 src 的这一层目录
        }
    }
}