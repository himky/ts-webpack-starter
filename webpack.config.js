const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const entries = ['main', 'sub']
  .reduce((r, v) => ({ ...r, [`scripts/${v}`]: `./src/scripts/${v}.ts` }), {})

const htmlWebpackPlugins = ['index', 'sub']
  .map(v => new HtmlWebpackPlugin({
    template: `./src/${v}.html`,
    filename: `${v}.html`,
    inject: false,
  }))

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  target: ['web', 'es5'],
  entry: entries,
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlWebpackPlugins,
  ]
}
