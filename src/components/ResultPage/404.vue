<template>
  <n-card tag="div">
    <n-flex align="center" justify="center" style="width: 100dvw;height: 100dvh;">
      <n-card     
      :bordered="false">
        <n-result
        status="404"
        title="404 Not Found"
        description="頁面不存在，你個小王八蛋別想亂來"
        size="huge"
        >
        </n-result>

        <!-- 用loading-bar和Countdown處裡自動跳轉 -->
 
      </n-card>
    </n-flex>
  </n-card>
</template>

<script setup>
import { ref } from 'vue';
const progress = ref(0);
</script>