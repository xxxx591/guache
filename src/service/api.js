import axios from 'axios'
import qs from 'qs'
import config from './config'
import { Toast } from 'mint-ui'
import native from './native';
import VueRouter from 'vue-router';

let post = (url, params) => {
  return new Promise((resolve, reject) => {
    let paramsData = Object.assign(params, paramsObj())
    axios({
      url: url,
      method: 'post',
      data: qs.stringify(paramsData), // 待发送数据
      // transformRequest: function(data) {
      //   console.log('post---', data)
      //   // 将data中的数据转化为 name=jack&addr=usa
      //   var str = ''
      //   for (var key in data) {
      //     str += key + '=' + data[key] + '&'
      //   }
      //   return str.substr(0, str.length - 1)
      // },
      // 设置请求头
      headers: {
        // velo_admin: "nRF9L8ZaOKlE2lew",
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
      .then(response => {
        // 错误信息
        if (response.data.error_msg == 'thumb值为空或不存在') {
          response.data.error_msg = '请上传封面图'
        }
        if (response.data.error_msg == '数据冲突') {
          response.data.error_msg = '该手机号码已绑定'
        }
        if (response.data.error_code == 1005 ) { 
          console.log('我走到这里来啦');
        }
        if (response.data.error_code == 1012 ) {
          response.data.error_msg = '订单号不存在'
          
        }
        if (response.data.error_code == 9999 ) {
          response.data.error_msg = '账号积分不足'
        }
        if (response.data && response.data.error_code  && response.data.error_code !== 1012) {
          Toast({
            message: response.data.error_msg,
            position: 'top',
            duration: 1500
          })
        }
        let data ;
        if (response.data == undefined  || JSON.stringify(response.data)=='{}') {
          data = response
        }else{
          data= response.data
        }
        resolve(data)
      })
      .catch(err => {
        resolve(err)
      })
  })
}

function paramsObj() {
  // let token = localStorage.getItem('token')
  // return {
  //   token
  // }
  return {}
}

let api = {}

// api.registPwd = obj => {
//   return new Promise(async (resolve, reject) => {
//     let data = await post(`${config.url}/api/index/registPwd`, obj || {}, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     })
//     resolve(data)
//   })
// }

// 发送验证码
api.authCode = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/common/code`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// 手机号注册
api.registerByPhone = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/mobile/register`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// 手机号登录
api.loginByPhone = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/mobile/login`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// 修改手机号
api.resetPassword = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/mobile/resetPassword`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// 获取banner列表
api.getBannerList = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/banner/list`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// 获取主页的推荐商品
api.getIndexRecommendProducts = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/goods/stick`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// F10 质造商品详情的接口
api.quality_getProductDetail = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/goods/detail`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}
// F10 质造商品详情的接口
api.quality_goodCollect = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/goods/goodCollect`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// 圈子热点的接口
api.quan_recommend = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/note/recommend`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// C20积分商城列表的接口
api.jifen_productList = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/point/list`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// E商城分类的接口
api.jifen_categoryList = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/common/goodsClass`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// C21积分商品详情的接口
api.jifen_productDetail = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/point/detail`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// F33收货地址-添加的接口
api.addAddr = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/address/add`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// F33收货地址-列表的接口
api.addrList = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/address/list`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// F33收货地址-设置默认的接口
api.setDefaultAddr = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(
      `${config.url}/api/shops/address/upoften`,
      obj || {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    resolve(data)
  })
}

// F34收货地址-修改的接口
api.updateAddr = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/address/update`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// F20添加购物车的接口
api.addProductToShopCar = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/goods/addcart`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// F30购物车列表的接口
api.shopCarList = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/goods/cartlist`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// F30修改购物车数量的接口
api.changeShopCarProductNum = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/goods/upcart`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// F31删除购物车的接口
api.deleteShopCarProduct = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/goods/cartdel`, obj || {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    resolve(data)
  })
}

// C30C40二手车列表的接口
api.secondHandCarList = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/usedcar/list`, obj || {})
    resolve(data)
  })
}

