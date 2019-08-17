### Examples

<!-- You can add custom classes to an example wrapper (` ```js { "className": "checks" } `)
    Or disable an editor by passing a `noeditor` modifier (` ```js noeditor `)
 -->

With no attributes, fm-button defaults to the "primary" theme
```js
<fm-button>Default Button</fm-button>
```

This button has the "bold" theme and demonstrates the "spinning" state when you click it.

```js
<template>
  <div>
    <fm-button
      @click="isSpinning = !isSpinning"
      :spinning="isSpinning" theme="bold">
      Toggle Spinning
    </fm-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isSpinning: false
    };
  },
};
</script>
```

To render an example as highlighted source code add a `static` modifier: (` ```js static `):

```js static
import Vue from 'vue'
```

Fenced blocks with other languages are rendered as highlighted code:

```html
<h1>Hello world</h1>
```
