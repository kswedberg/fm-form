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
  <div
    v-else-if="tag === 'input' || tag === 'textarea'"
    :class="[...fieldClass, field.value && 'is-filled', isFocused && 'is-focused']"
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
      v-model="field.value"
      @input="input"
      @focus="focus"
      @blur="blur"
      v-on="listeners"
      class="FormField-input"
      :id="id"
      :type="type"
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
      v-model="field.value"
      @input="input"
      @focus="focus"
      @blur="blur"
      v-on="listeners"
      class="FormField-input"
      :id="id"
      :type="type"
      v-bind="attrs"
    />
    <div v-if="field.note" :class="{'FormField-note': true, 'is-active': field.value}">
      {{ field.note }}
    </div>
    <FmPreview v-if="field.preview" :field="field" />
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
import FmPreview from './fm-preview.vue';

export default {
  name: 'FmField',
  inheritAttrs: false,
  components: {
    FmControl,
    FmFieldGroup,
    FmCheckbox,
    FmPreview,
  },
  props: {
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
      isFocused: false,
    };
  },
  computed: {
    uid() {
      // eslint-disable-next-line no-underscore-dangle
      return `fmf${this._uid}`;
    },
    tag() {
      return this.field.tag || 'input';
    },
    type() {
      return this.tag === 'input' ? this.field.type || 'text' : '';
    },
    id() {
      return this.$attrs.id || this.field.id || `${this.uid}${this.field.name}`;
    },
    heading() {
      return this.field.heading || '';
    },
    label() {
      return this.field.label || '';
    },
    preview() {
      return this.field.preview;
    },
    fieldClass() {
      const base = ['FormField'];

      ['error', 'preview'].forEach((prop) => {
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
      const {tag, type, id, label, heading, items, multiple, preview, ...attrs} = this.field;

      return attrs;
    },

    listeners() {
      const {input, ...listeners} = this.$listeners;

      return listeners;
    },
  },
  methods: {
    focus(value) {
      this.isFocused = true;
      /**
      * Focus event.  for text-ish inputs & textareas. Adds "is-focused" class to wrapper div and emits focus with event arg
      * @event focus
      * @type {object}
      */
      this.$emit('focus', value);
    },
    blur(value) {
      this.isFocused = false;
      /**
      * Blur event for text-ish inputs & textareas. Removes "is-focused" class from wrapper div and emits blur with event arg
      * @event blur
      * @type {object}
      */
      this.$emit('blur', value);
    },
    input({target}) {
      const value = /checkbox|radio/.test(target.type) ? target.checked : target.value;

      /**
       * Input event. Emits input with value
       * @event input
       * @type {string | number | boolean}
       */
      this.$emit('input', value);
    },

    change(value) {
      /**
       * Change event. Emits change with value
       * @event change
       * @type {number | string}
       */
      this.$emit('change', this.field.value);
    },
  },
};
</script>
