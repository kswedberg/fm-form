### Dropdown List

```vue
<template>
  <div>
    <FmDropdown
      v-model="field.value"
      v-bind="field"
      @change="onChange"
    />
    <div v-show="changed">Changed to {{ field.value }}!</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      waiting: null,
      changed: false,
      field: {
        name: 'people',
        label: 'People',
        value: '',
        items: [
          'Trevor Dalrymple',
          'Bobby Housekamp',
          'Daniel Wonder',
          'Sammy Fineweaver',
        ]
      },
    }
  },
  methods: {
    onChange() {
      window.clearTimeout(this.waiting);
      this.changed = true;
      this.waiting = window.setTimeout(() => this.changed = false, 3000);
    }
  }
};
</script>
```
