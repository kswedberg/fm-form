<template>
  <component
    :is="tag"
    v-on="$listeners"
    :class="{
      Button: true,
      'is-spinning': spinning,
      [`Button--${theme}`]: theme,
      [`Button--${mode}`]: mode,
      [`Button--size-${size}`]: size,
      [`Button--icon-${iconPosition}`]: mode === 'icon',
    }"
    :type="type"
    :disabled="isDisabled"
    v-bind="attrs"
    :to="to"
  >
    <!-- @slot Button content, including svg or any other html elements you need -->
    <slot />
  </component>
</template>

<script>
/**
* Button that transforms to a <nuxt-link> if the `to` prop is passed to it
*/
export default {
  name: 'FmButton',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default() {
        return this.mode ? '' : 'primary';
      },
    },
    iconPosition: {
      type: String,
      default: 'left',
    },
    spinning: {
      type: Boolean,
      default: false,
    },
    /**
    * The size of the button
    * e.g. `s` or `l`
    */
    size: {
      type: String,
      default: '',
    },
    to: {
      type: [String, Object],
      default: null,
    },
  },
  computed: {
    attrs() {
      const {mode, type, spinning, disabled, to, ...attrs} = this.$attrs;

      return attrs;
    },
    isDisabled() {
      return this.disabled;
    },
    tag() {
      if (this.to) {
        return 'nuxt-link';
      }

      return this.attrs.href ? 'a' : 'button';
    },
  },
};
</script>
