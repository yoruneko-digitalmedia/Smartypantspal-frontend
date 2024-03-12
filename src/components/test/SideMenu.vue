<template>
  <div style="padding:10px; flex-grow: 1;flex-direction: column; display: flex;"> 
    <n-flex vertical>
      <n-select class="side_content" v-model:value="value1" :options="options1"  placeholder="Select Subject" />
      <n-select class="side_content" v-model:value="value2" :options="options2"  placeholder="Select Session"/>
      <Button class="side_content" v-model:class_option="value1" v-model:type_option="value2" v-model:QuestionObj="QuestionObj"></Button>
      <Timer class="side_content" style="justify-content: center;"></Timer>
      <Score class="side_content" ></Score>
    </n-flex>
  </div>
  
</template>

<script setup>
import Button from '@/components/test/SideMenu/Button.vue'
import Timer from '@/components/test/SideMenu/Timer.vue'
import Score from '@/components/test/SideMenu/Score.vue'
import { h, defineComponent, ref,onBeforeUnmount, onMounted } from "vue";
import { NIcon } from "naive-ui";

const QuestionObj= defineModel("QuestionObj")
 
const value1 = ref()
const value2 = ref()
const class_option = ref()
const type_option = ref()
const options1= [
        {
          label: "Computer Vision",
          value: "CV",
         
        },
        {
          label: "Natural Language Processing",
          value: "NLP",
         
        }
       
      ]
const options2= [
        {
          label: "Week1",
          value: "session1",
         
        },
        {
          label: "Week2",
          value: "session2",
         
        }
       
      ]

const inverted = ref(false);
onMounted(() => {
  const storedvalue1 = localStorage.getItem('value1');
  const storedvalue2 = localStorage.getItem('value2');

  if (storedvalue1 !== null || storedvalue1 !== undefined) {
    value1.value = JSON.parse(storedvalue1);
  }
  if (storedvalue2 !== null || storedvalue2 !== undefined) {
    value2.value = JSON.parse(storedvalue2);
  }
});

onBeforeUnmount(() => {
  localStorage.setItem('value1', JSON.stringify(value1.value));
  localStorage.setItem('value2', JSON.stringify(value2.value));

});
</script>
<style>
 /* 适用于side_content?的通用居中?式 */
.side_content {
  display: flex; /* 使用 Flexbox */
  justify-content: center; /* 水平居中 */
  width: 100%; /* ?元素?度充?其容器 */
  margin-bottom: 2.5rem;
}

</style>