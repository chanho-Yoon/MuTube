/* eslint-disable no-undef */

const path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractCSS = require('extract-text-webpack-plugin')

const MODE = process.env.WEBPACK_ENV
const ENTRY_FILE = path.resolve(__dirname, 'assets', 'js', 'main.js')
const OUTPUT_DIR = path.join(__dirname, 'static')

const config = {
  entry: ['@babel/polyfill', ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },

      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          //로더 순서 기본적으로 오른쪽에서 왼쪽 or 아래에서부터 위
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                //여러 개의 plugin들을 추가할 수 있음
                return [autoprefixer({ browsers: 'cover 99.5%' })]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: '[name].js'
  },
  plugins: [new ExtractCSS('styles.css')]
}

module.exports = config
