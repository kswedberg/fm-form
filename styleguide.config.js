const path = require('path');

module.exports = {
  title: 'FM Form Components',

  styleguideDir: 'dist/docs',
  styleguidePublicPath: '/fm-form/',
  ribbon: {
    text: 'Back to Github',
    url: 'https://github.com/kswedberg/fm-form',
  },
  styles: {
    StyleGuide: {
      footer: {
        display: 'none',
      },
    },
  },
  renderRootJsx: path.resolve(__dirname, 'styleguide/styleguide.root.js'),
  pagePerSection: true,
  sections: [
    {
      name: 'Installation',
      content: 'docs/installation.md',
    },
    {
      name: 'Getting Started',
      content: 'docs/getting-started.md',
    },
    {
      name: 'Components',
      content: './docs/components.md',
      components: () => [
        './src/components/fm-form.vue',
      ],
      usageMode: 'collapse', // 'hide' | 'collapse' | 'expand'
      exampleMode: 'collapse',
      sections: [
        {
          name: 'Buttons',
          content: './docs/fm-button-theme.md',
          components: () => ['./src/components/fm-button.vue'],
        },
        {
          name: 'Fields',
          components: () => [
            './src/components/fm-field.vue',
            './src/components/fm-dropdown.vue',
          ],

          usageMode: 'expand',
          exampleMode: 'collapse',
        },

      ],
      sectionDepth: 1,
    },
  ],
  require: [
    path.join(__dirname, 'styleguide/styles.css'),
  ],
  defaultExample: false,

  getExampleFilename(componentPath) {
    const file = path.basename(componentPath, '.vue');

    return path.join(__dirname, 'docs', `${file}.md`);
  },

};
