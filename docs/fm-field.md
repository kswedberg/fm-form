### Basic Text Input

```vue
<template>
  <FmField
    v-model="field.value"
    :field="field"
  />
</template>
<script>
export default {
  data() {
    return {
      field: {
        name: 'username',
        label: 'User Name',
        value: 'Tester McTesterson',
      },
    }
  },
};
</script>
```

### Single Checkbox

```js
<template>
<div>
  <FmField
    @change="onChange"
    :field="field"
  />
  Am I checked? {{ field.value ? 'yes' : 'no' }}
</div>
</template>
<script>
export default {
  data() {
    return {
      field: {
        name: 'cb',
        label: 'My Checkbox',
        type: 'checkbox',
        value: true,
      },
    }
  },
  methods: {
    onChange(val) {
      console.log('val', val);
      console.log('field.value', this.field.value);
    },
  }
};
</script>
```

### Checkbox Group

```js
<template>
<div>
  <FmField
    :field="field"
    @change="onChange"
  />
  Checked: {{ field.value }}
</div>
</template>
<script>
export default {
  data() {
    return {
      field: {
        name: 'cb',
        label: 'Some Checkboxes',
        type: 'checkbox',
        multiple: true,
        strict: true,
        items: [
          'One',
          'Two',
          'Three',
        ],
        value: ['Two'],
      },
    };
  },
  methods: {
    onChange(val) {
      console.log('onChange', val);
    }
  },
};
</script>
```
