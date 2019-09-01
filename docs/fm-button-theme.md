### Styling Buttons

#### Button Classes

Every button gets a class of "Button" and, if no `theme` is provided, "Button--primary". Class names are added in the form of "Button--*theme*" and "Button--*mode*".

For example, given

```html static
<FmButton theme="bold" mode="icon" aria-label="Brighten">
  <img src="../styleguide/sample.svg">
</FmButton>
```

the rendered html would look like

```html
<button type="button" class="Button Button--bold Button--icon" aria-label="Brighten">
  <img src="../styleguide/sample.svg">
</button>
```

as you can see:

```vue
<template>
  <div>
    <FmButton theme="bold" mode="icon" aria-label="Brighten">
      <img svg-inline src="../styleguide/sample.svg">
    </FmButton>
    <button type="button" class="Button Button--bold Button--icon">
      <img svg-inline src="../styleguide/sample.svg">
    </button>
  </div>
</template>
<script>
import IconSample from '../styleguide/sample.svg';
export default {
  components: {
    IconSample
  }
}
</script>
```

You can, of course, use any `theme` or `mode` you want, but the following have some default styles applied to them so you don't have to start from ground zero:

- theme:
  - primary
  - secondary
  - bold
  - danger
  - link
- mode:
  - icon
  - text

#### CSS Custom Properties

The following Custom properties are available for styling buttons with the provided theme names. The values shown are the ones used in the examples:

```css
:root {
  --btn-border-radius: 4px;
  /* --btn-border-color: undefined, fallback transparent */
  --primary-btn-bg: #0096e2;
  --primary-btn-hover-bg: #00699e;
  --primary-btn-focus-bg: #00699e;
  --primary-btn-active-bg: #fff;
  --primary-btn-text: #fff;
  --primary-btn-hover-text: #fff;
  --primary-btn-focus-text: #fff;
  --primary-btn-active-text: #00699e;
  --primary-btn-border-color: #0096e2;

  --secondary-btn-bg: #0096e2;
  --secondary-btn-hover-bg: #00699e;
  --secondary-btn-focus-bg: #00699e;
  --secondary-btn-active-bg: #fff;
  --secondary-btn-text: #fff;
  --secondary-btn-hover-text: #fff;
  --secondary-btn-focus-text: #fff;
  --secondary-btn-active-text: #00699e;
  --secondary-btn-border-color: #0096e2;

  --bold-btn-bg: #e90;
  --bold-btn-hover-bg: #ffad18;
  --bold-btn-focus-bg: #ffad18;
  --bold-btn-active-bg: #fff;
  --bold-btn-text: #fff;
  --bold-btn-hover-text: #fff;
  --bold-btn-focus-text: #fff;
  --bold-btn-active-text: #e90;
  --bold-btn-border-color: #ffad18;

  --danger-btn-bg: #f32222;
  --danger-btn-hover-bg: #bb0000;
  --danger-btn-focus-bg: #bb0000;
  --danger-btn-active-bg: #fff;
  --danger-btn-text: #fff;
  --danger-btn-hover-text: #fff;
  --danger-btn-focus-text: #fff;
  --danger-btn-active-text: #f32222;
}
```
