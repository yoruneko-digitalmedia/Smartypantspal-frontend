<template>
  <n-card :bordered="false" style="flex-grow: 1;flex-direction: column; display: flex;">
    <n-scrollbar style="max-height: 93vh">
      <n-flex justify="space-around" size="large">
        <n-flex class="table" vertical justify="space-around">
 
          <QuestionCard v-for="(item, index) in items" :key="index" :item="item" />
          <n-button @click="logUserInputs">提交</n-button>
  
        </n-flex>
      </n-flex>
    </n-scrollbar>
  </n-card>  
</template>

<script setup>
import { ref, computed  } from 'vue'
import QuestionCard from '@/components/test/QuestionCard.vue'
import { NButton } from 'naive-ui'
const value= defineModel("QuestionObj")
const items = computed(() => transformData(value.value)) 
function transformData(value) {
  if (!Array.isArray(value)) {
    console.error('Expected an array');
    console.log(value);
    return [];
  }
  return value.map((item, index) => {
    console.log('mapping');
    const degreeMap = { "容易": "easy", "中等": "median", "困难": "hard" };
    const typeMap = { "選擇題": "radio", "簡答題": "text" };
    let newItem = {
      id: index + 1,
      question_title:  item.content,
      degree: degreeMap[item.degree],
      question_type: typeMap[item.question_type],
    };
    
    if (item.question_type === "選擇題") {
      const options = item.content.split(',').slice(1).map((option, idx) => {
        const [value, label] = option.split('.');
        return { value: `option${idx + 1}`, label };
      });
      newItem.options = options;
    }
    console.log(newItem.value)
    return newItem;
  });
}
 


const logUserInputs = () => {
  console.log('----User inputs----');
  items.value.forEach((item) => {
    console.log(`Question ${item.id} (${item.question_type}):`);
    if (item.question_type === 'radio') {
      const selectedOption = item.options.find(option => option.value === item.selectedOption);
      console.log(selectedOption ? selectedOption.value : 'None selected');
    } else if (item.question_type === 'text') {
      console.log(item.value ? item.value : 'Unfilled');
    }
  });
};
</script>