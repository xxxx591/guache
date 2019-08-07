<template>
  <div class="Set">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">设置</div>
    </div>
    <div class="box">
      <div class="b-box flex-h" @click="gogood">
        <div class="b-left flex-h">
          <div class="b-txt">给我们好评</div>
        </div>
        <div class="b-arrow flex-h">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div
        class="b-box flex-h"
        @click.stop="gotoPage({name: 'FeedBack', pageUrl: '/Mine/FeedBack'})"
      >
        <div class="b-left flex-h">
          <div class="b-txt">留言反馈</div>
        </div>
        <div class="b-arrow flex-h">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div class="b-box flex-h" @click.stop="gotoPage({name: 'AboutUs2', pageUrl: '/Mine/AboutUs2'})">
        <div class="b-left flex-h">
          <div class="b-txt">关于我们</div>
        </div>
        <div class="b-arrow flex-h">
          <!-- <div class="b-arrow-txt">我的简介是新墨科技产品经理</div> -->
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div class="b-box flex-h" @click.stop="gotoPage({name: 'Version', pageUrl: '/Version'})">
        <div class="b-left flex-h">
          <div class="b-txt">版权说明</div>
        </div>
        <div class="b-arrow flex-h">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div class="b-box flex-h">
        <div class="b-left flex-h">
          <div class="b-txt">清除缓存</div>
        </div>
        <div class="b-arrow flex-h">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
    </div>
    <div class="btn-txt">
      <div class="btn-bbox flex-h flex-cc" @click.stop="logout">退出登录</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: 'Set',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
    })
  },
  created() {
    // this.getUserInfo()
  },
  methods: {
    gogood(){
      this.routerGoTo(' itms-apps://itunes.apple.com/cn/app/id1459483792?mt=8')
    },
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    gotoPage(obj) {
      if (obj === '') return
      this.$router.push({ name: obj.name })
      // 此页面所有路由跳转都要调用此原生通知
      // this.native.routerGoTo({ url: 'http://gczj.sinmore.vip/html/#' + obj.pageUrl })
    },
    // 退出登录
    async logout() {
      this.native.saveToken({ token: '' })
      this.$toast('成功退出!') 
        this.native.gotoHome() 
    },
    topBack() {
      this.native.back_btn({})
      // this.$router.back(-1)
    },
  }
}
</script>

<style lang='less' scoped>
.Set {
  background: #ffffff;
  min-height: 100vh;
  .top {
    height: 85px;
    position: relative;
    border-bottom: 1px solid #e6e6e6; /*no*/
    background: #ffffff;
    .top-back {
      width: 25px;
      height: 45px;
      position: absolute;
      top: 50%;
      left: 30px;
      transform: translateY(-50%);
    }
    .top-txt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 36px;
      color: #000000;
    }
  }
  .head {
    width: 690px;
    height: 160px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6; /*no*/
    margin: 0 auto;
    .h-txt {
      font-size: 32px;
      color: #333333;
    }
    .h-img {
      width: 90px;
      height: 90px;
      border-radius: 45px;
    }
  }
  .box {
    width: 100%;
    height: 110px;
    .b-box {
      justify-content: space-between;
      width: 690px;
      box-sizing: border-box;
      // padding: 0 30px;
      align-items: center;
      height: 110px;
      margin: 0 auto;
      border-bottom: 1px solid #e6e6e6; /*no*/
      background: #ffffff;
      .b-left {
        flex-grow: 1;
        align-items: center;
        .b-txt {
          font-size: 32px;
          color: #333333;
          min-width: 50px;
        }
      }
      .b-arrow {
        align-items: center;
        .b-arrow-img {
          min-width: 16px;
          height: 29px;
        }
        .b-arrow-txt {
          font-size: 32px;
          color: #999999;
          margin-right: 20px;
        }
        .b-desc {
          width: 560px;
          white-space: nowrap;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
          display: flex;
          flex-direction: row-reverse;
        }
      }
    }
  }
  .btn-txt {
    width: 640px;
    height: 88px;
    border: 1px solid #4ccdfa; /*no*/
    position: fixed;
    bottom: 120px;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 44px;
    .btn-bbox {
      color: #4ccdfa;
      width: 100%;
      height: 100%;
      font-size: 36px;
    }
  }
}
</style>
