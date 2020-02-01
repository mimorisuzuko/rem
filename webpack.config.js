const {
    DefinePlugin,
    HotModuleReplacementPlugin,
    LoaderOptionsPlugin
} = require('webpack');
const libpath = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, { mode }) => {
    const dst = 'app/dst';
    const context = libpath.join(__dirname, 'src/');
    const isProduction = mode === 'production';

    const plugins = [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['!index.html'],
            verbose: false,
            dry: false
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(mode)
            }
        }),
        new LoaderOptionsPlugin({
            options: {
                context
            }
        })
    ];

    if (!isProduction) {
        plugins.push(new HotModuleReplacementPlugin());
    }

    return {
        context,
        entry: isProduction
            ? ['@babel/polyfill', context]
            : [
                  'webpack-dev-server/client?http://0.0.0.0:3000',
                  'webpack/hot/only-dev-server',
                  'react-hot-loader/patch',
                  context
              ],
        output: {
            path: libpath.join(__dirname, dst),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.js(x?)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.png$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets'
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        target: 'electron-renderer',
        plugins,
        devServer: {
            hot: true,
            port: 3000,
            host: '0.0.0.0',
            contentBase: libpath.join(__dirname, dst)
        },
        optimization: {
            splitChunks: {
                name: 'vendor',
                chunks: 'initial'
            }
        }
    };
};
