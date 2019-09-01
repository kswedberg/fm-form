<template>
  <div class="Preview">
    <div>
      <FmButton @click="showPreview = !showPreview" theme="link">Preview</FmButton>
    </div>
    <div v-if="showPreview" v-html="field.value" :class="['RichText']"/>
  </div>
</template>

<script>
import FmButton from './fm-button.vue';

export default {
  components: {
    FmButton,
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showPreview: false,
    };
  },
};
</script>
