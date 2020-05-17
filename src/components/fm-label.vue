<template>
  <label
    class="FormField-label"
    :for="id"
  >
    <slot />
    <span v-if="required">
      <span class="required-mark" aria-hidden="true">*</span>
      <span class="sr-only">required</span>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    for: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    id() {
      return this.for;
    },
  },
};
</script>

<style scoped>
.sr-only {
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  text-indent: 2px;
}
</style>
