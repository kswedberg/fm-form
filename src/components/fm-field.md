### Basic Input

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
        value: '223',
      },
    }
  },
};
</script>
```
