const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  devtool: 'source-map',
  devServer: {
    headers: {'Access-Control-Allow-Origin': "*"}
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'three-demo.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'stylus-loader'
          }
        ]
      },
      // {
      //   test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       outputPath: 'images'
      //     }
      //   }]
      // },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './public/index.html'})
  ]
}