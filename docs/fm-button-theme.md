### Styling Buttons

#### Button Classes

Every button gets a class of "Button" and, if no `theme` is provided, "Button--primary". Class names are added in the form of "Button--*theme*" and "Button--*mode*".

For example, given

```html static
<FmButton theme="bold" mode="icon" aria-label="Brighten">
  <svg>
    <!-- etc. -->
  </svg>
</FmButton>
```

the rendered html would look like

```html
<button type="button" class="Button Button--bold Button--icon" aria-label="Brighten">
  <svg>
    <!-- etc. -->
  </svg>
</button>
```

as you can see:

```vue
<template>
  <div>
    <FmButton theme="bold" mode="icon" aria-label="Brighten">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" viewBox="0 0 24 26">
          <g fill-rule="evenodd" class="sun-g" transform="translate(0 1)">
              <ellipse cx="12.076" cy="12" rx="5.908" ry="5.846"/>
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M12.076 0v3.75M11.78 19.85v3.75M23.256 11.954h-3.6M4.2 11.646H.6M19.834 20.253l-2.546-2.652M6.568 6L4.022 3.346M3.813 20.035l2.546-2.652M17.497 6.217l2.546-2.652"/>
          </g>
      </svg>
    </FmButton>
    <button type="button" class="Button Button--bold Button--icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" viewBox="0 0 24 26">
          <g fill-rule="evenodd" class="sun-g" transform="translate(0 1)">
              <ellipse cx="12.076" cy="12" rx="5.908" ry="5.846"/>
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M12.076 0v3.75M11.78 19.85v3.75M23.256 11.954h-3.6M4.2 11.646H.6M19.834 20.253l-2.546-2.652M6.568 6L4.022 3.346M3.813 20.035l2.546-2.652M17.497 6.217l2.546-2.652"/>
          </g>
      </svg>
    </button>
  </div>
</template>

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
