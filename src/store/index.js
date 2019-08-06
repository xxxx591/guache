import Vue from 'vue'
import Vuex from 'vuex'

import datas from './modules/datas'
import shopCar from './modules/shopCar/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  mutations: {},
  actions: {},
  modules: {
    datas,
    shopCar
  }
})

export default store
