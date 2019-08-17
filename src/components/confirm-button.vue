<template>
  <FmButton v-if="!confirmVisible" @click="showConfirm" :theme="theme">
    <slot>
      Delete
    </slot>
  </FmButton>
  <span
    v-else
    @keyup.esc="cancel"
    ref="confirmWrapper"
    :class="{
      Confirm: true,
      'is-float': float
    }"
  >
    <span class="Confirm-label">
      <slot name="label">Are you sure?</slot>
    </span>
    <FmButton
      @click="confirm"
      ref="yesDelete"
      theme="danger"
    >
      <slot name="confirm">Delete</slot>
    </FmButton>
    <FmButton @click="cancel" :theme="cancelTheme">
      <slot name="confirm">Cancel</slot>
    </FmButton>
  </span>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'link',
    },
    cancelTheme: {
      type: String,
      default: 'secondary',
    },
    float: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      confirmVisible: false,
    };
  },
  methods: {
    toggleEvent(toggle) {
      document.body[`${toggle}EventListener`]('click', this.cancelOnClick, toggle === 'add' ? false : undefined);
    },
    cancelOnClick(event) {
      const cw = this.$refs.confirmWrapper;
      let {target} = event;

      // Poor man's .closest(). Abort if target inside confirmWrapper
      for (let i = 0; i < 5; i++) {
        if (target === cw) {
          return;
        }
        target = target && target.parentNode;
      }

      this.cancel();
    },
    showConfirm() {
      this.confirmVisible = true;
      this.$nextTick(() => {
        const {$el} = this.$refs.yesDelete;

        if ($el) {
          $el.focus();
        }
      });
      setTimeout(this.toggleEvent, 50, 'add');
    },
    confirm() {
      this.toggleEvent('remove');
      this.confirmVisible = false;
      this.$emit('confirm');
    },
    cancel() {
      this.toggleEvent('remove');
      this.confirmVisible = false;
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="postcss" scoped>
.Confirm.is-float {
  position: relative;
  .Confirm-label {
    position: absolute;
    bottom: 100%;
    left: 0;
    padding: 2px;
  }
}
</style>
