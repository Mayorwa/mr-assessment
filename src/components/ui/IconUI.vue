<template>
  <svg :width="width" :height="height" :viewBox="viewBox" class="icon">
    <use :xlink:href="`/sprite.svg#icon-${name}`"></use>
  </svg>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'IconUI',
  props: {
    name: {
      type: String,
      required: true,
    },
    viewBox: {
      type: String,
      default: '0 0 24 24',
    },
    width: {
      type: String,
      default: '12px',
    },
    height: {
      type: String,
      default: '12px',
    },
  },
})
</script>
