<template >
  <div class="Main" >
    <n-space vertical  >
    <!-- <n-space><n-switch v-model:value="inverted" />inverted</n-space> -->
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="transform"
        :collapsed-width="0"
        :width="240"
        show-trigger
        class="Content"
      >
        <SideMenu v-model:QuestionObj="QuestionObj"></SideMenu>  
      </n-layout-sider>
      <n-layout class="Content">
        <n-scrollbar>
          <RouterView :NewPermissions="props.NewPermissions" v-model:QuestionObj="QuestionObj"></RouterView>
        </n-scrollbar>
      </n-layout>
    </n-layout>
  </n-space>
  </div>  
</template>

<script setup>
import SideMenu from '@/components/test/SideMenu.vue';
import { ref, onBeforeUnmount, onMounted } from 'vue';
 

const QuestionObj= ref([])
const props = defineProps(['NewPermissions']);
// console.log(props.NewPermissions)

onMounted(() => {
  const storedQuestionObj = localStorage.getItem('QuestionObj');
  if (storedQuestionObj !== null || storedQuestionObj !== undefined) {
    QuestionObj.value = JSON.parse(storedQuestionObj);
  }
});

onBeforeUnmount(() => {
  localStorage.setItem('QuestionObj', JSON.stringify(QuestionObj.value));
});
</script>

<style scoped>

</style>

