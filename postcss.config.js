module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-easy-import': {},
    'postcss-nested': {},
    'postcss-custom-properties': {
      importFrom: [
        'src/css/cp-button.css',
        'src/css/cp-dropdown.css',
        'src/css/cp-field.css',
        'src/css/cp-form.css',
      ],
      exportTo: [
        'dist/cp-all.css',
      ],
    },
  },
};
