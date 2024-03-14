<template>
  <!-- App component template -->
  <div class="app">
    <!-- Naive UI Config Provider component with theme and theme overrides -->
    <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
      <!-- RouterView component with event listener for theme change -->
      <RouterView style="height: 100vh;" v-model="newtheme" @PermissionsUpdate="UpdatePermissions" :NewPermissions="PermissionsRef"></RouterView>
    </n-config-provider>
  </div>
</template>

<script setup>
// Import necessary functions and components from Vue
import { ref, onMounted, watchEffect } from 'vue';

// Import dark theme from Naive UI and theme overrides from JSON files
import { darkTheme } from 'naive-ui';
import darkthemeOverrides from './assets/naive-ui-dark-theme-overrides.json';
import lightthemeOverrides from './assets/naive-ui-light-theme-overrides.json';

// Define reactive variables for theme and theme overrides
const newtheme = ref()
const theme = ref(darkTheme);
const PermissionsRef = {isboss: ref(false), name: ref()};

let themeOverrides = darkthemeOverrides;
// const UpdatePermissions = (value)=>{
//   console.log('login.vue send:',value)
//   PermissionsRef.value = value
//   console.log('set PermissionsRef to:', PermissionsRef.value)
// }
const UpdatePermissions = (value) => {
  console.log('login.vue send:', value)
  console.log('value.isboss', value.isboss)
  localStorage.setItem('permissions', value.isboss)
  localStorage.setItem('UseraName', value.name)
  PermissionsRef.isboss.value = value.isboss
  PermissionsRef.name.value = value.name
  console.log('set PermissionsRef to:', PermissionsRef)
}
// Define function to handle theme change event
// const themeChange = (ChangeFlag) => {
//   // console.log('ChangeFlag', ChangeFlag);
//   switchTheme(ChangeFlag);
// };

// Define function to switch between light and dark themes
const switchTheme = (value) => {
  if (value) {
    // Switch to light theme
    theme.value = null;
    themeOverrides = null;
    // console.log("value", value)
    localStorage.setItem('theme', value)
    // Uncomment the following line to use light theme overrides
    // themeOverrides = lightthemeOverrides;
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  } else {
    // Switch to dark theme
    theme.value = darkTheme;
    // console.log("value", (value))
    localStorage.setItem('theme', value)
    themeOverrides = darkthemeOverrides;
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  }
};
 

onMounted(() => { 
  const savedPermissions = localStorage.getItem('permissions')
  const savedName = localStorage.getItem('UseraName')
  // console.log(savedPermissions, savedName)
  if (savedPermissions !== null && savedName !== null ) {
    PermissionsRef.isboss.value = JSON.parse(savedPermissions)
    PermissionsRef.name.value = JSON.parse(savedName)
    // console.log( PermissionsRef.isboss.value, PermissionsRef.name.value)
  } 
  const savedTheme = localStorage.getItem('theme')
  // console.log("savedTheme",savedTheme)
  if (savedTheme !== undefined && savedTheme !== null ) {
    newtheme.value = JSON.parse(savedTheme)
    // console.log('newtheme.value:', newtheme.value)
    // console.log('savedTheme:', savedTheme.value)
  } 
  watchEffect(() => {
    // console.log(newtheme.value)
    if(newtheme.value != undefined){
      switchTheme(newtheme.value)
    }
    //全域禁止使用context menu
  });
})
</script>
<style scoped>
.app{
  height: 100vh; 
  flex-direction: column;
  display: flex ;

}

</style>