<template>
  <div class="page-404">
    <h1 class="mb-8">4 0h 4</h1>
    <ButtonUI
        :loading="false"
        :inactive="false"
        type="submit"
        btn-class="w-fit mx-auto"
        @click="''"
    >
      <span>Go Back Home </span>
    </ButtonUI>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ButtonUI from '@/components/ui/ButtonUI.vue'
export default defineComponent({
  name: '404Page',
  components: { ButtonUI },
})
</script>

<style scoped>
.page-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
