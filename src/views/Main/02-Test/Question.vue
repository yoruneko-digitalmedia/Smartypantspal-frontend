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
import { ref } from 'vue'
import QuestionCard from '@/components/test/QuestionCard.vue'
import { NButton } from 'naive-ui'
const value= defineModel("question_value")

function transformData(value) {
  if (!Array.isArray(value)) {
    // console.error('Expected an array');
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
    } else if (item.question_type === "簡答題") {
      newItem.value = "";
    }
    
    return newItem;
  });
}
 
onMounted(() => {
 
  watch(value.value, () => {
    // console.log(value.value)
    items.value = transformData(value.value)
  }, { immediate: true });
});
// 使用Vue ref包装转换后的数据
const items = ref(transformData(value))
// const items = ref([
//   { 
//     id: 1,
//     question_title: 'title1', 
//     degree:'easy',
//     question_type:'radio',
//     options: [
//       { value: 'option1', label: 'aaaa'},
//       { value: 'option2', label: 'bbbb'},
//       { value: 'option3', label: 'cccc'},
//       { value: 'option4', label: 'dddd'},
//       // { value: 'option5', label: 'Option 5', disabled: false },
//       // { value: 'option6', label: 'Option 6', disabled: false },
//       // { value: 'option7', label: 'Option 7', disabled: false },
//       // { value: 'option8', label: 'Option 8', disabled: false },
//       // { value: 'option9', label: 'Option 9', disabled: false }
//     ] 
//   },
 
//   { 
//     id: 2,
//     question_title: 'title2', 
//     degree:'hard',
//     question_type:'text',
//     value: '',
//   },
//   { 
//     id: 3,
//     question_title: 'title3', 
//     degree:'median',
//     question_type:'radio',
//     options: [
//       { value: 'option1', label: 'qwetr'},
//       { value: 'option2', label: 'asdf'},
//       { value: 'option3', label: 'c vb'},
//       { value: 'option4', label: 'dftygj'},
//     ] 
//   },
//   { 
//     id: 3,
//     question_title: 'title3', 
//     degree:'median',
//     question_type:'radio',
//     options: [
//       { value: 'option1', label: 'qwetr'},
//       { value: 'option2', label: 'asdf'},
//       { value: 'option3', label: 'c vb'},
//       { value: 'option4', label: 'dftygj'},
//     ] 
//   },
//   { 
//     id: 3,
//     question_title: 'title3', 
//     degree:'median',
//     question_type:'radio',
//     options: [
//       { value: 'option1', label: 'qwetr'},
//       { value: 'option2', label: 'asdf'},
//       { value: 'option3', label: 'c vb'},
//       { value: 'option4', label: 'dftygj'},
//     ] 
//   },
//   { 
//     id: 3,
//     question_title: 'title3', 
//     degree:'median',
//     question_type:'radio',
//     options: [
//       { value: 'option1', label: 'qwetr'},
//       { value: 'option2', label: 'asdf'},
//       { value: 'option3', label: 'c vb'},
//       { value: 'option4', label: 'dftygj'},
//     ] 
//   },
// ]) 

const logUserInputs = () => {
  console.log('User inputs:');
  items.value.forEach((item) => {
    console.log(`Question ${item.id} (${item.question_type}):`);
    if (item.question_type === 'radio') {
      // 注意，这里假设你有一个方式来确定哪个选项被选中了。
      // 这可能需要在 QuestionCard 组件中处理，并更新 item 对象。
      const selectedOption = item.options.find(option => option.value === item.selectedOption);
      console.log(`Selected option:`, selectedOption ? selectedOption.label : 'None selected');
    } else if (item.question_type === 'text') {
      console.log(`Answer:`, item.value ? item.value : 'Unfilled');
    }
    // 对于其他题型，可以按需扩展
  });
};

</script>
 
  