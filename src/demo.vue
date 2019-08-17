<template>
  <div class="u-flex Testform">
    <div class="Grid-cell">
      <h2>FmForm</h2>
      <FmForm @submit="fakeSubmit" :fields="formFields" api="test" />
    </div>
    <div class="Grid-cell">
      <h4>Values</h4>
      <pre>{{ fieldValues | json(2)}}</pre>
    </div>
  </div>
</template>

<script>
export default {
  formFields: [
    {
      name: 'username',
      value: 'Tester McTesterson',
    },
    {
      name: 'email',
      value: 'test@example.com',
    },
    'password',
    {
      name: 'singlecheckbox',
      type: 'checkbox',
      label: 'Single Checkbox',
      value: true,
    },
    {
      name: 'multicheckboxes',
      type: 'checkbox',
      heading: 'Multiple Checkboxes',
      value: ['two'],
      items: [
        'one',
        'two',
        'three',
      ],
    },
    {
      name: 'radio',
      type: 'radio',
      heading: 'Radio Buttons',
      value: 'silence',
      required: true,
      items: ['1', '2', 'silence'],
    },
    {
      name: 'zelect',
      tag: 'select',
      label: 'My Select',
      placeholder: 'choose one or not…',
      items: [
        'i love options',
        {value: 'espwithval haha', text: 'especially with diff values'},
      ],

    },
  ],
  computed: {
    fieldValues() {
      return this.formFields.reduce((obj, curr) => {
        obj[curr.name] = curr.value;

        return obj;
      }, {});
    },
  },
  methods: {
    fakeSubmit(response) {
      Object.keys(response).forEach((item) => {
        console.log(item, response[item]);
      });

      return {status: 'success', message: 'Successfully fake submitted the form! Check console to see what would have gone in body'};
    },
  },
};
</script>

<style lang="postcss" scoped>
.Testform {
  border-bottom: 1px solid #e7e7e7;
}
.Grid-cell {
  flex-basis: 10em;
  flex-grow: 1;
}
</style>
