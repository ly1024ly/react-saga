var webpack = require('webpack');
var path = require('path');
require("babel-polyfill");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var bower_dir = path.resolve(__dirname,'./src/js');

module.exports = {
  entry:{
    app:["babel-polyfill",bower_dir+"/app.jsx"],
    share:bower_dir+"/share.js",
    prop:bower_dir+"/prop.js",
    home:bower_dir+"/home.js",
    
  },
  output:{
    path:path.resolve(__dirname,"assets"),
    publicPath:'../',
    //publicPath:'https://nccloud.weihong.com.cn/nchelp/assets/',
    filename:'js/[name].js',
    chunkFilename:'js/[id].chunk.js'
  },
  module:{
     rules: [{
        //解析css文件
              test: /\.css$/,
              use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
              })
          },
          {  
            test: /\.jsx?$/,  
            exclude: /node_modules/,  
            loader: 'babel-loader'  
          },  
        //处理html页面
          {
              test: /\.html$/,
              use: [{
                loader: 'html-loader',
                options: {
                  minimize: true,
                }
              }]
          },
          {
            // 文件加载器，处理文件静态资源
            test: /\.(woff|woff2|ttf|eot|svg|swf)\??.*$/,
            loader: 'file-loader?name=./fonts/[name].[ext]'
        }, {
            // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
            // 如下配置，将小于8192byte的图片转成base64码
            test: /\.(png|jpg|gif)$/,
            loader: "file-loader?limit=8192&name=img/[hash].[ext]"
        }
      ]
  },
  
  plugins:[
    new ExtractTextPlugin("css/[name].css"),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),
  
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename:'./view/index.html',
      template:'./index.html',
      hash:true,
      chunks:['app'],
      minify:{
        removeComments:true,
        collapseWhitespace:false       
      }
    }),
     new HtmlWebpackPlugin({
      filename:'./home.html',
      template:'./home.html',
      hash:true,
      chunks:['home'],
      minify:{
        removeComments:true,
        collapseWhitespace:false       
      }
    }),

    new HtmlWebpackPlugin({
      filename:'./share.html',
      template:'./share.html',
      hash:true,
      chunks:['share'],
      minify:{
        removeComments:true,
        collapseWhitespace:false       
      }
    }),

   new HtmlWebpackPlugin({
      filename:'./view/prop.html',
      template:'./prop.html',
      hash:true,
      inject: 'body', 
      chunks:['prop'], 
      minify:{
        removeComments:true,
        collapseWhitespace:false       
      }
    })
  ],
   
}