<template>
  <div class="MaintainAdvice">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">保养计算</div>
    </div>
    <div class="box-pro flex-v">
      <img src="../../assets/temp5.png" class="b-img">
      <div class="b-title">【苍栅式挂车】波兰Wielton【苍栅式挂车】波兰Wielton【苍栅式挂车】波兰Wielton</div>
      <div class="b-des">天蓝 丨 19英寸合金轮毂 丨 多方向雷达天蓝 丨 19英寸合金轮毂 丨 多方向雷达</div>
      <div class="b-price">¥199</div>
    </div>
    <div class="conf">
      <div class="conf-title">保养计算</div>
      <div class="c-box flex-h" v-for="(item, index) in [1,2,3,4,5]">
        <div class="c-img">
          <img src="../../assets/lin.png" alt class="c-img2">
        </div>
        <div class="c-right">
          <div class="c-kilo">3000 KM</div>
          <div class="c-des">平台以订单异常、系统升级为求您点击任何网址链接进行退 款操作。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import VDistpicker from 'v-distpicker'

export default {
  // 意向书
  name: 'MaintainAdvice',
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
.MaintainAdvice {
  min-width: 100vw;
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 200px;
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
  .box-pro {
    justify-content: center;
    align-items: center;
    background: #ffffff;
    padding: 10px;
    box-sizing: border-box;
    .b-img {
      width: 160px;
      height: 160px;
      border-radius: 10px;
      margin-top: 40px;
    }
    .b-title {
      color: #333333;
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      margin-top: 30px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .b-des {
      color: #999999;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-top: 30px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .b-price {
      margin-top: 30px;
      margin-bottom: 40px;
      font-size: 40px;
      color: #ff5d25;
      font-weight: bold;
    }
  }
  .conf {
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    background: #ffffff;
    margin-top: 20px;
    .conf-title {
      font-size: 32px;
      color: #333333;
      margin-bottom: 40px;
    }
    .c-box {
      margin-bottom: 40px;
      .c-img {
        min-width: 30px;
        max-width: 30px;
        height: 30px;
        .c-img2 {
          width: 100%;
          height: 100%;
        }
      }
      .c-right {
        margin-left: 30px;
        .c-kilo {
          font-size: 28px;
          color: #333333;
        }
        .c-des {
          font-size: 24px;
          color: #999999;
        }
      }
    }
  }
}
</style>
