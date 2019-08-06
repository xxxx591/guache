<template>
  <div class="ConfirmConfig">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">确认配置</div>
    </div>
    <div class="box flex-h">
      <div class="txt">颜色:蓝天</div>
      <div class="price">¥5000</div>
    </div>
    <div class="box flex-h">
      <div class="txt">后翻：9m</div>
      <div class="price">¥5000</div>
    </div>
    <div class="box flex-h">
      <div class="txt">自选车桥：BPW桥</div>
      <div class="price">¥5000</div>
    </div>
    <div class="box flex-h">
      <div class="txt">自选轮胎：玲珑</div>
      <div class="price">¥5000</div>
    </div>
    <div class="box flex-h">
      <div class="txt">自选钢圈：9.0-16</div>
      <div class="price">¥5000</div>
    </div>
    <div class="info">
      购买说明：
      <br>平台以订单异常、系统升级为由要求您点击任何网址链接进行退 款操作。
    </div>

    <div class="bottom flex-h">
      <div class="b-left flex-h">
        <div class="left-txt">合计:</div>
        <div class="left-price">¥999</div>
      </div>
      <div class="btn flex-h flex-cc">确认预订</div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  // 确认配置
  name: 'ConfirmConfig',
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  created() {
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    topBack() {
      this.native.back_btn({})
      this.$router.back(-1)
    },

  }
}
</script>

<style lang='less' scoped>
.ConfirmConfig {
  .top {
    height: 85px;
    position: relative;
    border-bottom: 1px solid #e6e6e6; /*no*/
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
    width: 690px;
    height: 110px;
    box-sizing: border-box;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6; /*no*/

    .txt {
      font-size: 32px;
      color: #333333;
    }
    .price {
      font-size: 32px;
      color: #ff5d25;
      font-weight: bold;
    }
  }
  .info {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    color: #999999;
    font-size: 24px;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 110px;
    padding: 0 30px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    .b-left {
      height: 30px;
      .left-txt {
        font-size: 20px;
        height: 20px;
        line-height: 20px;
        color: #333333;
        align-self: flex-end;
      }
      .left-price {
        font-size: 30px;
        height: 30px;
        line-height: 30px;
        color: #ff5d25;
        padding-top: 2px;
        margin-left: 10px;
        font-weight: bold;
      }
    }
    .btn {
      width: 280px;
      height: 70px;
      background: #4ccdfa;
      border-radius: 35px;
      color: #ffffff;
      font-size: 30px;
    }
  }
}
</style>
