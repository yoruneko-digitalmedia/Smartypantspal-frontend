<template>
    <!-- Naive UI Switch Component with custom templates for checked and unchecked states -->
    <div>
        <n-popover trigger="hover">
            <template #trigger>
                <n-switch :round="false" v-model:value="active" size="large">
                    <!-- Template for checked state -->
                    <template #checked>
                        TOO&nbsp;shine&nbsp;huh&quest;
                    </template>
                    <!-- Template for unchecked state -->
                    <template #unchecked>
                        &nbsp;&nbsp;&nbsp;&nbsp;Blind&nbsp;switch
                    </template>
                </n-switch>
            </template>
            <p v-if="!active" >Dont't click if you hate light.</p>  
            <p v-else-if="active">Just told you</p>  
        </n-popover>
    </div>
  </template>
  
  <script setup>
  import { NSwitch } from 'naive-ui';
  // Import necessary functions from Vue
  import { ref } from 'vue';
  
  // Reactive variable for switch state
  const active = defineModel()
  
  // Event emitter for emitting 'theme-change' event
  const emit = defineEmits(['themeChange']);
  
  // Event handler for switch value change
  const handleChange = (value) => {
    // Emit an event to notify the parent component (App.vue)
    console.log(value)
    emit('themeChange', value);
  };
  </script>
  