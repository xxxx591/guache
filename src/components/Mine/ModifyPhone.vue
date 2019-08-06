<template>
  <div class="ModifyPhone">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">修改手机号码</div>
    </div>

    <div class="box">
      <div class="input-box flex-h">
        <div class="txt">手机号:</div>
        <input
          type="text"
          placeholder="请输入"
          maxlength="11"
          v-model="phoneNum"
          autofocus="autofocus"
          @blur="inputBlur"
          class="value"
        >
      </div>
      <div class="input-box flex-h">
        <div class="txt">验证码:</div>
        <input type="text" placeholder="请输入" v-model="authCode" @blur="inputBlur" class="value">
        <div class="code" @click.stop="getAuthCode">{{countNum2 ? countNum2 : '获取验证码'}}</div>
      </div>
      <!-- <div class="input-box flex-h">
        <div class="txt">密码:</div>
        <input :type="pwdType" placeholder="请输入" v-model="password" class="value" @blur="inputBlur">
        <div class="see" @click.stop="seePWD">
          <img v-show="pwdType === 'text'" src="../../assets/login-see.png" alt class="see-img">
          <img
            v-show="pwdType === 'password'"
            src="../../assets/login-nosee.png"
            alt
            class="see-img"
          >
        </div>
      </div>-->

      <div class="btn flex-h flex-cc" @click.stop="certain">确认</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Toast } from "mint-ui";

export default {
  name: "ModifyPhone",
  data() {
    return {
      pwdType: "password", // password  text
      phoneNum: "",
      authCode: "",
      password: "",
      codeFlag: false,
      countNum2: 0
    };
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
      mobileHeight: state => state.datas.mobileHeight
    })
  },
  created() {
    // this.phoneNum = this.$route.query.mobile;
  },
  methods: {
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

      this.api.authCode({ mobile: this.phoneNum, type: 3 });

      this.tool.time(() => {
        this.countNum2--;
        if (this.countNum2 === 0) {
          this.codeFlag = false;
          this.tool.time(() => {});
        }
      });
    },
    async certain() {
      if (this.tool.checkPhoneNum(this.phoneNum) === false) return;
      if (
        this.tool.checkEmpty(
          [this.phoneNum, this.authCode],
          ["手机号不能为空!", "验证码不能为空!"]
        ) === false
      )
        return;
      // let pushId = await this.native.getJPushId({})
      let token = await this.native.getToken({});
      let result = await this.api.modifyPhone({
        mobile: this.phoneNum,
        code: this.authCode,
        token: token.token
      });
      if (result.error_code === 0) {
        this.native.saveToken({ token: "" });
        this.$toast("修改手机成功");
        this.native.gotoHome();
      }
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1);
    }
  }
};
</script>

<style lang='less' scoped>
.ModifyPhone {
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  min-height: 100vh;
  .top {
    height: 85px;
    position: relative;
    border-bottom: 2px solid #e6e6e6;
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
    height: 100%;
    box-sizing: border-box;
    padding: 30px;
    padding-top: 0;
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
}
</style>
