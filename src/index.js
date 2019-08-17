/* eslint-disable vue/match-component-file-name */
/*
 * See bottom of file for
 * exporting for Vue vs. Nuxt
 */

import Vue from 'vue';
import FmField from './components/fm-field.vue';
import FmFieldGroup from './components/fm-field-group.vue';
import FmForm from './components/fm-form.vue';
import FmButton from './components/fm-button.vue';
import ConfirmButton from './components/confirm-button.vue';
import {formFields as $formFields} from './default-fields.js';

const formFields = [...$formFields];

const merge = function(defaults, fromVal) {
  if (!(defaults && fromVal)) {
    return [];
  }

  const merged = fromVal.map((item) => {
    const name = typeof item === 'string' ? item : item.name;
    const defaultItem = formFields.find((d) => d.name === name);

    if (!defaultItem) {
      return typeof item === 'string' ? {name} : item;
    }

    return typeof item === 'string' ? defaultItem : Object.assign({}, defaultItem, item);
  });

  return merged;
};

Vue.config.optionMergeStrategies.formFields = merge;

const copyFields = (fields = []) => {
  return [...fields].map((field) => Object.assign({}, field));
};
const FormPlugin = {
  install(Vue, options = {}) {

    // Global default overrides
    (options.formFields || []).forEach((opt) => {
      if (!opt.name) {
        return;
      }

      const defaultField = formFields.find((field) => field.name === opt.name);

      if (defaultField) {
        Object.assign(defaultField, opt);
      } else {
        formFields.push(opt);
      }
    });

    Vue.mixin({
      formFields: formFields,
      data() {
        return {
          formFields: copyFields(this.$options.formFields),
        };
      },
      methods: {
        fieldsWithData(data = {}) {
          const formFields = copyFields(this.formFields || this.$options.formFields);

          return formFields.map((item) => {
            let value = data[item.name];

            if (typeof value === 'undefined') {
              if (item.multiple) {
                value = [];
              } else {
                value = item.type === 'checkbox' ? false : '';
              }
            }

            if (item.items && !item.items.length) {
              item.items = this[item.name] || [];
            }

            return Object.assign(item, {value});
          });
        },
      },
    });

    Vue.component('FmForm', FmForm);
    Vue.component('FmButton', FmButton);
    Vue.component('ConfirmButton', ConfirmButton);
    Vue.component('FmField', FmField);
    Vue.component('FmFieldGroup', FmFieldGroup);
  },
};

// For plain Vue:
// export default formFieldsPlugin;

// For use in Nuxt:
export default () => {
  Vue.use(FormPlugin);
};
