<template>
  <form
    @submit.prevent="onSubmit"
    action
  >
    <div v-if="!hideForm">
      <!-- @slot Content to display above fields from `fields` prop  -->
      <slot />
      <FmField
        v-for="field in fields"
        v-model="field.value"
        @change="$emit('change', field)"
        :key="field.name"
        :field="field"
        :error="errorFields[field.name]"
      />

      <!-- @slot Content to display below fields from `fields` prop  -->
      <slot name="afterFields" />
      <div class="FormField FormField--actions">
        <!-- @slot Place buttons here to replace the default submit button -->
        <slot name="actions">
          <FmButton
            v-if="fields.length"
            :theme="theme"
            type="submit"
            :spinning="isSending"
          >
            {{ submitText }}
          </FmButton>
        </slot>
      </div>
      <ul
        v-if="errorMessages.length"
        class="FormErrors"
      >
        <li
          v-for="error in errorMessages"
          :key="error"
        >
          {{ error }}
        </li>
      </ul>
    </div>
    <transition name="Fade">
      <div v-if="response.status === 'success' && response.message" class="FormSuccess">
        <FmButton @click="response = {}" mode="character">&times;</FmButton>
        {{ response.message }}
      </div>
    </transition>
  </form>
</template>

<script>
/**
* @example ../../docs/fm-form.md
 */
import {getAxiosErrorData} from '../utils/axios.js';

export default {
  name: 'FmForm',
  props: {
    fields: {
      type: Array,
      default: () => {
        return [];
      },
    },
    theme: {
      type: String,
      default: 'primary',
    },
    dispatch: {
      type: String,
      default: 'post',
    },
    api: {
      type: String,
      required: true,
    },
    submitText: {
      type: String,
      default: 'Submit',
    },
    hide: {
      type: Boolean,
      default: false,
    },
    hideOnSuccess: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      response: {},
      isSending: false,
    };
  },
  computed: {
    hideForm() {
      return this.hide || (this.hideOnSuccess && this.response.status === 'success');
    },
    errors() {
      return this.response && this.response.errors || [];
    },
    errorFields() {
      return this.errors.reduce((obj, item) => {
        return !item.param ? obj : Object.assign(obj, {[item.param]: true});
      }, {});
    },
    errorMessages() {
      const badPwd = this.errors.find((err) => err.param === 'password');

      if (badPwd) {
        return ['Either the email or the password was entered incorrectly'];
      }

      return this.errors.map((item) => {
        if (item.param) {
          return `${item.param}: ${item.msg}`;
        }

        return item.msg;
      });
    },
  },

  methods: {
    // Need to use getFieldData method on submit instead of a computed property
    // because some field values do not update the computed property (like in a <select> for example)
    // Not sure why. Might have to do with v-model (on change instead of on input) and/or nested properties
    getFieldData() {
      return this.fields.reduce((obj, curr) => {
        obj[curr.name] = curr.value;

        return obj;
      }, {});
    },
    onSubmit(event) {
      const {submit} = this.$listeners;
      const {fields} = this;
      const formFieldData = this.getFieldData();

      if (typeof submit === 'function') {
        this.response = submit({event, fields, formFieldData});

        return this.response;
      }

      if (!this.dispatch) {
        return;
      }

      this.response = {};
      this.success = '';
      this.isSending = true;
      const dataKey = ['get', 'delete'].includes(this.dispatch) ? 'params' : 'formData';

      return this.$store
      .dispatch(this.dispatch, {api: this.api, [dataKey]: formFieldData})
      .then((data) => {
        this.isSending = false;
        this.response = data;

        return this.$emit('success', data, formFieldData);
      })
      .catch((err) => {
        this.isSending = false;
        this.response = getAxiosErrorData(err);
        this.$emit('error', this.response, formFieldData);
      });
    },
  },
};
</script>
