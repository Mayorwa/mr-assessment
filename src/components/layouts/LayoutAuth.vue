<template>
  <section class="auth-screen">
    <div class="flex flex-col items-center justify-center px-6 py-8 auth-screen--body mx-auto lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-28 mr-2" src="@/assets/img/logo.svg" alt="logo">
      </a>
      <div class="w-full bg-white rounded-2xl md:mt-0 max-w-xl xl:p-0">
        <router-view/>
      </div>
    </div>
    <FooterUI/>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import ButtonUI from "@/components/ui/ButtonUI.vue";
import FooterUI from "@/components/ui/FooterUI.vue";
export default defineComponent({
  name: 'LayoutAuth',
  components: { ButtonUI, FooterUI}
})
</script>
<style lang="scss">
.auth-screen{
  background-image: url("@/assets/img/bg.svg") !important;
  padding: 0 30px;
  height: 100vh;
  &--body{
    height: calc(100% - 60px);
  }
}
</style>
