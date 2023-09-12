<template>
  <div>
    <HeaderUI />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useAuth } from '@/store/auth/UseAuth.js'
import HeaderUI from "@/components/page/dashboard/HeaderUI.vue";
export default defineComponent({
  name: 'LayoutDashboard',
  components: {HeaderUI},
  setup() {
    const auth = useAuth()

    const loading = computed(() => {
      return auth.isUserLoading
    })

    const loadingError = computed(() => {
      return auth.isUserError
    })

    return { loading, loadingError }
  },
})
</script>
