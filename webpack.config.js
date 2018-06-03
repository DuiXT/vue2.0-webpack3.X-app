/**
 * Created by Administrator on 2018/5/12.
 */
const path=require('path');
const htmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const ExtractPlugin=require('extract-text-webpack-plugin');//将非js代码的文件打包成单独的静态资源文件，可以单独做浏览器缓存

const isDev=process.env.NODE_ENV==='development';
const config={
    target:'web',
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.jsx$/,
                loader:'babel-loader'
            },

            // {
            //     test:/\.css$/,
            //     use:[
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },
            {
                test:/.\gif|jpg|png|jpeg|svg$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,//如果图片的大小小于1024kb则转化为base64格式
                            name:'[name]--aa.[ext]'//输出的图片的名字
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new htmlWebpackPlugin()
    ]
}

if(isDev){
    config.module.rules.push({
        test:/\.styl$/,
            use:[
        'style-loader',
        'css-loader',
        {
            loader:'postcss-loader',
            options:{
                sourceMap:true,//stylus-loader处理过的.styl文件会生成sourceMap，但是postcss-loader也会生成sourceMap，如果postcss-loader检测到了sourceMap，就不会再次生成sourceMap
            }
        },
        'stylus-loader'
    ]
})
    config.devtool='#cheap-module-eval-source-map';//在开发模式下，避免webpack打包后的代码在浏览器中显示时开发人员阅读困难，此配置可以在浏览器显示开发人员自己写的代码
    config.devServer={
        port:8000,
        host:'0.0.0.0',
        overlay:{//webpack编译错误时讲错误显示在页面上
            errors:true,
        },
         hot:true
        // open:true,//每次打包完成后打开一个新页面
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),//避免页面刷新
        new webpack.NoEmitOnErrorsPlugin()//不显示没必要的错误
    )
}else {
    config.entry={
        app:path.join(__dirname,'src/index.js'),
        vendor:['vue']
    }
    config.output.filename='[name].[chunkhash:8].js';
    config.module.rules.push({
            test:/\.styl$/,
            use:ExtractPlugin.extract({
                fallback:'style-loader',
                use:[
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true,//stylus-loader处理过的.styl文件会生成sourceMap，但是postcss-loader也会生成sourceMap，如果postcss-loader检测到了sourceMap，就不会再次生成sourceMap
                        }
                    },
                    'stylus-loader'
                ]
            })
    })
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),//单独打包css文件
        new webpack.optimize.CommonsChunkPlugin({//单独打包第三方类库文件
            name:'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({//单独打包webpack
            name:'runtime'
        })
    )
}

module.exports=config