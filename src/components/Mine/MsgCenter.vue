
<template>
  <div class="MsgCenter">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">消息中心</div>
    </div>
    <div class="box">
      <div class="t-info flex-h">
        <div class="t-head flex-h">
          <div class="t-img">
            <img src="../../assets/online-server.png" class="t-img2">
          </div>
          <div class="t-box flex-v">
            <div class="t-title" @click.stop="waiter">在线客服</div>
            <div class="t-des">查看与客服的沟通记录</div>
          </div>
        </div>
        <div class="t-arrow flex-h">
          <div class="t-arrow-num flex-h flex-cc">98</div>
          <img src="../../assets/right-arrow.png" class="t-arrow2">
        </div>
      </div>
      <div class="t-info flex-h">
        <div class="t-head flex-h">
          <div class="t-img t-img-server">
            <img src="../../assets/server-msg.png" class="t-img2">
          </div>
          <div class="t-box flex-v">
            <div class="t-title">服务消息</div>
            <div class="t-des">查看与客服的沟通记录</div>
          </div>
        </div>
        <div class="t-arrow flex-h">
          <div class="t-arrow-num flex-h flex-cc">88</div>
          <img src="../../assets/right-arrow.png" class="t-arrow2">
        </div>
      </div>
      <div class="t-info flex-h">
        <div class="t-head flex-h">
          <div class="t-img t-img-sys">
            <img src="../../assets/alerm2.png" class="t-img2-sys">
          </div>
          <div class="t-box flex-v">
            <div class="t-title">系统消息</div>
            <div class="t-des">板车订购交货时间延后说明</div>
          </div>
        </div>
        <div class="t-arrow flex-h">
          <div class="t-arrow-num flex-h flex-cc">6698</div>
          <img src="../../assets/right-arrow.png" class="t-arrow2">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'MsgCenter',
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1)
    },
    waiter() {
      (function (m, ei, q, i, a, j, s) {
        m[i] = m[i] || function () {
          (m[i].a = m[i].a || []).push(arguments)
        };
        j = ei.createElement(q),
          s = ei.getElementsByTagName(q)[0];
        j.async = true;
        j.charset = 'UTF-8';
        j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t';
        s.parentNode.insertBefore(j, s);
      })(window, document, 'script', '_MEIQIA');
      window._MEIQIA('entId', 147235);
    }
  }
}
</script>

<style lang='less' scoped>
.MsgCenter {
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
  .box {
    .t-info {
      width: 100%;
      box-sizing: border-box;
      padding: 30px;
      justify-content: space-between;
      align-items: center;
      .t-head {
        .t-img {
          min-width: 121px;
          max-width: 121px;
          height: 121px;
          border-radius: 60px;
          background: #4ccdfa;
          position: relative;
          .t-img2 {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 54px;
            height: 44px;
          }
          .t-img2-sys {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 45px;
            height: 45px;
          }
        }
        .t-img-server {
          background: #ff8340;
        }
        .t-img-sys {
          background: #ff5176;
        }

        .t-box {
          margin-left: 28px;
          justify-content: center;
          .t-title {
            font-size: 32px;
            color: #333333;
            font-weight: bold;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .t-des {
            font-size: 24px;
            color: #999999;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
      .t-arrow {
        min-width: 13px;
        height: 28px;
        align-items: center;
        .t-arrow-num {
          min-width: 40px;
          height: 40px;
          border-radius: 20px;
          background: #ff2525;
          color: #ffffff;
          padding: 0 10px;
        }
        .t-arrow2 {
          min-width: 13px;
          height: 28px;
          margin-left: 20px;
        }
      }
    }
  }
}
// display: -webkit-box;
// -webkit-box-orient: vertical;
// -webkit-line-clamp: 2;
// text-overflow: ellipsis;
// overflow: hidden;
</style>
