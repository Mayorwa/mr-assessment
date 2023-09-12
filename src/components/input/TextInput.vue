<template>
  <input
      class="bg-gray-100 border border-gray-80 border-solid rounded-lg block w-full p-2.5"
      :type="type"
      v-bind="$attrs"
      v-model="value"
      :placeholder="placeholder"
      :readonly="readonly"
  />
</template>
<script>
export default {
  name: 'TextInput',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: value =>
          ['text', 'email', 'password', 'url', 'number', 'date'].includes(value),
    },
    /**
     * input placeholder
     */
    placeholder: String,
    /**
     * ClassNames for input
     */
    inputClasses: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: '',
    }
  },
}
</script>
