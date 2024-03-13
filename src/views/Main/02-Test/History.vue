<template>
  <div class="Main">
    <n-flex style="height: 93vh;" justify="space-around" size="large">
      <n-flex vertical justify="space-around">
        <n-table class="table" striped>
          <thead>
            <tr>
              <th>#</th>
              <th>科目</th>
              <th>範圍</th>
              <th>成績</th>
              <th>日期</th>
              <th>答題記錄</th>
            </tr>
          </thead>
          <tbody>
            <!-- 检查是否有数据 -->
            <tr v-if="records.length > 0" v-for="(record, index) in records" :key="record.anwser_id">
              <td>{{ index + 1 }}</td>
              <td>{{ record.class }}</td>
              <td>{{ record.session_range }}</td>
              <td>{{ record.score }}</td>
              <td>{{ new Date(record.anwser_date).toLocaleDateString() }}</td>
              <td>看</td>
            </tr>
            <!-- 如果没有数据，则显示一行提示信息 -->
            <tr v-else>
              <td colspan="6" class="no-data">尚無答題記錄</td>
            </tr>
          </tbody>
        </n-table>
      </n-flex>
    </n-flex>
  </div>  
</template>



  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  const props = defineProps(['NewPermissions']);
  // console.log(props.NewPermissions.name.value)
  let records = ref([])
  onMounted(() => {
      
      axios.get('http://127.0.0.1/api/catch_student_table', {
        params: {
          student: props.NewPermissions.name.value, // 假设 student 是响应式引用，类似于 class_option 和 type_option
        },
        
      })
      .then(response => {
        // console.log("!!!!!!!!!!!");
        // console.log('response ', response.data, response);
        records.value = response.data
        // console.log(records)
      })
      .catch(error => {
        // console.error(error);
      });
});

  </script>
  
  <style scoped>
.table{
  height: 90%;
  width: 75vw;
  
}

.no-data {
  text-align: center;
  /* 垂直居中 */
  vertical-align: middle;
  /* 文本大小 */
  font-size: 20px; /* 或根据需要调整 */
}
 
  </style>
  