module.exports = {
  presets: [
    '@babel/preset-env',
    {
      useBuiltIns: false,
      modules: false,
      polyfills: false,
    },
  ],
  comments: false,
};
