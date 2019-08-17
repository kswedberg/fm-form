<template>
  <div class="FormField--checkbox">
    <input
      @change="change"
      :id="id"
      :checked="field.value"
      type="checkbox"
      :value="field.name"
    >
    <label
      v-if="field.label"
      class="FormField-label"
      :for="id"
    >
      {{ field.label }}
    </label>
  </div>
</template>

<script>

export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
    field: {
      type: Object,
      default() {
        return {value: false};
      },
    },
  },

  methods: {
    change({target}) {
      this.field.value = target.checked;
      this.$emit('change', target.checked);
    },
  },
};
</script>
