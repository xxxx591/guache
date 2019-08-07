import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import Register from '@/components/login/Register'
import UserAgreement from '@/components/login/UserAgreement'
import ChangePwd from '@/components/login/ChangePwd'
import supply from '@/components/login/supply'   //完善信息

import Index from '@/components/main/Index'
import Main from '@/components/main/Main'
import PointsMall from '@/components/main/PointsMall'
import ProductDetail from '@/components/main/ProductDetail'
import ConfirmOrder from '@/components/main/ConfirmOrder'
import ConfirmOrderList from '@/components/main/ConfirmOrderList'
import ConfirmOrderJiFen from '@/components/main/ConfirmOrderJiFen'
import ConfirmOrderListJiFen from '@/components/main/ConfirmOrderListJiFen'

import AddrManage from '@/components/main/AddrManage'
import EditAddr from '@/components/main/EditAddr'
import AddAddr from '@/components/main/AddAddr'
import ConfirmBack from '@/components/main/ConfirmBack'
import SecondCar from '@/components/main/SecondCar'
import SecondCarQian from '@/components/main/SecondCarQian'
import SecondCarDetail from '@/components/main/SecondCarDetail'
import PublishCar from '@/components/main/PublishCar'
import PublishCar2 from '@/components/main/PublishCar2'

import QuanMain from '@/components/quan/Main'
import QuanPublish from '@/components/quan/QuanPublish'
import QuanDetail from '@/components/quan/QuanDetail'

import LoveCar from '@/components/car/LoveCar'
import ChooseCar from '@/components/car/ChooseCar'
import ChooseBrand from '@/components/car/ChooseBrand'
import ConfirmConfig from '@/components/car/ConfirmConfig' // 确认配置
import MindLatter from '@/components/car/MindLatter' // 意向书
import ConfirmBack2 from '@/components/car/ConfirmBack' // 确认回执
import CarConfig from '@/components/car/CarConfig' // 车辆配置
import MaintainCalcu from '@/components/car/MaintainCalcu' // 保养计算
import MaintainAdvice from '@/components/car/MaintainAdvice' // 保养建议
import InvitedGift from '@/components/car/InvitedGift' // 邀请有礼
import CarShare from '@/components/car/Share' // 分享
import CarRules from '@/components/car/Rules' // 规则说明
import SetCar from '@/components/car/SetCar' // 选配车辆

import ServiceAddr from '@/components/car/ServiceAddr' // 服务网点
import CarArticleDetail from '@/components/car/ArticleDetail' // e90精选车辆

import DownLoad from '@/components/car/DownLoad' // 下载app

import QualityMain from '@/components/Quality/Main' // 质造主页
import QualityProductDetail from '@/components/Quality/ProductDetail' // 商品详情
import ShopCar from '@/components/Quality/ShopCar' // 购物车
import EditShopCar from '@/components/Quality/EditShopCar' // 编辑购物车

import Mine from '@/components/Mine/Mine' // 我的
import Info from '@/components/Mine/Info' // 基本信息
import ModifyNickname from '@/components/Mine/ModifyNickname' // 修改昵称
import ModifyPhone from '@/components/Mine/ModifyPhone' // 修改手机
import Des from '@/components/Mine/Des' // 修改详情
import Set from '@/components/Mine/Set' // 设置
import Message from '@/components/Mine/Message' // 服务消息
import AllMessage from '@/components/Mine/AllMessage' // 设置首页

