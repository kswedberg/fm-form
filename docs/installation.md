## Direct Download / CDN

https://unpkg.com/fm-form/dist/fm-form

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/fm-form@{{ $version }}/dist/fm-form.js

Include fm-form after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/fm-form/dist/fm-form.js"></script>
```

## NPM

```sh
npm install fm-form
```

## Yarn

```sh
yarn add fm-form
```

When used with a module system, you must explicitly install `fm-form` via `Vue.use()`:

```javascript
import Vue from 'vue'
import FmForm from 'fm-form'

Vue.use(FmForm)
```

You don't need to do this when using global script tags.

## Dev Build

You will have to clone directly from GitHub and build `fm-form` yourself if
you want to use the latest dev build.

```sh
git clone https://github.com//fm-form.git node_modules/fm-form
cd node_modules/fm-form
npm install
npm run build
```
