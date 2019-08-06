<template>
  <div class="MindLatter">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">意向书</div>
    </div>
    <div class="box-pro flex-v">
      <img src="../../assets/temp5.png" class="b-img">
      <div class="b-title">【苍栅式挂车】波兰Wielton【苍栅式挂车】波兰Wielton【苍栅式挂车】波兰Wielton</div>
      <div class="b-des">天蓝 丨 19英寸合金轮毂 丨 多方向雷达天蓝 丨 19英寸合金轮毂 丨 多方向雷达</div>
      <div class="b-price">¥199</div>
    </div>
    <div class="type">
      <div class="type-title">购买类型</div>
      <div class="type-box flex-h">
        <div class="type-btn type-active flex-h flex-cc">企业</div>
        <div class="type-btn flex-h flex-cc">个人</div>
      </div>
    </div>
    <div class="info">
      <div class="info-title">基本资料</div>
      <div class="box flex-h">
        <div class="left flex-h">
          <div class="txt">真实姓名：</div>
          <input type="text" placeholder="请输入" class="value">
        </div>
      </div>
      <div class="box flex-h">
        <div class="left flex-h">
          <div class="txt">手机号码：</div>
          <input type="text" placeholder="请输入" class="value">
        </div>
      </div>
      <div class="box flex-h">
        <div class="left flex-h">
          <div class="txt">身份证号：</div>
          <input type="text" placeholder="请输入" class="value">
        </div>
      </div>
      <div class="box box-last flex-h">
        <div class="left flex-h">
          <div class="txt">上牌城市：</div>
          <input type="text" placeholder="请输入" readonly class="value">
        </div>
        <div class="arrow">
          <img src="../../assets/right-arrow.png" class="arrow-img">
        </div>
      </div>
    </div>
    <div class="read-box flex-h">
      <div class="read-gou">
        <div class="read-img-box">
          <img src="../../assets/login-read.png" alt class="read-img">
        </div>
      </div>
      <div class="read-text">提交订单即视为同意</div>
      <div class="read-link" @click="$router.push('/UserAgreement')">《意向通用条款与条件》</div>
    </div>
    <div class="bottom flex-h">
      <div class="b-left flex-h">
        <div class="left-txt">预定金:</div>
        <div class="left-price">¥999</div>
      </div>
      <div class="btn flex-h flex-cc">确认预订</div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import VDistpicker from 'v-distpicker'

export default {
  // 意向书
  name: 'MindLatter',
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
.MindLatter {
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
  .type {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    background: #ffffff;
    margin: 20px 0;
    .type-title {
      font-size: 32px;
      color: #333333;
      margin-bottom: 30px;
    }
    .type-box {
      .type-btn {
        font-size: 32px;
        color: #666666;
        border: 1px solid #e6e6e6; /*no*/
        margin-right: 40px;
        width: 180px;
        height: 70px;
        border-radius: 35px;
      }
      .type-active {
        font-size: 32px;
        color: #ffffff;
        background: #4ccdfa;
      }
    }
  }
  .info {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    background: #ffffff;
    margin-bottom: 40px;
    .info-title {
      font-size: 32px;
      color: #333333;
    }
    .box {
      justify-content: space-between;
      width: 690px;
      box-sizing: border-box;
      // padding: 0 30px;
      align-items: center;
      height: 110px;
      margin: 0 auto;
      border-bottom: 1px solid #e6e6e6; /*no*/
      background: #ffffff;
      .left {
        flex-grow: 1;
        align-items: center;
        .txt {
          font-size: 32px;
          color: #333333;
        }
        .value {
          font-size: 32px;
          outline: none;
          border: none;
          padding-left: 20px;
          flex-grow: 1;
        }
      }
      .arrow {
        .arrow-img {
          min-width: 16px;
          height: 29px;
        }
      }
    }
    .box-last {
      border: none;
    }
  }
  .read-box {
    font-size: 24px;
    align-items: center;
    margin-top: 30px;
    margin-left: 30px;
    .read-gou {
      width: 24px;
      height: 24px;
      border: 2px solid black;
      box-sizing: border-box;
      margin-right: 9px;
      .read-img-box {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        .read-img {
          width: 19px;
          height: 17px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .read-text {
      color: #999999;
    }
    .read-link {
      color: #86dafb;
    }
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
    background: #ffffff;
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
