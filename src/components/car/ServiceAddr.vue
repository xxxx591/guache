<template>
  <div class="ServiceAddr">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">服务网点</div>
    </div>
    <div class="box" v-for="(item, index) in [1,2,3,4,5]">
      <div class="box-top flex-h">
        <div class="b-left">
          <div class="b-title">北京网点</div>
          <div class="b-des">北京 | 五星网点 | 1845 次服务</div>
        </div>
        <div class="b-right">
          <img src="../../assets/phone.png" class="b-right-img">
          <img src="../../assets/phone2.png" class="b-right-img2">
        </div>
      </div>
      <div class="box-imgs flex-h">
        <img src="../../assets/temp5.png" class="box-img">
        <img src="../../assets/temp5.png" class="box-img">
        <img src="../../assets/temp5.png" class="box-img">
        <img src="../../assets/temp5.png" class="box-img">
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'ServiceAddr',
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
.ServiceAddr {
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
  .box {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    background: #ffffff;
    margin-bottom: 20px;
    .box-top {
      justify-content: space-between;
      .b-left {
        .b-title {
          font-size: 32px;
          color: #333333;
        }
        .b-des {
          font-size: 28px;
          color: #999999;
        }
      }
      .b-right {
        width: 80px;
        height: 80px;
        position: relative;
        .b-right-img {
          width: 100%;
          height: 100%;
        }
        .b-right-img2 {
          width: 34px;
          height: 37px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .box-imgs {
      width: 100%;
      justify-content: space-between;
      margin-top: 28px;
      .box-img {
        width: 165px;
        height: 165px;
      }
    }
  }
}
</style>