// 车辆分类的接口
api.carCategory = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/common/vehicleClass`, obj || {})
    resolve(data)
  })
}
// 车辆规格分类的接口
api.formatType = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/common/formatType`, obj || {})
    resolve(data)
  })
}
// 车辆规格分类的接口
api.format = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/common/format`, obj || {})
    resolve(data)
  })
}

// 颜色接口的接口
api.getAllColors = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/common/colourAll`, obj || {})
    resolve(data)
  })
}

// C30C40二手车筛选的接口
api.filterSecondCar = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/usedcar/keyword`, obj || {})
    resolve(data)
  })
}

// 二手车详情的接口
api.secondCarDetail = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/usedcar/detail`, obj || {})
    resolve(data)
  })
}

// E20-2列表的接口, 根据车辆分类id获取该车辆的所有零件
// api.secondCarDetail = obj => {
//   return new Promise(async (resolve, reject) => {
//     let data = await post(`${config.url}/api/car/carList`, obj || {})
//     resolve(data)
//   })
// }

// 基本信息详情的接口
api.userDetail = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/user/detail`, obj || {})
    resolve(data)
  })
}

// 修改昵称
api.modifyNickname = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/user/nickname`, obj || {})
    resolve(data)
  })
}

// 修改描述
api.modifyDes = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/user/desc`, obj || {})
    resolve(data)
  })
}

// 修改头像
api.modifyHeadImg = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/user/avatar`, obj || {})
    resolve(data)
  })
}

// 修改手机
api.modifyPhone = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/user/mobile`, obj || {})
    resolve(data)
  })
}

// 发布二手车
api.publishSecondCar = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/usedcar/add`, obj || {})
    resolve(data)
  })
}

// 获取我的头部信息
api.getMineHeadInfo = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/user/my`, obj || {})
    resolve(data)
  })
}

// 邀请列表
api.inviteList = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/user/invite/list`, obj || {})
    resolve(data)
  })
}

// 删除地址
api.deleteAddr = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/address/delete`, obj || {})
    resolve(data)
  })
}

// 圈子, 发布内容
api.quanPublishArticle = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/note/add`, obj || {})
    resolve(data)
  })
}

// 邀请有礼页面的数据
api.invitePageData = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/user/share`, obj || {})
    resolve(data)
  })
}

// 获取帖子分类
api.getTieZiCategory = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/common/noteCategory`, obj || {})
    resolve(data)
  })
}

// E20-2列表的接口
api.getBrandProducts = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/car/carList`, obj || {})
    resolve(data)
  })
}
// E20-2列表的接口
api.getCarDetail = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/car/carDetail`, obj || {})
    resolve(data)
  })
}

// E20-2获取车辆信息详情
api.getCarInfo = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/car/carInfo`, obj || {})
    resolve(data)
  })
}
// E20-2获取车辆信息详情
api.getStickCar = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/car/stickCar`, obj || {})
    resolve(data)
  })
}

// E20-8车辆支付
api.getCarPay = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/pay/carPay`, obj || {})
    resolve(data)
  })
}
// E20-8商品支付
api.getGoodCarPay = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/pay/goodsPay`, obj || {})
    resolve(data)
  })
}
// E20-8支付查询
api.queryPay = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/pay/query`, obj || {})
    resolve(data)
  })
}
// E40 单独查询车辆配置
api.carSetting = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/car/setting`, obj || {})
    resolve(data)
  })
}
// E50 单独保养计算
api.aegisClaim = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/car/aegisClaim`, obj || {})
    resolve(data)
  })
}
// E60 单独保养建议
api.aegisOffer = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/car/aegisOffer`, obj || {})
    resolve(data)
  })
}
// E20-10删除车辆
api.delCar = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/car/delCar`, obj || {})
    resolve(data)
  })
}
// E20-30添加车辆
api.addCar = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/car/addCar`, obj || {})
    resolve(data)
  })
}
// E20-10意向书
api.getBuyType = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/car/buyType`, obj || {})
    resolve(data)
  })
}
// E21获取支付订单
api.getOrderId = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/car/affirm`, obj || {})
    resolve(data)
  })
}

