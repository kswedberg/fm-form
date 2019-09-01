### Dropdown List

```vue
<template>
  <FmDropdown
    v-model="field.value"
    v-bind="field"
  />
</template>
<script>
export default {
  data() {
    return {
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
};
</script>
```
