<template lang="html">
  <FmFieldGroup
    v-if="field.items"
    v-on="listeners"
    :class="fieldClass"
    :field="field"
  />
  <FmCheckbox
    v-else-if="type === 'checkbox'"
    v-on="listeners"
    :id="id"
    :label="label"
    :class="fieldClass"
    :field="field"
  />
  <FmEditor
    v-else-if="tag === 'editor'"
    v-model="field.value"
    :field="field"
    :class="fieldClass"
    :label="label"
  />
  <div
    v-else-if="tag === 'input' || tag === 'textarea'"
    :class="[...fieldClass, value && 'is-filled', isFocused && 'is-focused']"
  >
    <h3 v-if="heading" class="FormField-heading">
      {{ heading }}
    </h3>
    <label
      v-if="label && !/radio|hidden/.test(type)"
      class="FormField-label"
      :for="id"
    >
      {{ label }}
    </label>

    <input
      v-if="tag == 'input'"
      @input="input"
      @focus="focus"
      @blur="blur"
      v-on="listeners"
      class="FormField-input"
      :id="id"
      :type="type"
      :value="value"
      v-bind="attrs"
    >
    <label
      v-if="label && type === 'radio'"
      class="FormField-label"
      :for="id"
    >
      {{ label }}
    </label>
    <textarea
      v-if="tag == 'textarea'"
      @input="input"
      @focus="focus"
      @blur="blur"
      v-on="listeners"
      class="FormField-input"
      :id="id"
      :type="type"
      :value="value"
      v-bind="attrs"
    />
    <div v-if="field.note" :class="{'FormField-note': true, 'is-active': value}">
      {{ field.note }}
    </div>
  </div>
  <FmControl
    v-else
    :class="fieldClass"
    :field="{tag, id, label, attrs}"
  />
</template>
<script>
/**
* Your all-in-one form field component
* @example ../../docs/fm-field.md
*/
import FmFieldGroup from './fm-field-group.vue';
import FmCheckbox from './fm-checkbox.vue';
import FmControl from './fm-control.js';

export default {
  name: 'FmField',
  components: {
    FmControl,
    FmFieldGroup,
    FmCheckbox,
  },
  props: {
    wide: Boolean,
    value: [String, Array, Number, Boolean],
    field: {
      type: Object,
      required: true,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      radio: '',
      editorContent: '',
      isFocused: false,
    };
  },
  computed: {
    tag() {
      return this.field.tag || 'input';
    },
    type() {
      return this.tag === 'input' ? this.field.type || 'text' : '';
    },
    id() {
      return this.$attrs.id || this.field.id || `${this.tag}${this.field.name}${this.type}`;
    },
    heading() {
      return this.field.heading || '';
    },
    label() {
      return this.field.label || '';
    },
    fieldClass() {
      const base = ['FormField'];

      ['error', 'wide', 'mini'].forEach((prop) => {
        if (this[prop]) {
          base.push(`FormField--${prop}`);
        }
      });

      if (/radio|checkbox/.test(this.type)) {
        return base.join(' ');
      }

      if (this.tag === 'input') {
        base.push('FormField--text');

        if (this.type !== 'text') {
          base.push(`FormField--${this.type}`);
        }
      } else {
        base.push(`FormField--${this.tag}`);
      }

      return base;
    },

    attrs() {
      const {tag, type, id, label, heading, items, multiple, ...attrs} = this.field;

      return attrs;
    },

    listeners() {
      const {input, ...listeners} = this.$listeners;

      return listeners;
    },
  },
  created() {
    this.editorContent = this.value;
  },
  methods: {

    focus(value) {
      this.isFocused = true;
      this.$emit('focus', value);
    },
    blur(value) {
      this.isFocused = false;
      this.$emit('blur', value);
    },
    input({target}) {
      const value = /checkbox|radio/.test(target.type) ? target.checked : target.value;

      this.$emit('input', value);
    },
    change(value) {
      this.$emit('change', value);
    },
  },
};
</script>
