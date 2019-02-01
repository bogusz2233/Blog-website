const path = require('path');

module.exports = [
  {
    entry: './JS/snake/snake.js',
    output: {
      filename: './snake.js',
      path: path.resolve(__dirname, 'JS/output')
    },
  },
];