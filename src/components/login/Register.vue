<template>
  <div class="Register">
    <!-- <div class="Register" v-bind:style="{height: bodyHeight + 'px'}"> -->
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">注册</div>
    </div>
    <div class="logo flex-h flex-cc">
      <img src="../../assets/logo.png" alt class="logo-img">
    </div>
    <div class="input-box flex-h">
      <div class="txt">手机号:</div>
      <input
        type="tel"
        placeholder="请输入"
        maxlength="11"
        v-model="phoneNum"
        @blur="inputBlur"
        class="value"
      >
    </div>
    <div class="input-box flex-h">
      <div class="txt">验证码:</div>
      <input
        type="tel"
        maxlength="4"
        placeholder="请输入"
        v-model="authCode"
        @blur="inputBlur"
        class="value"
      >
      <div class="code" @click.stop="getAuthCode">{{countNum2 ? countNum2 : '获取验证码'}}</div>
    </div>
    <div class="input-box flex-h">
      <div class="txt">密码:</div>
      <input :type="pwdType" placeholder="请输入" v-model="password" class="value" @blur="inputBlur">
      <div class="see" @click.stop="seePWD">
        <img v-show="pwdType === 'text'" src="../../assets/login-see.png" alt class="see-img">
        <img v-show="pwdType === 'password'" src="../../assets/login-nosee.png" alt class="see-img">
      </div>
    </div>
    <div class="read-box flex-h">
      <div class="read-gou">
        <div class="read-img-box">
          <img src="../../assets/login-read.png" alt class="read-img">
        </div>
      </div>
      <div class="read-text">我已阅读并认同</div>
      <div class="read-link" @click="$router.push('/UserAgreement')">《用户协议》</div>
    </div>
    <div class="btn flex-h flex-cc" @click.stop="goRegist">注册</div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Toast } from "mint-ui";

export default {
  name: "Register",
  data() {
    return {
      pwdType: "password", // password  text
      phoneNum: "",
      authCode: "",
      password: "",
      codeFlag: false,
      countNum2: 0,
      bodyHeight: 0
    };
  },
  created() {},
  computed: {
    ...mapState({
      mobileHeight: state => state.datas.mobileHeight
    })
  },
  mounted() {
    this.bodyHeight = window.document.body.clientHeight;
  },
  methods: {
    ...mapActions(["saveToken"]),
    seePWD() {
      this.pwdType = this.pwdType === "password" ? "text" : "password";
    },
    inputBlur() {
      window.scrollTo(0, 0);
    },
    getAuthCode() {
      if (this.codeFlag === true) return;
      if (this.tool.checkPhoneNum(this.phoneNum) === false) return; // 检查手机号
      this.codeFlag = true; // 防止多次点击
      this.countNum2 = this.config.countNum; // 获取倒计时的时间

      this.api.authCode({ mobile: this.phoneNum, type: 1 });

      this.tool.time(() => {
        this.countNum2--;
        if (this.countNum2 === 0) {
          this.codeFlag = false;
          this.tool.time(() => {});
        }
      });
    },
    async goRegist() {
      if (this.tool.checkPhoneNum(this.phoneNum) === false) return;
      if (
        this.tool.checkEmpty(
          [this.phoneNum, this.authCode, this.password],
          ["手机号不能为空!", "验证码不能为空!", "密码不能为空!"]
        ) === false
      )
        return;
      let pushId = await this.native.getJPushId({});
      let result = await this.api.registerByPhone({
        mobile: this.phoneNum,
        code: this.authCode,
        password: this.password,
        inviter_id: "",
        // jpush_id: this.config.jpush_id,
        jpush_id: pushId.jpush_id
      });
      console.log("result", result);

      // this.saveToken(result.data.token || '')
      // this.native.saveToken({ token: result.data.token })
      if (result.error_code === 0) {
        this.$toast("注册成功!");
        this.$router.push({
          path: "/Login"
        });
      } else if (result.error_code === 1002) {
        // this.$toast("账号已注册");
      }else{
        // this.$toast(result.error_msg);
      }
    },
    topBack() {
      this.native.back_btn({});
      this.$router.back(-1);
    }
  }
};
</script>

<style lang='less' scoped>
.Register {
  width: 100vw;
  // height: 100vh;
  box-sizing: border-box;
  padding: 30px;
  background: #ffffff;
  overflow: hidden;
  padding-top: 0;
  height: 100vh;
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
  .logo {
    width: 100%;
    height: 205px;
    margin-top: 23px;
    margin-bottom: 50px;
    .logo-img {
      width: 205px;
      height: 205px;
    }
  }
  .input-box {
    width: 100%;
    height: 110px;
    // border-top: 2px solid #e6e6e6;
    border-bottom: 2px solid #e6e6e6;
    align-items: center;
    .txt {
      font-size: 32px;
      color: #333333;
      min-width: 115px;
    }
    .value {
      font-size: 32px;
      color: #333333;
      padding-left: 20px;
      flex-grow: 1;
      outline: none;
      border: none;
      width: 50%;
      background: #ffffff;
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
  .read-box {
    font-size: 24px;
    align-items: center;
    margin-top: 30px;
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
  .btn {
    width: 640px;
    height: 88px;
    background: #4ccdfa;
    border-radius: 44px;
    color: white;
    font-size: 36px;
    margin: 0 auto;
    margin-top: 80px;
  }
}
</style>
