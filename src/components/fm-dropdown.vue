<template>
  <div @keydown.tab="tabKeyPressed = true" @blur.capture="onBlur" class="FormField FormField--select">
    <span
      v-if="label"
      @click="showOptions"
      :id="`${uid}-label`"
      class="FormField-label Label"
    >
      {{ label }}
    </span>
    <div class="Select">
      <button
        @click="toggleOptions"
        @keydown="search"
        @keydown.up.down.prevent.stop
        @keyup.up.exact.prevent.stop="selectPrevOption"
        @keyup.down.exact.prevent.stop="selectNextOption"
        ref="button"
        :id="`${uid}-button`"
        aria-haspopup="listbox"
        :aria-labelledby="`${uid}-label ${uid}-button`"
        :aria-expanded="optionsVisible"
        class="Select-button"
      >
        <span v-if="value">{{ activeText }}</span>
        <span v-if="!value" class="Select-placeholder">{{ placeholder }}</span>
        <ArrowDownIcon
          class="Select-icon"
          :class="{ 'is-rotated180': optionsVisible }"
        />
      </button>
      <!-- Focus trap for iOS keyboard navigation. -->
      <input
        v-if="!tabKeyPressed"
        @focus="handleFocusTrap"
        aria-hidden="true"
        class="u-visuallyHidden"
      >
      <ul
        v-show="optionsVisible"
        @focus="setupFocus"
        @keyup.up.prevent.stop="selectPrevOption"
        @keyup.down.prevent.stop="selectNextOption"
        @keydown="search"
        @keydown.up.down.prevent.stop
        @keydown.esc.prevent="reset"
        @keydown.enter.prevent="selectFocusedOption"
        @keydown.space.prevent="selectFocusedOption"
        @wheel.stop
        ref="options"
        tabindex="-1"
        role="listbox"
        :aria-labelledby="`${uid}-label`"
        :aria-activedescendant="activeDescendant"
        class="Select-options"
      >
        <li
          v-if="placeholder && !excludePlaceholderFromList"
          @click="onPlaceholderClick"
          :aria-selected="activeOptionIndex === -1"
          :class="{
            'has-focus': focusIndex === -1,
            'is-active': !multiple && activeOptionIndex === -1
          }"
          class="Select-option"
        >
          {{ placeholder }}
        </li>
        <li
          v-for="(option, index) in options"
          @click="onOptionClick(option)"
          :key="option.text"
          ref="option"
          :id="`${uid}-option-${index}`"
          :aria-selected="activeOptionIndex === index"
          :class="{
            'has-focus': focusIndex === index,
            'is-active': !multiple && activeOptionIndex === index
          }"
          class="Select-option"
          :style="option.styles"
          role="option"
        >
          <span v-if="multiple" :class="{'Select-cb': true, 'is-chosen': value.includes(option.value)}">
            {{ option.text }}
          </span>
          <template v-else>
            {{ option.text }}
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ArrowDownIcon from '../icons/arrow-down.vue';

let resetKeysSoFarTimer;