// 获取圈子主页商品列表
api.quanProductList = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/note/list`, obj || {})
    resolve(data)
  })
}

// 获取圈子文章详情
api.quanArticleDetail = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/note/detail`, obj || {})
    resolve(data)
  })
}
// 获取圈子文章收藏
api.quanNoteCollect = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/note/noteCollect`, obj || {})
    resolve(data)
  })
}
// G80-帖子
api.getTiezis = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/collect/noteCollect`, obj || {})
    resolve(data)
  })
}
// G80-商品
api.getShops = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/collect/goodsCollect`, obj || {})
    resolve(data)
  })
}
// G80-车辆
api.getCars = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/collect/trailerCollect`, obj || {})
    resolve(data)
  })
}
// G80-全部
api.getAllNum = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/collect/collectData`, obj || {})
    resolve(data)
  })
}
// G90-全部消息
api.getAllMessage = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/notice/list`, obj || {})
    resolve(data)
  })
}
// G90-二手车
api.getTwoCar = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/notice/usedCar`, obj || {})
    resolve(data)
  })
}
// G90-帖子
api.getTwoTiezi = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/notice/note`, obj || {})
    resolve(data)
  })
}
// G90-未读消息
api.getTwoWeidu = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/notice/noticeNum`, obj || {})
    resolve(data)
  })
}

// 获取圈子文章评论列表
api.quanArticleCommentsList = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/note/comment/list`, obj || {})
    resolve(data)
  })
}

// 单页内容详情的接口
// 内容id：1服务协议，2意向通用条款与条件，3用户协议，4关于我们
api.pageInfo = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/content/detail`, obj || {})
    resolve(data)
  })
}

// 订单列表
api.orderList = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/order/glist`, obj || {})
    resolve(data)
  })
}

// 帖子列表
api.tieZiList = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/user/note/list`, obj || {})
    resolve(data)
  })
}

// 积分列表
api.jiFenList = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/order/plist`, obj || {})
    resolve(data)
  })
}

// 积分商城, 提交订单
api.submitOrder_jiFen = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/point/purchase`, obj || {})
    resolve(data)
  })
}

// 质造, 确认订单, 数组
api.confirmOrder_quality = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/goods/confirm`, obj || {})
    resolve(data)
  })
}

// 质造, 立即购买
api.nowBuy_quality = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/goods/purchase`, obj || {})
    resolve(data)
  })
}
// 钱确认收货
api.mqueren = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/order/greceive`, obj || {})
    resolve(data)
  })
}
// 积分确认收货
api.jfqueren = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/order/preceive`, obj || {})
    resolve(data)
  })
}


// 我的, 帮助列表
api.helpList = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/help/list`, obj || {})
    resolve(data)
  })
}

// 我的, 删除帖子列表

api.delTiezi = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/user/note/delete`, obj || {})
    resolve(data)
  })
}
// 我的,订单详情
//商品订单
api.gdetail = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/order/gdetail`, obj || {})
    resolve(data)
  })
}
//积分商品订单
api.jdetail = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/shops/order/pdetail`, obj || {})
    resolve(data)
  })
}


// 我的, 帮助详情
api.helpDetail = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/help/detail`, obj || {})
    resolve(data)
  })
}

// 爱车, 我的车辆
api.myCars = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/car/myCar`, obj || {})
    resolve(data)
  })
}

// 圈子, 评论
api.sendComment = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/note/comment/add`, obj || {})
    resolve(data)
  })
}

// 圈子, 评论列表
api.commentList = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/note/comment/list`, obj || {})
    resolve(data)
  })
}

// 我的, 反馈
api.sendFeedBack = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/contact/add`, obj || {})
    resolve(data)
  })
}
// 第三方登陆
api.loginByOther = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/mobile/accredit`, obj || {})
    resolve(data)
  })
}
// 第三方绑定手机号
api.bindingByPhone = obj => {
  return new Promise(async (resolve, reject) => {
    let data = await post(`${config.url}/api/mobile/binding`, obj || {})
    resolve(data)
  })
}

export default api
