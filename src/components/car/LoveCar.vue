<template>
  <div class="LoveCar">
    <div class="top">
      <!-- <img src="../../assets/back-arrow.png" @click.stop="$router.back(-1)" class="top-back"> -->
      <div class="top-txt">爱车</div>
      <img
        src="../../assets/plus.png"
        class="top-add"
        @click.stop="gotoPage({name: 'ChooseCar', pageUrl: '/Car/ChooseCar'})"
      >
    </div>
    <div class="banner">
      <swiper v-if="[1,2,3].length" :options="swiperOption1" class="banner-swiper">
        <template v-for="(item, index) in [1,2,3]">
          <swiper-slide class="banner-swiper-item" :key="index">
            <div class="banner-box">
              <div class="banner-top flex-h">
                <div class="banner-left flex-h">我的爱车</div>
                <div class="banner-right flex-v">
                  <div class="banner-title">苍栅式挂车苍栅式挂车苍栅式挂车</div>
                  <div class="banner-des">波兰Wielton ZJ7J35波兰Wielton ZJ7J35波兰Wielton ZJ7J35</div>
                </div>
              </div>
              <div class="banner-bottom flex-h">
                <img src="../../assets/temp5.png" class="banner-img">
                <div class="banner-gw">您的专属顾问，时振川</div>
                <img src="../../assets/arrow-right-white.png" class="banner-arrow">
              </div>
            </div>
          </swiper-slide>
        </template>
      </swiper>
    </div>
    <div class="service">
      <div class="s-title">安心服务</div>
      <div class="s-box flex-h">
        <div
          class="s-item flex-v flex-cc"
          @click.stop="gotoPage({name: 'CarConfig', pageUrl: '/Car/CarConfig'})"
        >
          <img src="../../assets/setting.png" class="s-img">
          <div class="s-txt">车辆配置</div>
        </div>
        <div
          class="s-item s-item-gap flex-v flex-cc"
          @click.stop="gotoPage({name: 'MaintainCalcu', pageUrl: '/Car/MaintainCalcu'})"
        >
          <img src="../../assets/calculate.png" class="s-img">
          <div class="s-txt">保养计算</div>
        </div>
        <div
          class="s-item flex-v flex-cc"
          @click.stop="gotoPage({name: 'MaintainAdvice', pageUrl: '/Car/MaintainAdvice'})"
        >
          <img src="../../assets/advice.png" class="s-img">
          <div class="s-txt">保养建议</div>
        </div>
        <!-- TODOS -->
        <div class="s-item flex-v flex-cc">
          <img src="../../assets/fujian.png" class="s-img">
          <div class="s-txt">周边附件</div>
        </div>
        <div
          class="s-item s-item-gap flex-v flex-cc"
          @click.stop="gotoPage({name: 'InvitedGift', pageUrl: '/Car/InvitedGift'})"
        >
          <img src="../../assets/invite.png" class="s-img">
          <div class="s-txt">邀请有礼</div>
        </div>
        <div
          class="s-item flex-v flex-cc"
          @click.stop="gotoPage({name: 'ServiceAddr', pageUrl: '/Car/ServiceAddr'})"
        >
          <img src="../../assets/netpoint.png" class="s-img">
          <div class="s-txt">服务网点</div>
        </div>
      </div>
    </div>
    <div class="car">
      <img src="../../assets/temp-car.png" class="car-img">
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'LoveCar',
  data() {
    return {
      swiperOption1: {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 0,
        // autoplay: {
        //   disableOnInteraction: false,
        //   delay: 2500
        // },
        preventLinksPropagation: false,
        pagination: {
          // el: '.swiper-pagination',
        }
      }
    }
  },
  created() {
    this.setTab(2)
    this.getMyCars()
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  methods: {
    ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    gotoPage(obj) {
      if (obj === '') return
      this.$router.push({ name: obj.name })
      // 此页面所有路由跳转都要调用此原生通知
      this.native.routerGoTo({ url: 'http://gczj.sinmore.vip/html/#' + obj.pageUrl })
    },
    gotoPage(obj) {
      if (obj === '') return
      this.$router.push({ name: obj.name, query: obj.query || {}, params: obj.params || {} })
      // 此页面所有路由跳转都要调用此原生通知
      this.native.routerGoTo({ url: 'http://gczj.sinmore.vip/html/#' + obj.pageUrl })
    },
    async getMyCars() {
      let token = await this.native.getToken({})
      this.api.myCars({ token: token.token })
    }
  }
}
</script>

<style lang='less' scoped>
.LoveCar {
  padding-bottom: 100px;
  .top {
    height: 85px;
    position: relative;
    border-bottom: 1px solid #e6e6e6; /*no*/
    background: #ffffff;
    .top-txt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 36px;
      color: #000000;
    }
    .top-add {
      width: 44px;
      height: 44px;
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translateY(-50%);
      color: #4ccdfa;
      white-space: nowrap;
      font-size: 28px;
    }
  }
  .banner {
    width: 100%;
    height: 362px;
    position: relative;
    box-sizing: border-box;
    width: 690px;
    height: 270px;
    overflow: hidden;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 60px;
    .banner-swiper {
      width: 100%;
      height: 100%;
      .banner-swiper-item {
        width: 100%;
        height: 100%;
        .banner-box {
          width: 100%;
          height: 100%;
          background: #4ccffa;
          .banner-top {
            height: 180px;
            width: 100%;
            box-sizing: border-box;
            align-items: center;
            .banner-left {
              min-width: 160px;
              max-width: 160px;
              height: 100px;
              border-right: 1px solid #ffffff; /*no*/
              font-size: 40px;
              color: #ffffff;
              font-weight: bold;
              padding: 0 30px;
              box-sizing: border-box;
              align-items: center;
              justify-content: center;
              margin-left: 20px;
            }
            .banner-right {
              margin-left: 30px;
              justify-content: space-between;
              .banner-title {
                width: 420px;
                height: 46px;
                font-size: 36px;
                color: #ffffff;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              .banner-des {
                width: 420px;
                font-size: 28px;
                height: 38px;
                color: #ffffff;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }
          }
          .banner-bottom {
            width: 630px;
            height: 90px;
            box-sizing: border-box;
            padding: 30px 0;
            border-top: 1px solid #ffffff; /*no*/
            align-items: center;
            margin: 0 auto;
            .banner-img {
              width: 50px;
              height: 50px;
              border-radius: 25px;
            }
            .banner-gw {
              font-size: 24px;
              color: #ffffff;
              margin-left: 20px;
            }
            .banner-arrow {
              width: 11px;
              height: 20px;
              margin-left: 20px;
            }
          }
        }
      }
    }
    .swiper-pagination {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .service {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;
    .s-title {
      font-size: 40px;
      color: #333333;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .s-box {
      width: 100%;
      box-sizing: border-box;
      flex-wrap: wrap;
      .s-item {
        width: 216px;
        height: 216px;
        border-radius: 10px;
        background: #f5f8fa;
        margin-bottom: 20px;
        .s-img {
          width: 62px;
          height: 62px;
          margin-bottom: 30px;
        }
        .s-txt {
          font-size: 30px;
          color: #333333;
        }
      }
      .s-item-gap {
        margin: 0 20px;
      }
    }
  }
  .car {
    width: 100%;
    height: 260px;
    box-sizing: border-box;
    padding: 30px;
    .car-img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
