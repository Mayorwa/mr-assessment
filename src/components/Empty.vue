<template>
  <div class="empty">
    <div class="empty__icon" :class="customClasses">
      <slot v-if="customIcon" name="icon" />
      <img v-else src="@/assets/img/empty.svg" alt="empty state" />
    </div>
    <h2 class="empty__heading">{{ heading }}</h2>
    <p class="empty__sub-heading" v-if="showInfo">{{ subHeading }}</p>
    <div class="empty__cta">
      <slot name="cta" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'EmptyState',
  props: {
    info: { type: String },
    subInfo: { type: String },
    showInfo: { type: Boolean, default: true },
    customClasses: { type: String },
  },
  computed: {
    customIcon() {
      return this.$slots.icon
    },
    heading() {
      return this.info ? this.info : 'No result'
    },

    subHeading() {
      return this.subInfo
        ? this.subInfo
        : 'Your records will be displayed here once you have them.'
    },
  },
})
</script>
