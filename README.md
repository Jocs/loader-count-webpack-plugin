## Loader-count-webpack-plugin

这是一个 webpage 插件，帮你统计项目中不同的 webpack loader 所处理的文件数目，特别是 `node_modules` 文件夹中被处理的文件，并在控制台中将结果输出。

### Why write this plugin?

在最近的项目中，我遇到了一个奇怪的 bug，引入 `pdfjs-dist` 模块后，加载 pdf 文件时，始终不发送 Ajax 请求，最后才找到原因，是因为我在项目中引入了 `worker-loader` 来处理以 `.worker.js` 结尾的文件，恰好在 `pdfjs-dist/build/pdf.js` 文件中，引入了 `pdf.worker.js` 文件，而该文件不需要 `worker-loader` 来处理，最终导致了 bug 产生。为了以后不在出现类似的 bug，我写了这个插件。

### How to use?

```javascript
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
```

### License

**MIT**
