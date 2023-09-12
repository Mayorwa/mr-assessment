<template>
  <div class="rounded-md p-2 mb-4" :class="getClassNameWithType()[0]">
    <div class="d-flex align-items-center">
      <div class="ms-3">
        <slot/>
      </div>
      <div class="ms-auto ps-3" v-if="cancelButton">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            class="d-inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="getClassNameWithType()"
          >
            <span class="sr-only">Dismiss</span>
            <svg class="icon" width="24px" height="24px" viewBox="0 0 24 24">
              <use xlink:href="/sprite.svg#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import IconUI from '@/components/ui/IconUI.vue'
export default defineComponent({
  name: 'FeedBackUI',
  components: { IconUI },
  props: {
    type: {
      type: String,
      default: 'success',
      validator: (value) =>
        ['success', 'info', 'error', 'warning'].indexOf(value) !== -1,
    },
    cancelButton: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const getClassNameWithType = () => {
      const { type } = props
      if (type === 'success') {
        return ['bg-green-200', 'text-light-success']
      } else if (type === 'error') {
        return ['bg-red-200', 'text-light-danger']
      } else if (type === 'warning') {
        return ['bg-yellow-200', 'text-light-danger']
      } else {
        return ['bg-blue-200', 'text-light-danger']
      }
    }
    return { getClassNameWithType }
  },
})
</script>
