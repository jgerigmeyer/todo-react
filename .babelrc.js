'use strict';

module.exports = {
  plugins: ['transform-object-rest-spread', 'transform-class-properties'],
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
