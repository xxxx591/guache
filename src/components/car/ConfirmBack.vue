<template>
  <div class="ConfirmBack">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">预订回执</div>
    </div>
    <div class="box flex-v">
      <img src="../../assets/back-ok.png" alt class="box-img">
      <div class="box-title">我们已收到您的预订</div>
      <div class="box-des">专属客服会尽快与您取得联系</div>
      <div class="box-btns flex-h">
        <div class="box-btn flex-h flex-cc" @click.stop="gotoHome">回首页</div>
        <div class="box-btn flex-h box-active flex-cc" @click.stop="gotoOrderList">查看订单</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'ConfirmBack',
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
    gotoHome() {
      this.native.gotoHome()
    },
    gotoOrderList() {
      // TODOS
      console.log('查看订单')
    }
  }
}
</script>

<style lang='less' scoped>
.ConfirmBack {
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
    // justify-content: flex-end;
    align-items: center;
    .box-img {
      width: 120px;
      height: 120px;
      margin-top: 160px;
    }
    .box-title {
      font-size: 32px;
      color: #333333;
      margin-top: 30px;
    }
    .box-des {
      font-size: 28px;
      color: #999999;
      margin-top: 30px;
    }
    .box-btns {
      margin-top: 100px;
      .box-btn {
        font-size: 32px;
        color: #4ccdfa;
        border: 1px solid #4ccdfa; /*no*/
        margin-right: 40px;
        width: 300px;
        height: 70px;
        border-radius: 35px;
      }
      .box-active {
        font-size: 32px;
        color: #ffffff;
        background: #4ccdfa;
      }
    }
  }
}
</style>
