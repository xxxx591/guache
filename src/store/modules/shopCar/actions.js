import * as types from './types'
import api from '../../../service/api.js'
import tool from '../../../service/tool.js'

const actions = {
  addShopCar({ state, commit }, product) {
    commit(types.SHOPCAR_ADD, product)
  },
  // 物车, 选择商品
  selectedShopCar({ state, commit }, obj) {
    commit(types.SHOPCAR_SELECTED_PRODUCT, obj)
  },
  // 购物车编辑模式, 选择商品
  editModelSelectedShopCar({ state, commit }, obj) {
    commit(types.SHOPCAR_EDIT_SELECTED_PRODUCT, obj)
  },
  // 增加购物车某个商品的购买数量, +1
  addProductBuyNum({ state, commit, rootState }, obj) {
    tool.debounce(() => {
      state.shopCarList.forEach(async (item, index) => {
        if (item.goods.id === obj.goods.id) {
          if (item.number === 99) return // 购物车商品的购买数量不能超过99
          // cart_id: 购物车id   type：0减、1加
          let result = await api.changeShopCarProductNum({
            token: rootState.datas.token,
            cart_id: obj.id,
            type: 1
          })
          if (result.error_code === 0) {
            commit(types.SHOPCAR_ADD_BUYNUM, obj)
          }
        }
      })
    })
  },
  // 减少购物车某个商品的购买数量, -1
  subProductBuyNum({ state, commit, rootState }, obj) {
    // commit(types.SHOPCAR_SUB_BUYNUM, obj)
    tool.debounce(() => {
      state.shopCarList.forEach(async (item, index) => {
        if (item.goods.id === obj.goods.id) {
          if (item.number === 1) return // 购物车商品的购买数量不能超过99
          // cart_id: 购物车id   type：0减、1加
          let result = await api.changeShopCarProductNum({
            token: rootState.datas.token,
            cart_id: obj.id,
            type: 0
          })
          if (result.error_code === 0) {
            commit(types.SHOPCAR_SUB_BUYNUM, obj)
          }
        }
      })
    })
  },
  // 购物车, 全选/反选
  toggleIsSelectedAll({ state, commit }, obj) {
    commit(types.TOGGLE_IS_SELECTED_ALL, obj || '')
  },
  // 购物车编辑模式, 全选/反选
  toggleEditModelIsSelectedAll({ state, commit }, obj) {
    commit(types.TOGGLE_EDIT_MODEL_IS_SELECTED_ALL, obj || '')
  },
  async deleteShopCarProduct({ state, commit, rootState }, obj) {
    let deleteArr = []
    state.shopCarList.forEach(async (item, index) => {
      if (item.goods.editModelSelected === true) {
        deleteArr.push(item.id)
      }
    })
    console.log('deleteShopCarProduct---deleteArr', deleteArr)
    let result = await api.deleteShopCarProduct({
      token: rootState.datas.token,
      cart_id: deleteArr
    })
    if (result.error_code === 0) {
      commit(types.DELETE_SHOP_CAR_PRODUCT, deleteArr)
    }
    // console.log('deleteShopCarProduct---', state)
  }
}

export default actions
