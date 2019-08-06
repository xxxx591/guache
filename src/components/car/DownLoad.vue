<template>
  <div class="DownLoad">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">下载APP</div>
    </div>
    <div class="box flex-v">
      <img src="../../assets/logo.png" alt class="box-img">
      <div class="box-title">挂车之家</div>
      <div class="box-des">挂车司机之家</div>
      <div class="box-btn flex-h flex-cc">Android版下载</div>
      <div class="box-btn flex-h flex-cc">IOS版下载</div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'DownLoad',
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
      this.native.back_btn({})
      this.$router.back(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.DownLoad {
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
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    .box-img {
      width: 205px;
      height: 205px;
      margin-top: 140px;
    }
    .box-title {
      font-size: 40px;
      color: #333333;
      margin-top: 20px;
    }
    .box-des {
      font-size: 28px;
      color: #999999;
      margin-top: 20px;
      margin-bottom: 315px;
    }
    .box-btn {
      background: #4ccdfa;
      width: 480px;
      height: 88px;
      border-radius: 44px;
      color: #ffffff;
      font-size: 36px;
      margin-top: 40px;
    }
  }
}
</style>
