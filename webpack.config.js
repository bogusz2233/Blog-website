const path = require('path');

module.exports =
{
    entry: './snake/js/snake.js',
    output: {
      filename: 'snake-bundle.js',
      path: path.resolve(__dirname, 'snake'),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
          ]
        }
      ]
    }
};

module.exports =
{
    entry: './weather/js/weather.js',
    output: {
      filename: 'weather-bundle.js',
      path: path.resolve(__dirname, 'weather'),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
          ]
        }
      ]
    }
};
