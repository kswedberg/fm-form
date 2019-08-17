export default {
  props: [
    {
      field: {
        type: Object,
      },
      id: {
        type: String,
      },
    },
  ],
  components: {

  },
  computed: {
    attrs() {
      const {tag, id} = this.field;

      let baseClass = `FormField-${tag}`;

      if (tag === 'button') {
        baseClass += ' Button';
      }

      if (this.field.class) {
        baseClass += ` ${this.field.class}`;
      }

      return Object.assign({}, this.field.attrs || {}, {
        id,
        class: baseClass,
      });
    },
  },
  render(h) {
    const {tag, label} = this.field;

    return h(tag, this.attrs, label);
  },
};
