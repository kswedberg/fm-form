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
import FmConfirmButton from './components/fm-confirm-button.vue';
import {formFields as defaultFields} from './default-fields.js';
import {deepCopy} from './utils/deep-copy.js';

const formFields = deepCopy(defaultFields);

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

const install = function(Vue, options = {}) {
  // Avoid installing more than once
  if (install.installed) {
    return;
  }

  install.installed = true;

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
        formFields: deepCopy(this.$options.formFields || []),
      };
    },
    methods: {
      fieldsWithData(data = {}) {
        const formFields = deepCopy(this.formFields || this.$options.formFields || []);

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

  Vue.component(options.FmFormName || 'FmForm', FmForm);
  Vue.component(options.FmButtonName || 'FmButton', FmButton);
  Vue.component(options.FmConfirmButtonName || 'FmConfirmButton', FmConfirmButton);
  Vue.component(options.FmFieldName || 'FmField', FmField);
  Vue.component(options.FmFieldGroupName || 'FmFieldGroup', FmFieldGroup);
};

const FormPlugin = {
  install,
};

// Auto-install when global Vue has been loaded
let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(FormPlugin);
}

export default FormPlugin;

export {
  FmForm,
  FmButton,
  FmConfirmButton,
  FmField,
  FmFieldGroup
};
