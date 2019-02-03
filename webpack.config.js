const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const defaultRules = [
  {
    test: /\.scss$/,
    use: [
        "style-loader", // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
    ]
  },
  {
    test: /\.css$/,
    use: [
        "style-loader", // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
    ]
  },
  {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  }
];
module.exports = [
  {
    entry: './snake/js/snake.js',
    output: {
      filename: 'snake-bundle.js',
      path: path.resolve(__dirname, 'snake'),
    },
    module: {
      rules: defaultRules,
    }
  },
  {
    entry: './weather/js/weather.js',
    output: {
      filename: 'weather-bundle.js',
      path: path.resolve(__dirname, 'weather'),
    },
    plugins: [
      new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'style.css',
      chunkFilename: 'style-chunk.css'
    }),
    new OptimizeCssAssetsPlugin(),
    ], 
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            "sass-loader"
          ]
        },
        {
          test: /\.css$/,
          use: [
              "style-loader", // creates style nodes from JS strings
              "css-loader", // translates CSS into CommonJS
          ]
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  }
];


