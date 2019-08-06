<template>
  <div class="Help">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">帮助中心</div>
    </div>
    <div class="con flex-h">
      <div class="con-left flex-v flex-cc" @click.stop="waiter">
        <img src="../../assets/contact.png" class="con-img">
        <div class="con-txt">在线客服</div>
      </div>
      <div class="con-right flex-v flex-cc">
        <img src="../../assets/server.png" class="con-img">
        <div class="con-txt">客服热线</div>
      </div>
    </div>
    <div class="box">
      <!--  -->
      <div
        class="b-box flex-h"
        v-for="(item, index) in helpList"
        :key="index"
        @click.stop="$router.push({name: 'HelpList', query: {id: item.id}})"
      >
        <div class="b-left flex-h">
          <div class="b-txt">{{item.name}}</div>
        </div>
        <div class="b-arrow">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <!-- <div class="b-box flex-h" @click.stop="$router.push({name: 'HelpList'})">
        <div class="b-left flex-h">
          <div class="b-txt">常见问题</div>
        </div>
        <div class="b-arrow">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div class="b-box flex-h" @click.stop="$router.push({name: 'HelpList'})">
        <div class="b-left flex-h">
          <div class="b-txt">购买问题</div>
        </div>
        <div class="b-arrow">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div class="b-box flex-h" @click.stop="$router.push({name: 'HelpList'})">
        <div class="b-left flex-h">
          <div class="b-txt">使用问题</div>
        </div>
        <div class="b-arrow">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div class="b-box flex-h" @click.stop="$router.push({name: 'HelpList'})">
        <div class="b-left flex-h">
          <div class="b-txt">售后问题</div>
        </div>
        <div class="b-arrow">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'Help',
  data() {
    return {
      helpList: []
    }
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  async created() {
    let token = await this.native.getToken({})
    let list = await this.api.helpList({ token: token.token, page: 1, pagesize: 10000 })
    this.helpList = list.data.data
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    topBack() {
      this.native.back_btn({})
      // this.$router.back(-1)
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
.Help {
  min-width: 100vw;
  min-height: 100vh;
  background: #f7f8fa;
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
  .con {
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    align-items: center;
    background: #ffffff;
    margin-bottom: 20px;
    .con-left {
      flex-grow: 1;
      height: 100px;
    }
    .con-right {
      flex-grow: 1;
      height: 100px;
      border-left: 1px solid #e5e5e5; /*no*/
    }
    > div {
      .con-img {
        width: 80px;
        height: 62px;
      }
      .con-txt {
        font-size: 28px;
        color: #333333;
      }
    }
  }
  .box {
    background: #ffffff;
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
        }
      }
      .b-arrow {
        .b-arrow-img {
          min-width: 16px;
          height: 29px;
        }
      }
    }
  }
}
</style>
