<template>
    <!-- Menu component with Naive UI NMenu -->
    <div class="dropdown-container" v-if="isMenuVisible">
      <n-dropdown trigger="click" :options="menuOptions" @select="handleSelect" >
        <n-button v-model:value="activeKey" text size="large" :render-icon="renderIcon(PeopleIcon)">{{props.NewPermissions.name.value}}</n-button>
      </n-dropdown>
    </div>
  </template>
  
  <script setup>
  // Import necessary functions and components from Vue
  import { defineComponent, h, onMounted, onUnmounted, ref, watch, onBeforeMount } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { NMenu, NIcon } from "naive-ui";

  import { MenuOutline } from '@vicons/ionicons5';
  import {
    HomeOutline as HomeIcon,
    Build as BuildIcon,
    PersonCircleOutline as personIcon,
    LogOutOutline as LogOutIcon,
    PeopleOutline as PeopleIcon,
    PodiumOutline as Podium,
    TrendingUpSharp as TrendingUp,
    TerminalOutline as Terminal,
    LibraryOutline as Library,
    BookOutline as Book,
    Menu as menus
  } from "@vicons/ionicons5";
  import axios from 'axios';
  
  // Set up router
  const route = useRouter();
  
  const renderMenuIcon = () => h(NIcon, null, { default: () => h(MenuOutline) });
  const windowWidth = ref(window.innerWidth);
  const isMenuVisible = ref(window.innerWidth >= 1380);
  const showSubMenu = ref(!isMenuVisible.value);  
  // Define reactive variables and props
  const activeKey = ref('');
  const isMobile = ref(window.innerWidth < 768);  
  // const emit = defineEmits(['logout']);
  const menu = defineComponent({
    components: {
      menus
    }
  });
  
  
  const updateIsMobile = () => {
    isMobile.value = window.innerWidth < 768;
  };
  
  
  const props = defineProps(['NewPermissions']);
  // console.log('props.NewPermissions.isboss:', props.NewPermissions.isboss.value)
  // console.log('props.NewPermissions.name:', props.NewPermissions.name.value)
  // console.log('props.NewPermissions.name:', String(props.NewPermissions.name.value))
  // const emit = defineEmits(['logout']);
  const isBoss = ref(true)
  // Define function to render icons
  const renderIcon = (icon) => () => h(NIcon, null, { default: () => h(icon) });
  const bossRef = ref(false);
   
  const showDropdown = ref(false);
  
  // Define menu options with links and icons
  const menuOptions = ref([
    {
      label: () => h(
        RouterLink,
        { to: { name: "UserDashbroad" } },
        { default: () => "User Dashboard" }
      ),
      key: "UserDashbroad",
      icon: renderIcon(personIcon),
    },
    {
      label: () => h(
        RouterLink,
        { to: { name: "setting" } },
        { default: () => "Settings" }
      ),
      key: "setting",
      icon: renderIcon(BuildIcon),
    },
    {
      label: "Logout",
      key: "logout",
      icon: renderIcon(LogOutIcon),
    }
]);
 

onMounted(() => {

const handleResize = () => {
  windowWidth.value = window.innerWidth;
}; 
window.addEventListener('resize', handleResize);
 
watch(windowWidth, (newWidth) => {
 
  // console.log(`New window width: ${newWidth}`);
  if (newWidth >= 1380) {
    isMenuVisible.value = true
    // console.log('isMenuVisible:', isMenuVisible)
  } else {
    isMenuVisible.value = false
    // console.log('isMenuVisible:', isMenuVisible)
  }

  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
});
 
  // Define logout function
const logout = async () => {
  console.log('Starting logout process...');

  try {
    // Wait for Axios POST request to complete
    const response = await axios.post('http://127.0.0.1/logout', {}, { withCredentials: true });
    console.log("Logout successful:", response.data);

    // Logic after API call completion and success
    const logstatus = false;
    // emit('logout', logstatus); //no use enow
    console.log('Logout process completed');
    route.push({ name: "Login" }) //direct to Login page
  } catch (error) {
    // Handle error if request fails
    console.error("Logout failed:", error);
    // message.error('Something went wrong during logout');
  }
};

const handleSelect = (key) => {
  console.log(key)
  if(key=="logout"){
    logout();
  }else {
 
    activeKey.value = key;
 
  }
};
watchEffect(() => {
  const newRouteName = route.currentRoute.value.name;
  // console.log('Current Route Name changed to:', newRouteName);
  if (newRouteName !== activeKey.value) {
    activeKey.value = null;
  }
});

  
 
</script>
<style>
 /* CSS */
.dropdown-container {
  display: flex;
  justify-content: center;
  align-items: center;

  /* 如果希望div占?整??口的高度，可以?置height: 100vh; */
}

</style>

