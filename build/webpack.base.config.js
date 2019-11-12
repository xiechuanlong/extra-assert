const path = require('path');
module.exports =  {
    mode: 'development',
    resolve: {
        extensions: ['.js'],
        alias: {
        }
    },
    entry: path.resolve(__dirname, '../main.js'),
    output: {
        filename: '../dist/bundle.js',
        path: path.resolve(__dirname, '../dist'),
        library: 'parse',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: []
}
