// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VueLocalStorage from 'vue-ls'

import 'lib-flexible/flexible'
import './my-minui.js'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

// import Mui from 'vue-awesome-mui'
// import 'vue-awesome-mui/mui/dist/css/mui.css'

import config from './service/config'
import tool from './service/tool'
import api from './service/api'
import native from './service/native'

import 'mint-ui/lib/style.css'
import './style.less'

import VConsole from 'vconsole'
import { PopupPicker  } from 'vux'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
import common from './service/commin'

Vue.prototype.javascriptBridge = common.setupWebViewJavascriptBridge




Vue.component('popup-picker', PopupPicker)
Vue.use(VueLocalStorage)

Vue.use(VueAwesomeSwiper /* { default global options } */)
// Vue.use(Mui)
new VConsole()
Vue.config.productionTip = false

Vue.prototype.config = config
Vue.prototype.tool = tool
Vue.prototype.api = api
Vue.prototype.native = native

let flag = false
Vue.prototype.debounce = (fun, timeout) => {
  let time = ''
  if (flag) {
    return
  }
  flag = true
  clearTimeout(time)
  time = setTimeout(() => {
    fun()
    flag = false
  }, timeout || 500)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
