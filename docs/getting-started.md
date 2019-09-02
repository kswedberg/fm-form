> We will be using [ES2015](https://github.com/lukehoban/es6features) in the code samples in the guide.

## JavaScript

```javascript
// app.js
// If using a module system (e.g. via Vue CLI), import Vue and fm-form and then call Vue.use(FmForm).
import Vue from 'vue';
import FmForm from 'fm-form';

const options = {
  FmFormName: 'MyForm'
};

Vue.use(FmForm, options);

new Vue().$mount('#app');
```

Then, perhaps in a single-file component:

```html static
<template>
  <div id="#app">
    <!-- Post to "/api/user/[id]" -->
    <FmForm
      api="user"
      :id="userId"
      :fields="formFields"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: '8675309',
    };
  },
  formFields: [
    {
      name: 'username',
      required: true,
      value: '',
      label: 'User Name',
    },
    {
      name: 'password',
      required: true,
      value: '',
      label: 'Password',
      type: 'password',
    },
  ],
};
</script>
```
