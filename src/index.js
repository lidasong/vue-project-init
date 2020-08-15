import Vue from 'vue'
import Hello from './components/Hello'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render(h) {
    return h(Hello)
  }
})
