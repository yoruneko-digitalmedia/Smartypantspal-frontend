<template>
  <n-card style="width: 50dvw;background-color: hsla(50, 0%, 70%, 0.1);">
    <template #header>
      <span>{{ item.question_title }}</span>
    </template>
    <!-- 判断题目类型是否为radio -->
    <n-radio-group v-if="item.question_type === 'radio'" v-model:value="item.selectedOption" :name="`radiobuttongroup${item.id}`" @update:value="updateSelectedOption">
      <n-grid :cols="2" style="gap: 10px;">
        <n-grid-item v-for="(option, i) in item.options" :key="i">
          <n-card :bordered="true" :class="{'selected': option.value === item.selectedOption}" style="background-color: hsla(50, 0%, 70%, 0.1);">
            <n-radio
              :value="option.value"
              :disabled="option.disabled"
              :label="option.label"
            />
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-radio-group>
    <!-- 判断题目类型是否为text -->
    <n-input v-else-if="item.question_type === 'text'" v-model:value="item.value" @update:value="updateValue" />
    <!-- 其他类型的题目可以再加入其他的v-else-if或v-else -->
    <template #footer>
      <span>Degree: {{ item.degree }}</span>
    </template>
  </n-card>
</template>


<script setup>
import { ref, watch } from 'vue'
import { NCard, NRadioGroup, NRadio, NGrid, NGridItem } from 'naive-ui'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:item'])

// 监听item.selectedOption和item.value的变化，并通知父组件
const updateSelectedOption = (value) => {
  props.item.selectedOption = value;
  emit('update:item', props.item);
}

const updateValue = (value) => {
  props.item.value = value;
  emit('update:item', props.item);
}
</script>

<style scoped>
.selected .n-card__content {
  color: green;
}
.answer .n-card__content {
  color: red;
}
</style>
