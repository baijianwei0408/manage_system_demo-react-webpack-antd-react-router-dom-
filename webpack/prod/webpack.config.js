const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


module.exports = {
    // 指定构建环境
    mode: "production",
    // 入口
    entry: {
        app: "./index.js",
        // vendor: ["react", "react-dom", "react-router-dom", "antd", "mobx", "mobx-react"]
    },
    // 出口
    output: {
        path: path.resolve(__dirname, "../../dist"),
        filename: "[name].[hash].js",
        publicPath: "/" // 打包后的资源的访问路径前缀,如果想在本地运行就改成 "./"
    },
    // 模块
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
                loader: 'babel-loader',//loader的名称（必须）
            },
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // MiniCssExtractPlugin和style-loader冲突
                    // {
                    //     loader: 'style-loader', // 创建 <style></style>
                    // },
                    {
                        loader: 'css-loader',  // 转换css
                    },
                    {
                        loader: 'less-loader', // 编译 Less -> CSS
                    },
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // 小于10000B的字体base64的方式引入，大于10000B的字体以路径的方式导入
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    // 插件
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, "../../dist/index.html"), // html模板的生成路径
            template: 'index.html',//html模板
            inject: true, // true：默认值，script标签位于html文件的 body 底部
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
            ignoreOrder: false,
        }),
    ],
    resolve: {
        extensions: ['.js', '.json'], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
        alias: {
            '@': path.join(__dirname, '../..', "src") // 在项目中使用@符号代替src路径，导入文件路径更方便
        }
    },
    optimization: {
        minimizer: [
            // 压缩js
            new UglifyJsPlugin({
                parallel: true,  //使用多进程并行运行来提高构建速度
                sourceMap: false,
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        unused: true,
                        drop_debugger: true,
                        drop_console: true,
                    },
                    output: {
                        comments: false
                    }
                }
            }),
            // 压缩css
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    discardComments: { removeAll: true } // 移除注释
                }
            })
        ],
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                common: {
                    name: 'common',
                    chunks: 'all',
                    minSize: 1,
                    minChunks: 1,
                    priority: 1//设置匹配优先级，数字越小，优先级越低
                },
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,//匹配node模块中匹配的的模块
                    priority: 10,//设置匹配优先级，数字越大，优先级越高
                },
                styles: {
                    name: 'style', // 样式文件全部合并打包
                    chunks: 'all',
                    test: /\.(css|less)$/,
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: "manifest"
        },
    },
};
