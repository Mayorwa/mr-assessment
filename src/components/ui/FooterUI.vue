<template>
  <footer class=" rounded-20px shadow bg-gray-300 w-fit mx-auto">
    <div class="mx-auto w-fit p-2 md:flex md:items-center md:justify-between">
      <ul class="flex flex-wrap items-center mt-0 text-md font-medium text-black sm:mt-0">
        <li v-for="(item, index) in footerMenu" :key="index">
          <a href="#" :class="`${index === 0 ? 'mx-4': 'mr-4'} hover:underline`">{{ item }}</a>
        </li>
      </ul>
    </div>
  </footer>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "FooterUI",
  setup(){
    const footerMenu = ref(["Privacy & Terms", "Contact us", "Change region"])
    return { footerMenu }
  }
})
</script>