<template>
  <div class="FormField--checkbox">
    <input
      @change="change"
      :id="id"
      :checked="field.value"
      type="checkbox"
      :value="field.name"
    >
    <FmLabel
      v-if="field.label"
      class="FormField-label"
      :for="id"
      :required="required"
    >
      {{ field.label }}
    </FmLabel>
  </div>
</template>

<script>
import FmLabel from './fm-label.vue';

export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  components: {
    FmLabel,
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
    required: {
      type: Boolean,
      default: false,
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
