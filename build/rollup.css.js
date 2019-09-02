const {rollup} = require('rollup');
const css = require('rollup-plugin-css-porter');
const postcss = require('rollup-plugin-postcss');

rollup({
  input: 'src/css.js',
  plugins: [
    postcss({
      extract: true,
    }),
    css({
      minified: false,
    }),
  ],
})
.then((bundle) => {
  bundle.write({
    format: 'es',
    file: 'dist/styles.js',
  });
});