export default {
  name: 'FmDropdown',
  components: {
    ArrowDownIcon,
  },
  model: {
    event: 'change',
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    excludePlaceholderFromList: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Array],
      default() {
        return this.multiple ? [] : '';
      },
    },
  },
  data() {
    return {
      keysSoFar: '',
      tabKeyPressed: false,
      optionsVisible: false,
      focusIndex: -1,
    };
  },
  computed: {
    uid() {
      // eslint-disable-next-line no-underscore-dangle
      return `fms${this._uid}`;
    },
    options() {
      return this.items.map((opt) => {
        return typeof opt === 'object' ? {
          value: opt.value,
          text: opt.text || opt.label,
          styles: opt.styles,
        } : {
          value: opt,
          text: opt,
        };
      });
    },
    values() {
      return this.options.map((opt) => {
        return opt.value || '';
      });
    },
    lowerValues() {
      return this.values.map((val) => val.toLowerCase());
    },
    labels() {
      return this.options.map((opt) => {
        return opt.text;
      });
    },
    chosenLabels() {
      return this.placeholder && !this.excludePlaceholderFromList && !this.value.length ?
        this.placeholder :
        `${this.value.length} selected`;
      // this.options
      // .filter(({value}) => this.value.includes(value))
      // .map(({text}) => text)
      // .join(', ');
    },

    activeText() {
      return this.multiple ? this.chosenLabels : this.labels[this.activeOptionIndex];
    },
    activeOptionIndex() {
      return this.values.findIndex((val) => val === this.value);
    },
    lowestFocus() {
      return this.placeholder && !this.excludePlaceholderFromList ? -1 : 0;
    },
    prevOptionIndex() {
      const prev = this.activeOptionIndex - 1;

      return prev >= this.lowestFocus ? prev : this.options.length - 1;
    },
    nextOptionIndex() {
      const next = this.activeOptionIndex + 1;

      return next <= this.options.length - 1 ? next : this.lowestFocus;
    },
    prevFocusIndex() {
      return this.focusIndex > this.lowestFocus ? this.focusIndex - 1 : this.options.length - 1;
    },
    nextFocusIndex() {
      return this.focusIndex < this.options.length - 1 ? this.focusIndex + 1 : this.lowestFocus;
    },

    activeDescendant() {
      return `${this.uid}-option-${this.activeOptionIndex}`;
    },
  },
  watch: {
    focusIndex(index, oldindex) {
      if (index > -1 && !this.items[index]) {
        return;
      }

      const activeItem = this.$refs.option[index] || this.$refs.option[0];

      if (activeItem && (activeItem.nodeName || activeItem.$el)) {
        this.$refs.options.scrollTop = activeItem.offsetTop - activeItem.clientHeight;
      }
    },
  },
  methods: {
    handleFocusTrap() {
      this.optionsVisible = true;
      this.$refs.button.focus();
    },
    onPlaceholderClick() {
      this.$emit('change', this.multiple ? [] : '');
      this.reset();
    },
    async onOptionClick(option) {
      const index = this.values.findIndex((item) => item === option.value);

      this.focusIndex = index;
      await this.$nextTick();
      this.updateValue();
    },
    onBlur(event) {
      if (this.$el.contains(event.relatedTarget)) {
        return;
      }
      this.hideOptions();
    },
    toggleOptions() {
      this[this.optionsVisible ? 'hideOptions' : 'showOptions']();
    },
    async showOptions() {
      this.optionsVisible = true;
      await this.$nextTick();
      this.$refs.options.focus();
    },
    hideOptions() {
      this.optionsVisible = false;
    },
    async reset(resetValue) {
      this.hideOptions();
      await this.$nextTick();
      this.$refs.button.focus();
    },
    setupFocus() {
      // if (this.value) {
      //   return;
      // }
      // this.$emit('change', this.values[0]);
    },

    // VALUE UPDATE METHODS:
    updateSingleValue(skipReset) {
      const value = this.focusIndex === -1 ? '' : this.values[this.focusIndex];

      this.$emit('change', value);
      if (!skipReset) {
        this.reset();
      }
    },
    updateMultipleValue(skipReset) {
      if (this.focusIndex === -1) {
        return this.$emit('change', []);
      }

      const newValue = this.values[this.focusIndex];
      const values = [...this.value];
      const index = values.indexOf(newValue);

      if (index === -1) {
        values.push(newValue);
      } else {
        values.splice(index, 1);
      }

      this.$emit('change', values);
      if (!skipReset) {
        this.reset();
      }
    },
    updateValue(skipReset) {
      return this.multiple ? this.updateMultipleValue(skipReset) : this.updateSingleValue(skipReset);
    },
    // ↑↑ Value update methods ↑↑

    selectFocusedOption(event) {
      this.updateValue();
    },
    selectPrevOption() {

      if (this.multiple && !this.optionsVisible) {
        return;
      }
      this.focusIndex = this.prevFocusIndex;
      if (!this.optionsVisible) {
        const value = this.prevOptionsIndex === -1 ? '' : this.values[this.prevOptionIndex];

        this.$emit('change', value);
      }
    },

    selectNextOption() {
      if (this.multiple && !this.optionsVisible) {
        return this.showOptions();
      }
      this.focusIndex = this.nextFocusIndex;
      if (!this.optionsVisible) {
        const value = this.nextOptionIndex === -1 ? '' : this.values[this.nextOptionIndex];

        this.$emit('change', value);
      }
    },
    search(event) {
      clearTimeout(resetKeysSoFarTimer);
      const {metaKey, altKey, ctrlKey} = event;

      // No alphanumeric key was pressed.
      if (metaKey || altKey || ctrlKey || event.key.length > 1) {
        return;
      }


      resetKeysSoFarTimer = setTimeout(() => {
        this.keysSoFar = '';
      }, 500);

      this.keysSoFar += event.key;
      const prevIndex = this.focusIndex;
      const matchingIndex = this.lowerValues.findIndex((val) => val.startsWith(this.keysSoFar));

      // on key presses, ensure the matching index is visible
      // (focusIndex watcher positions it with scrollTop)
      this.focusIndex = matchingIndex < this.lowestFocus ? this.lowestFocus : matchingIndex;

      if (prevIndex === this.focusIndex) {
        return;
      }

      this.updateValue('skipreset');
      // this.$emit('change', this.values[matchingIndex]);
    },
  },
};
</script>
