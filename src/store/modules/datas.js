// import api from '../../api/index'
import * as types from '../mutation-types'

const state = {
  mobileHeight: 0,
  // token: '470421ec059443ac059f63e84eeec8b7',   17191098959
  // token: '552b0a5f93835d1d29a7aaba62d6dd91',
  token: '',
  bannerShowType: 1, // 1-安卓, 2-ios, 3-小程序, 4-pc, 5-h5, 6-ipad
  tab: 0,
  showLoading: true,
  saveJpushId: '',
  addr:{},
  productInfo:{}
  // shopCar: []
}

const mutations = {
  [types.SET_Mobile_Height](state, data) {
    state.mobileHeight = data
  },
  [types.SET_TOKEN](state, token) {
    state.token = token
  },
  [types.SET_TAB](state, tab) {
    state.tab = tab
  },
  [types.SET_LOADING](state, flag) {
    state.showLoading = flag
  },
  [types.SET_JPUSH_ID](state, id) {
    state.saveJpushId = id
  }
  // [types.SHOPCAR_ADD](state, product) {
  //   state.shopCar.push(product)
  // },
  // // 购物车中, 选中商品
  // [types.SHOPCAR_SELECTED_PRODUCT](state, obj) {
  //   let { product, isSelected } = obj
  //   state.shopCar.forEach((item, index) => {
  //     if (item.id === product.id) {
  //       product.selected = isSelected
  //       state.shopCar.splice(index, 1, product)
  //     }
  //   })
  // },
  // [types.SHOPCAR_SET_BUYNUM](state, obj) {}
}

const actions = {
  setMobileHeight({ state, commit }, clientHeight) {
    commit(types.SET_Mobile_Height, clientHeight)
  },
  saveToken({ state, commit }, token) {
    commit(types.SET_TOKEN, token)
  },
  setTab({ state, commit }, tab) {
    commit(types.SET_TAB, tab)
  },
  setLoading({ state, commit }, flag) {
    commit(types.SET_LOADING, flag)
  },
  setJpushId({ state, commit }, id) {
    commit(types.SET_JPUSH_ID, id)
  }

  // addShopCar({ state, commit }, product) {
  //   commit(types.SHOPCAR_ADD, product)
  // },
  // // 物车, 选择商品
  // selectedShopCar({ state, commit }, obj) {
  //   commit(types.SHOPCAR_SELECTED_PRODUCT, obj)
  // },
  // // 设置购物车某个商品的购买数量
  // setProductBuyNum({ state, commit }, obj) {
  //   commit(types.SHOPCAR_SET_BUYNUM, obj)
  // }
}

// const getters = {
//   shopCarArr: state => state.shopCar
// }

export default {
  state,
  actions,
  // getters,
  mutations
}
