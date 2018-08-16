const path = require('path')
const LoaderCountPlugin = require('../index')

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.worker\.js$/,
      use: {
        loader: 'worker-loader'
      }
    }]
  },
  plugins: [
    new LoaderCountPlugin()
  ]
}
