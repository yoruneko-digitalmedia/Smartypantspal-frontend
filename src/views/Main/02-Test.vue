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
        <SideMenu v-model:question_value="value"></SideMenu>  
      </n-layout-sider>
      <n-layout class="Content">
        <n-scrollbar>
            <RouterView v-model:question_value="value"></RouterView>
        </n-scrollbar>
      </n-layout>
    </n-layout>
  </n-space>
  </div>  
</template>

<script setup>
import SideMenu from '@/components/test/SideMenu.vue';
import { ref, onMounted, watchEffect } from 'vue';

// const value= ref({
//   id: null, // 题目的唯一标识符，具体值应在添加题目时确定
//   question_title: '', // 题目的标题或文本
//   degree: '', // 题目的难度等级，可能的值为 'easy', 'median', 'hard'
//   question_type: '', // 题目的类型，可能的值为 'radio' (选择题), 'text' (简答题)
//   options: [], // 仅对选择题有效，包含题目的所有选项
//   // 对于简答题，可以添加一个 'value' 字段来存储用户的答案
//   value: '', // 用户的答案，仅对简答题有效
// });

const value= ref([])
</script>

<style scoped>
.Main .Content{
  flex-direction: column;
  flex-grow: 1;
  display: flex;
}
</style>

