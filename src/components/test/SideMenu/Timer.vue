<template>
  <div class="container">
      <n-space>
        <span class="countdown-text" >
          <n-countdown :duration="900000" :active="active" />
        </span>
        <!-- <n-switch v-model:value="active" /> -->
      </n-space>
  </div>
</template>
 
  <script>
  import { defineComponent, ref } from "vue";
  
  export default defineComponent({
    setup() {
      return {
        active: ref(false)
      };
    }
  });
  </script>

<style>
 
</style>