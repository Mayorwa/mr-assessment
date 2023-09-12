<template>
  <button
    :name="name"
    class="button"
    :class="[classes]"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledBy"
    :disabled="disabled || loading || inactive"
  >
    <span class="w-full flex justify-center" v-if="loading">
      <half-circle-spinner
        :animation-duration="1000"
        :size="loaderSize"
        :color="loaderColor"
      />
    </span>

    <slot v-else></slot>
  </button>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { HalfCircleSpinner } from 'epic-spinners'
export default defineComponent({
  name: 'ButtonUI',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) =>
        [
          'primary',
          'gray',
        ].includes(value),
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value),
    },
    ariaLabel: {
      type: String,
      default: '',
    },
    ariaLabelledBy: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inactive: {
      type: Boolean,
      default: false,
    },
    withIcon: {
      type: Boolean,
      default: false,
    },
    btnClass: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * button Name
     */
    name: String,
  },
  components: { HalfCircleSpinner },
  setup(props) {
    const classes = computed(() => {
      // const style = this.handleSize()
      const size = props.size ? `btn-${props.size}` : ''
      const variant = props.variant ? `button--${props.variant}` : ''
      const inactive = props.inactive ? 'btn-inactive' : ''
      const disabled = props.disabled ? 'btn-disabled' : ''
      const loading = props.loading ? 'btn-loading' : ''
      const outline = props.variant.includes('outline') ? 'btn-dashed' : ''

      return `${size} ${variant} ${outline} ${inactive} ${disabled} ${loading} ${props.btnClass}`
    })

    const loaderSize = computed(() => {
      switch (props.size) {
        case 'default':
          return 15
        case 'large':
          return 20
        case 'small':
          return 15
        case 'medium':
          return 15
        case 'xsmall':
          return 12
        default:
          return 15
      }
    })

    const loaderColor = computed(() => {
      switch (props.variant) {
        case 'primary':
          return '#ffffff'
        default:
          return 'var(--text-20)'
      }
    })
    return { classes, loaderColor, loaderSize }
  },
  computed: {},
})
</script>
