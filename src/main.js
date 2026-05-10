import { createApp } from 'vue'
import App from './App.vue'
import router from './route.js'
import './style.css'
import 'plyr/dist/plyr.css'

createApp(App)
  .use(router)
  .mount('#app')