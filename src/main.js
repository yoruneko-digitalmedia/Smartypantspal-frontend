// import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import './assets/style.css'
import axios from 'axios'
axios.defaults.withCredentials = true;
const store = createStore({
    state () {
      return {
        count: 0
      }
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })
const app = createApp(App)
app.use(store)
app.use(router)
app.use(naive)
app.mount('#app')