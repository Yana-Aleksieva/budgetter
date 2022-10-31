const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
      },
      devServer: {
        static: {
          directory: path.join(__dirname, '/'),
        },
        compress: true,
        port: 9000,
      },
  };