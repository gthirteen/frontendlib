import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

Vue.config.productionTip = false

const AxiosJSON = Axios.create({
  baseURL: "http://localhost:8081/",
  timeout: 2000
});

const AxiosUpload = Axios.create({
  baseURL: "http://localhost:8081/",
  timeout: 3000,
  headers:{"Content-Type":"multipart/form-data"}
});

Vue.prototype.AxiosJSON = AxiosJSON
Vue.prototype.AxiosUpload = AxiosUpload

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
