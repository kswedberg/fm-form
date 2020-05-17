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

### Other inputs

```vue
<template>
  <fieldset>
    <legend>Various inputs with various `type`s and `inputmode`s</legend>
    <div style="margin-bottom: 1.5em; border-bottom: 1px solid #f3f3f3;" v-for="field in fields">
      <FmField
        v-model="field.value"
        :field="field"
      >
        <div v-for="key in Object.keys(field).filter((k) => !/name|label/.test(k))">
          <strong>{{ key }}</strong>: {{ field[key] }}
        </div>
      </FmField>

    </div>
  </fieldset>
</template>
<script>
export default {
  data() {
    return {
      fields: [
        {
          name: 'fullname',
          label: 'Full Name',
          autocomplete: 'name',

        },
        {
          name: 'username',
          label: 'User Name',
          autocomplete: 'username',
          autocapitalize: 'none',
          autocorrect: 'off',
          required: true,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          inputmode: 'email',
        },
        {
          name: 'decimal',
          label: 'Decimal',
          type: 'text',
          inputmode: 'decimal',
        },
        {
          name: 'numeric',
          label: 'Numeric',
          type: 'number',
          inputmode: 'numeric',
        },
        {
          name: 'numpat',
          label: 'Number Pattern',
          type: 'text',
          pattern: '[0-9]*'
        },
        {
          name: 'onetime',
          label: 'One-time Code',
          autocomplete: 'one-time-code',
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'tel',
          inputmode: 'tel',
        },
        {
          name: 'url',
          label: 'Website',
          type: 'url',
          inputmode: 'url',
        },
        {
          name: 'search',
          label: 'Search',
          type: 'text',
          inputmode: 'search',
        }
      ],
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
