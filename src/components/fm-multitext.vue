<template>
  <div :class="containerClass">
    <h3 v-if="field.heading || (field.tag !== 'select' && field.label)">{{ field.heading || field.label }}</h3>
    <div v-if="field.note" class="FormField-note is-active">
      {{ field.note }}
    </div>

    <div class="FieldGroup-inner">
      <ol class="list-decimal">
        <li
          v-for="(item, i) in items"
          :class="fieldClass"
          :key="uid + field.name + i"
        >
          <label :for="`${uid}${field.name}${i}`">
            <span class="sr-only">{{ i + 1 }}</span>
          </label>

          <input
            v-model="item.value"
            @change="change"
            @input="input(i, item.value)"
            v-on="listeners"
            :ref="`item${i}`"
            v-bind="attrs"
            :type="field.type"
            :id="`${uid}${field.name}${i}`"
            :name="name"
          >
          <FmButton @click="add(i)" mode="character">+</FmButton>
          <FmButton v-if="field.value.length > 1 || item.value" @click="remove(i)" mode="character">-</FmButton>
        </li>
      </ol>
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
    max() {
      return this.field.max || 99999;
    },
    uid() {
      // eslint-disable-next-line no-underscore-dangle
      return `fmmt${this._uid}`;
    },
    type() {
      return this.field.type || '';
    },
    name() {
      return this.field.value.length > 1 ? `${this.field.name}[]` : this.field.name;
    },
    value() {
      return this.field.value;
    },
    items() {
      const items = Array.isArray(this.field.value) ? this.field.value : [];

      return [...items].map((item) => {

        return {
          value: item,
          text: item,
        };
      });
    },
    containerClass() {
      const baseClass = this.type.charAt(0).toUpperCase() + this.type.slice(1);
      const suffix = ['s', 'x', 'z'].includes(baseClass.slice(-1)) ? 'es' : 's';

      return baseClass + suffix;
    },
    fieldClass() {
      return 'FormField FormField--multitext';
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
  mounted() {
    this.addEmpty();
  },
  methods: {
    addEmpty() {
      if (!this.field.value.length) {
        this.field.value = [''];
      }
    },
    async add(i) {
      this.field.value.splice(i + 1, 0, '');
      await this.$nextTick();
      const newInput = this.$refs[`item${i + 1}`][0];

      if (newInput) {
        newInput.focus();
      }
    },
    remove(i) {
      this.field.value.splice(i, 1);
      this.addEmpty();
    },
    input(i, value) {
      this.field.value[i] = value;
      this.field.value = [...this.field.value];
      // this.$emit('input', {target: {value: this.field.value}});
    },
    change(event) {
      const {value} = this.field;

      this.$emit('change', value);
    },
  },
};
</script>
