<template>
  <div class="Share">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">分享页面</div>
    </div>
    <div class="pic">
      <img src="../../assets/share-bg.png" class="pic-img">
      <div class="pic-box">
        <div class="pic-box2 flex-v flex-cc">
          <div class="pic-top flex-h">
            <img src="../../assets/temp5.png" class="pic-top-img">
            <div class="pic-top-txt">碗里没有水 送给你</div>
          </div>
          <div class="pic-ji flex-h">
            <div class="pic-ji-num">899</div>
            <div class="pic-ji-txt">积分</div>
          </div>
          <div class="pic-in">邀请你加入 挂车之家</div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="input-box flex-h">
        <input type="text" placeholder="请输入手机号" v-model="phoneNum" @blur="inputBlur" class="value">
      </div>
      <div class="input-box flex-h">
        <input type="text" placeholder="请输入验证码" v-model="authCode" @blur="inputBlur" class="value">
        <div class="code" @click.stop="getAuthCode">{{countNum2 ? countNum2 : '获取验证码'}}</div>
      </div>
      <div class="input-box flex-h">
        <input
          type="password"
          placeholder="请设置密码"
          v-model="password"
          @blur="inputBlur"
          class="value"
        >
      </div>
      <div class="box-btn flex-h flex-cc">立即领取</div>
      <div class="info">
        活动规则：
        <br>1、平台以订单异常、系统升级为由要求您点击任何网链接进行退 款操作。
        <br>2、平台以订单异常、系统升级为由要求您点击任何网链接进行退 款操作。
        <br>3、平台以订单异常、系统升级为由要求您点击任何网链接进行退 款操作。
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'Share',
  data() {
    return {
      phoneNum: '',
      authCode: '',
      password: '',
      codeFlag: false,
      countNum2: 0
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
    getAuthCode() {
      if (this.codeFlag === true) return
      if (this.tool.checkPhoneNum(this.phoneNum) === false) return  // 检查手机号
      this.codeFlag = true  // 防止多次点击
      this.countNum2 = this.config.countNum    // 获取倒计时的时间

      this.api.authCode({ mobile: this.phoneNum, type: 1 })

      this.tool.time(() => {
        this.countNum2--
        if (this.countNum2 === 0) {
          this.codeFlag = false
          this.tool.time(() => { })
        }
      })
    },
    topBack() {
      this.native.back_btn({})
      this.$router.back(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.Share {
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
  .pic {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    position: relative;
    .pic-img {
      width: 690px;
      height: 270px;
    }
    .pic-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      .pic-box2 {
        width: 100%;
        height: 100%;
        .pic-top {
          align-items: center;
          .pic-top-img {
            width: 60px;
            height: 60px;
            border-radius: 30px;
          }
          .pic-top-txt {
            margin-left: 20px;
            font-size: 28px;
            color: #ffffff;
          }
        }
        .pic-ji {
          align-items: flex-end;
          margin-top: 20px;
          margin-bottom: 15px;
          .pic-ji-num {
            height: 55px;
            line-height: 55px;
            font-size: 55px;
            color: #fff000;
            font-weight: bold;
          }
          .pic-ji-txt {
            height: 30px;
            line-height: 30px;
            font-size: 30px;
            color: #fff000;
            padding-bottom: 5px;
            font-weight: bold;
          }
        }
        .pic-in {
          font-size: 24px;
          color: #ffffff;
        }
      }
    }
  }
  .box {
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    .input-box {
      width: 100%;
      height: 110px;
      // border-top: 2px solid #e6e6e6;
      // border-bottom: 2px solid #e6e6e6;
      align-items: center;
      background: #f7f8fa;
      margin-bottom: 20px;
      .txt {
        font-size: 32px;
        color: #333333;
        min-width: 115px;
      }
      .value {
        font-size: 32px;
        color: #333333;
        padding-left: 40px;
        flex-grow: 1;
        outline: none;
        border: none;
        background: #f7f8fa;
      }
      .code {
        min-width: 195px;
        text-align: center;
        font-size: 32px;
        color: #4ccdfa;
        border-left: 2px solid #e5e5e5;
      }
      .see {
        width: 63px;
        height: 40px;
        .see-img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .box-btn {
      width: 640px;
      height: 70px;
      background: #4ccdfa;
      border-radius: 35px;
      color: #ffffff;
      font-size: 30px;
    }
  }
  .info {
    background: #ffffff;
    width: 100%;
    box-sizing: border-box;
    color: #999999;
    font-size: 24px;
    margin-top: 80px;
  }
}
</style>
