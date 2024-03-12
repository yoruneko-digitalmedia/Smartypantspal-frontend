<template>
 <n-button-group size="small">
      <n-button type="default">
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        交卷
      </n-button>
      <n-button type="default" @click="handleClick">
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        出題
      </n-button>
      
    </n-button-group>
</template>


<script setup>
import { LogInOutline as LogInIcon } from "@vicons/ionicons5";
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();
 

const class_option = defineModel("class_option")
const type_option = defineModel("type_option")

// const emit = defineEmits(['themeChange', 'PermissionsUpdate']);
let value= defineModel("question_value")
const handleClick=() => {
  // console.log(class_option.value,'SDSDSD')
  router.push({ name: 'question' });
  axios.get('http://127.0.0.1/api/get_question', {
    params: {
    class_option: class_option.value,
    type_option: type_option.value,
  },
  withCredentials: true,
  })
    .then(response => {
      // console.log("!!!!!!!!!!!");
      // console.log("@@", response.data[2].authInfo.isboss);
      // console.log('response ', response.data,response)
      value.value = response.data
      // console.log("Button.vue-value.value:", value.value)
      // emit('login-success', response.data); //no use now
    })
    .catch(error => {
      console.error(error);
      // message.error('something went wrong');
    });
};


</script>