import OrderList from '@/components/Mine/OrderList' // 订单列表
import OrderDetail from '@/components/Mine/OrderDetail' // 订单想起
import OrderDetailjifen from '@/components/Mine/OrderDetailJifen' // 订单想起
import TieZi from '@/components/Mine/TieZi' // 帖子
import Collect from '@/components/Mine/Collect' // 收藏  取消该功能
import Help from '@/components/Mine/Help' // 收藏
import HelpList from '@/components/Mine/HelpList' // 收藏
import MsgCenter from '@/components/Mine/MsgCenter' // 消息中心
import MsgList from '@/components/Mine/MsgList' // 消息列表
import Setting from '@/components/Mine/Setting' // 设置
import FeedBack from '@/components/Mine/FeedBack' // 留言反馈
import AboutUs from '@/components/Mine/AboutUs' // 关于我们  取消该功能
import AboutUs2 from '@/components/Mine/AboutUs2' // 关于我们  取消该功能
import Version from '@/components/Mine/Version' // 版本说明

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/supply',
      name: 'supply',
      component: supply
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/UserAgreement',
      name: 'UserAgreement',
      component: UserAgreement
    },
    {
      path: '/ChangePwd',
      name: 'ChangePwd',
      component: ChangePwd
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/Index/Main', // 主页
          name: 'Main',
          component: Main
        },
        {
          path: '/Index/QuanMain', // 圈子
          name: 'QuanMain',
          component: QuanMain
        },
        {
          path: '/Index/LoveCar', // 爱车
          name: 'LoveCar',
          component: LoveCar
        },
        {
          path: '/Index/QualityMain', // 质造
          name: 'QualityMain',
          component: QualityMain
        },
        {
          path: '/Index/Mine', // 我的
          name: 'Mine',
          component: Mine
        }
      ]
    },
    {
      path: '/Index/PointsMall',
      name: 'PointsMall',
      component: PointsMall,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Index/ProductDetail',
      name: 'ProductDetail',
      component: ProductDetail,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Index/ConfirmOrder',
      name: 'ConfirmOrder',
      component: ConfirmOrder,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Index/ConfirmOrderList',
      name: 'ConfirmOrderList',
      component: ConfirmOrderList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Index/ConfirmOrderJiFen',
      name: 'ConfirmOrderJiFen',
      component: ConfirmOrderJiFen,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Index/ConfirmOrderListJiFen',
      name: 'ConfirmOrderListJiFen',
      component: ConfirmOrderListJiFen,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Index/AddrManage',
      name: 'AddrManage',
      component: AddrManage
    },
    {
      path: '/Index/EditAddr',
      name: 'EditAddr',
      component: EditAddr
    },
    {
      path: '/Index/AddAddr',
      name: 'AddAddr',
      component: AddAddr
    },
    {
      path: '/Index/ConfirmBack',
      name: 'ConfirmBack',
      component: ConfirmBack
    },
    {
      path: '/Index/SecondCar',
      name: 'SecondCar',
      component: SecondCar
      // meta: {
      //   keepAlive: true
      // }
    },
    {
      path: '/Index/SecondCarQian',
      name: 'SecondCarQian',
      component: SecondCarQian
    },
    {
      path: '/Index/SecondCarDetail',
      name: 'SecondCarDetail',
      component: SecondCarDetail
    },
    {
      path: '/Index/PublishCar',
      name: 'PublishCar',
      component: PublishCar
    },
    {
      path: '/Index/PublishCar2',
      name: 'PublishCar2',
      component: PublishCar2
      // meta: {
      //   keepAlive: true
      // }
    },
    {
      path: '/Quan/QuanPublish',
      name: 'QuanPublish',
      component: QuanPublish
    },
    {
      path: '/Quan/QuanDetail',
      name: 'QuanDetail',
      component: QuanDetail
    },
    {
      path: '/Car/ChooseCar',
      name: 'ChooseCar',
      component: ChooseCar,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Car/ChooseBrand',
      name: 'ChooseBrand',
      component: ChooseBrand
    },
    {
      path: '/Car/ConfirmConfig',
      name: 'ConfirmConfig',
      component: ConfirmConfig
    },
    {
      path: '/Car/MindLatter',
      name: 'MindLatter',
      component: MindLatter
    },
    {
      path: '/Car/ConfirmBack2',
      name: 'ConfirmBack2',
      component: ConfirmBack2
    },
    {
      path: '/Car/CarConfig',
      name: 'CarConfig',
      component: CarConfig
    },
    {
      path: '/Car/MaintainCalcu',
      name: 'MaintainCalcu',
      component: MaintainCalcu
    },
    {
      path: '/Car/MaintainAdvice',
      name: 'MaintainAdvice',
      component: MaintainAdvice
    },
    {
      path: '/Car/InvitedGift',
      name: 'InvitedGift',
      component: InvitedGift
    },
    {
      path: '/Car/CarShare',
      name: 'CarShare',
      component: CarShare
    },
    {
      path: '/DownLoad',
      name: 'DownLoad',
      component: DownLoad
    },
    {
      path: '/Car/CarRules',
      name: 'CarRules',
      component: CarRules
    },
    {
      path: '/Car/SetCar',
      name: 'SetCar',
      component: SetCar
    },
    {
      path: '/Car/ServiceAddr',
      name: 'ServiceAddr',
      component: ServiceAddr
    },
    {
      path: '/Car/CarArticleDetail',
      name: 'CarArticleDetail',
      component: CarArticleDetail
    },
    {
      path: '/Quality/QualityProductDetail',
      name: 'QualityProductDetail',
      component: QualityProductDetail
      // meta: {
      //   keepAlive: true
      // }
    },
    {
      path: '/Quality/ShopCar',
      name: 'ShopCar',
      component: ShopCar,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Quality/EditShopCar',
      name: 'EditShopCar',
      component: EditShopCar,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Mine/Info',
      name: 'Info',
      component: Info
    },
    {
      path: '/Mine/Message',
      name: 'Message',
      component: Message
    },
    {
      path: '/Mine/AllMessage',
      name: 'AllMessage',
      component: AllMessage
    },
    {
      path: '/Mine/ModifyNickname',
      name: 'ModifyNickname',
      component: ModifyNickname
    },
    {
      path: '/Mine/ModifyPhone',
      name: 'ModifyPhone',
      component: ModifyPhone
    },
    {
      path: '/Mine/Des',
      name: 'Des',
      component: Des
    },
    {
      path: '/Mine/Set',
      name: 'Set',
      component: Set
    },
    {
      path: '/Mine/OrderList',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/Mine/OrderDetail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/Mine/OrderDetailjifen',
      name: 'OrderDetailjifen',
      component: OrderDetailjifen
    },
    {
      path: '/Mine/TieZi',
      name: 'TieZi',
      component: TieZi
    },
    {
      path: '/Mine/Collect',
      name: 'Collect',
      component: Collect
    },
    {
      path: '/Mine/Help',
      name: 'Help',
      component: Help
    },
    {
      path: '/Mine/HelpList',
      name: 'HelpList',
      component: HelpList
    },
    {
      path: '/Mine/MsgCenter',
      name: 'MsgCenter',
      component: MsgCenter
    },
    {
      path: '/Mine/MsgList',
      name: 'MsgList',
      component: MsgList
    },
    {
      path: '/Mine/Setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/Mine/FeedBack',
      name: 'FeedBack',
      component: FeedBack
    },
    // 改功能已取消
    {
      path: '/Mine/AboutUs',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/Mine/AboutUs2',
      name: 'AboutUs2',
      component: AboutUs2
    },
    {
      path: '/Mine/Version',
      name: 'Version',
      component: Version
    }
  ]
})
