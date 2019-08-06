import * as types from './types'
import tool from '../../../service/tool.js'

const mutations = {
  // 将购物车所有商品加入
  [types.SHOPCAR_ADD](state, list) {
    // state.shopCarList = list
    // item.goods_id: 商品id    item.id: 购物车id       item.goods_id.id: 商品id
    state.shopCarList = []
    if (!list || list.length === 0) return
    list.forEach((item, index) => {
      item.goods.selected = false
      item.goods.editModelSelected = false
      state.shopCarList.push(item)
    })
  },
  // 购物车中, 选中商品
  [types.SHOPCAR_SELECTED_PRODUCT](state, obj) {
    let { product, isSelected } = obj
    state.shopCarList.forEach((item, index) => {
      if (item.goods.id === product.goods.id) {
        product.goods.selected = isSelected
        state.shopCarList.splice(index, 1, product)
      }
    })
  },
  // 购物车编辑模式中, 选中商品
  [types.SHOPCAR_EDIT_SELECTED_PRODUCT](state, obj) {
    let { product, isSelected } = obj
    state.shopCarList.forEach((item, index) => {
      if (item.goods.id === product.goods.id) {
        product.goods.editModelSelected = isSelected
        state.shopCarList.splice(index, 1, product)
      }
    })
  },
  // 购物车, 加商品数量
  [types.SHOPCAR_ADD_BUYNUM](state, obj) {
    state.shopCarList.forEach((item, index) => {
      if (item.goods.id === obj.goods.id) {
        if (item.number === 99) return // 购物车商品的购买数量不能超过99
        item.number = tool.add(item.number, 1)
        state.shopCarList.splice(index, 1, item)
      }
    })
  },
  // 购物车, 减商品数量
  [types.SHOPCAR_SUB_BUYNUM](state, obj) {
    state.shopCarList.forEach((item, index) => {
      if (item.goods.id === obj.goods.id) {
        if (item.number === 1) return // 购物车商品的购买数量不能小于等于0
        item.number = tool.sub(item.number, 1)
        state.shopCarList.splice(index, 1, item)
      }
    })
  },
  // 购物车, 全选 / 反选
  [types.TOGGLE_IS_SELECTED_ALL](state, product) {
    let allSelected = true
    state.shopCarList.forEach((item, index) => {
      if (item.goods.selected === false) {
        allSelected = false
      }
    })

    state.shopCarList.forEach((item, index) => {
      item.goods.selected = !allSelected
      if (state.shopCarList.length - 1 === index) {
        state.shopCarList.splice(index, 1, item)
      }
    })
  },
  // 编辑购物车, 全选 / 反选
  [types.TOGGLE_EDIT_MODEL_IS_SELECTED_ALL](state, product) {
    let allSelected = true
    state.shopCarList.forEach((item, index) => {
      if (item.goods.editModelSelected === false) {
        allSelected = false
      }
    })

    state.shopCarList.forEach((item, index) => {
      item.goods.editModelSelected = !allSelected
      if (state.shopCarList.length - 1 === index) {
        state.shopCarList.splice(index, 1, item)
      }
    })
  },
  [types.DELETE_SHOP_CAR_PRODUCT](state, deleteArr) {
    deleteArr.forEach((ele, idx) => {
      state.shopCarList.forEach((item, index) => {
        if (ele === item.id) {
          state.shopCarList.splice(index, 1)
        }
      })
    })
  }
}

export default mutations
