const path = require('path');
const vueLoader = require('vue-loader');

module.exports = {
  title: 'FM Form Components',
  pagePerSection: true,
  sections: [
    {
      name: 'Install',
      content: 'docs/installation.md',
    },
    {
      name: 'Getting Started',
      content: 'docs/started.md',
    },
    {
      name: 'Components',
      content: './docs/components.md',
      components: () => [
        './src/components/fm-button.vue',
        './src/components/fm-form.vue',
      ],
      usageMode: 'expand', // 'hide' | 'collapse' | 'expand'
      exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
      sections: [
        {
          name: 'Fields',
          components: () => ['./src/components/fm-field.vue'],

          usageMode: 'expand', // 'hide' | 'collapse' | 'expand'
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
        },

      ],
      sectionDepth: 1,
    },
  ],
  require: [
    path.join(__dirname, 'styleguide/global.requires.js'),
    path.join(__dirname, 'src/styles.css'),
  ],
  defaultExample: true,
  webpackConfig: (env) => ({
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: 'postcss',
                // plugins: () => [
                //   // require('postcss-flexbugs-fixes'),
                //   autoprefixer({
                //     browsers: [
                //       '>1%',
                //       'last 4 versions',
                //       'not ie <= 9', // React doesn't support IE8 anyway
                //     ],
                //     // flexbox: 'no-2009',
                //   }),
                // ],
              },
            },
          ],
        },

      ],
    },
    plugins: [new vueLoader.VueLoaderPlugin()],

    performance:
			env === 'development'
			  ? false
			  : {
			    maxAssetSize: 1685000, // bytes
			    maxEntrypointSize: 1685000, // bytes
			    hints: 'error',
				  },
  }),
  styleguideDir: 'dist',
  // ribbon: {
  //   text: 'Back to examples',
  //   url: 'https://vue-styleguidist.github.io/Examples.html',
  // },
};
