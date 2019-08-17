<template lang="html">
  <div :class="containerClass">
    <h3 v-if="field.heading || (field.tag !== 'select' && field.label)">{{ field.heading || field.label }}</h3>
    <div v-if="field.note" class="FormField-note is-active">
      {{ field.note }}
    </div>
    <div
      v-if="field.tag == 'select'"
      key="select"
      :class="fieldClass"
    >
      <label class="FormField-label" :for="field.name">{{ field.heading || field.label }}</label>
      <select
        v-model="field.value"
        v-on="listeners"
        v-bind="attrs"
        :multiple="multiple"
        :id="field.name"
      >
        <option value="">Choose one…</option>
        <option
          v-for="(item, i) in items"
          :key="field.name + i"
          :value="item.value"
        >
          {{ item.text }}
        </option>
      </select>
    </div>
    <div v-else class="FieldGroup-inner">
      <div
        v-for="(item, i) in items"
        :class="fieldClass"
        :key="field.name + field.value + i"
      >
        <input
          v-model="field.value"
          v-on="listeners"
          v-bind="attrs"
          :type="field.type"
          :id="field.name + i"
          :name="name"
          :value="item.value"
        >
        <label :for="field.name + i">{{ item.label }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  computed: {
    type() {
      return this.field.type || this.field.tag || '';
    },
    name() {
      return this.type === 'checkbox' && this.items.length > 1 ? `${this.field.name}[]` : this.field.name;
    },
    multiple() {
      return this.field.multiple;
    },
    items() {
      const items = Array.isArray(this.field.items) ? this.field.items : [];

      return items.map((item) => {
        if (typeof item === 'string') {
          return {
            value: item,
            text: item,
            label: item,
          };
        }

        const label = item.label || item.value;
        const text = item.text || item.label || item.value;

        return {
          value: item.value,
          text,
          label,
        };
      });
    },
    containerClass() {
      const baseClass = this.type.charAt(0).toUpperCase() + this.type.slice(1);
      const suffix = ['s', 'x', 'z'].includes(baseClass.slice(-1)) ? 'es' : 's';

      return baseClass + suffix;
    },
    fieldClass() {
      return `FormField FormField--${this.type}`;
    },
    attrs() {
      const {multiple, tag, items, type, id, label, heading, model, ...attrs} = this.field;

      return attrs;
    },

    listeners() {
      const {input, change, ...listeners} = this.$listeners;

      return listeners;
    },
  },
  methods: {

  },
};
</script>

<style lang="postcss">
.Checkboxes,
.Radios {
  h3 {
    font-size: 1em;
  }
}
.Checkboxes {
  margin-bottom: 1.5em;

  .FormField--checkbox {
    margin-bottom: 4px;
  }
}
</style>
