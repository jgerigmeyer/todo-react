'use strict';

module.exports = {
  plugins: ['transform-object-rest-spread'],
  presets: [
    'react',
    [
      'env',
      {
        modules: false,
        useBuiltIns: true,
        exclude: ['transform-regenerator'],
      },
    ],
  ],
};
