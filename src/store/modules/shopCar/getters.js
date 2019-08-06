import tool from '../../../service/tool.js'

const getters = {
  isSelectedAll: state => {
    let flag = true
    state.shopCarList.forEach((item, index) => {
      if (item.goods.selected === false) {
        flag = false
      }
    })
    if (state.shopCarList.length === 0) {
      flag = false
    }
    return flag
  },
  editModel_isSelectedAll: state => {
    let flag = true
    state.shopCarList.forEach((item, index) => {
      if (item.goods.editModelSelected === false) {
        flag = false
      }
    })
    if (state.shopCarList.length === 0) {
      flag = false
    }
    return flag
  },
  sumPrice: state => {
    let sum = 0
    state.shopCarList.forEach((item, index) => {
      if (item.goods.selected === true) {
        let price = tool.mul(item.number, item.goods.price)
        sum = tool.add(sum, price)
      }
    })
    return sum
  }
}

export default getters
