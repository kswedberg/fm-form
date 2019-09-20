<template>
  <div @keydown.tab="tabKeyPressed = true" @blur.capture="onBlur" class="FormField FormField--select">
    <span @click="showOptions" :id="`${uid}-label`" class="FormField-label Label">{{ label }}</span>
    <div class="Select">
      <button
        @click="toggleOptions"
        @keydown="search"
        @keyup.up.exact.prevent.stop="selectOption($event, 'prev')"
        @keyup.down.exact.prevent.stop="selectOption($event, 'next')"
        @keydown.up.down.prevent.stop
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
      <transition name="SelectFade">
        <ul
          v-show="optionsVisible"
          @focus="setupFocus"
          @keyup.up.prevent.stop="selectOption($event, 'prev')"
          @keyup.down.prevent.stop="selectOption($event, 'next')"
          @keydown="search"
          @keydown.up.down.prevent.stop
          @keydown.esc.prevent="reset"
          @keydown.enter.prevent="selectFocusedOption"
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
              'is-active': activeOptionIndex === -1
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
              'is-active': activeOptionIndex === index
            }"
            class="Select-option"
            :style="option.styles"
            role="option"
          >
            {{ option.text }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import ArrowDownIcon from '../icons/arrow-down.vue';

let resetKeysSoFarTimer;

export default {
  name: 'FmDropdown',
  inheritAttrs: false,
  components: {
    ArrowDownIcon,
  },
  model: {
    event: 'change',
  },
  props: {
    label: {
      type: String,
      required: true,
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
    value: {
      type: [String, Number],
      default: '',
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
    activeText() {
      return this.labels[this.activeOptionIndex];
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
      if (!this.items[index]) {
        return;
      }

      const activeItem = this.$refs.option[index];

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
      this.$emit('change', '');
      this.reset();
    },
    async onOptionClick(option) {
      const index = this.values.findIndex((item) => item === option.value);

      this.focusIndex = index;
      await this.$nextTick();
      this.$emit('change', option.value);
      this.reset();
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
    async reset() {
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

    selectFocusedOption() {
      const value = this.focusIndex === -1 ? '' : this.values[this.focusIndex];

      /**
       * Change event. Emits change with value
       * @type {string}
       */
      this.$emit('change', value);
      this.reset();
    },

    selectOption(event, direction) {

      this.focusIndex = this[`${direction}FocusIndex`];
      if (!this.optionsVisible) {
        const index = this[`${direction}OptionIndex`];
        const value = index === -1 ? '' : this.values[index];

        this.$emit('change', value);
      }
    },
    search(event) {
      clearTimeout(resetKeysSoFarTimer);
      // No alphanumeric key was pressed.
      if (event.key.length > 1) {
        return;
      }

      resetKeysSoFarTimer = setTimeout(() => {
        this.keysSoFar = '';
      }, 500);

      this.keysSoFar += event.key;
      const matchingOption = this.lowerValues.find((val) => val.startsWith(this.keysSoFar));

      if (!matchingOption) {
        return;
      }

      this.$emit('change', matchingOption);
    },
  },
};
</script>
