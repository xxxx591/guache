<template>
  <div class="Login">
    <!-- <div class="Login" v-bind:style="{height: bodyHeight + 'px'}"> -->
    <div class="top" @click.stop="loginBack">
      <img src="../../assets/back-arrow.png" alt class="top-back">
      <div class="top-txt">登陆</div>
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
      <div class="txt">密码:</div>
      <input
        type="password"
        placeholder="请输入"
        maxlength="18"
        v-model="password"
        @blur="inputBlur"
        class="value"
      >
    </div>
    <div class="forget-pwd flex-h" @click.stop="$router.push({name: 'ChangePwd'})">忘记密码？</div>

    <div class="btn flex-h flex-cc" @click.stop="goLogin">登录</div>
    <div class="btn2 flex-h flex-cc" @click.stop="$router.push('/Register')">创建账号</div>

    <div class="third-login">
      <div class="tl-top flex-h flex-cc">
        <div class="tl-line"></div>
        <div class="tl-txt">其它方式登录</div>
        <div class="tl-line"></div>
      </div>
      <div class="tl-third flex-h flex-cc">
        <div class="tl-con" @click.stop="thirdLogin('wx')">
          <div class="tl-box flex-h flex-cc">
            <img src="../../assets/weixin.png" class="tl-wx-img">
          </div>
          <div class="tl-title flex-h flex-cc">微信登录</div>
        </div>
        <div class="tl-con tl-ml" @click.stop="thirdLogin('qq')">
          <div class="tl-box tl-box2 flex-h flex-cc">
            <img src="../../assets/qq.png" class="tl-wx-img-qq">
          </div>
          <div class="tl-title flex-h flex-cc">QQ登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { mapActions, mapState } from "vuex";

export default {
  name: "Login",
  // beforeRouteLeave(to, from, next) {
  //   this.setLoading(true)
  //   next()
  // },
  data() {
    return {
      phoneNum: "",
      password: "",
      bodyHeight: 0
    };
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
      mobileHeight: state => state.datas.mobileHeight
    })
  },
  created() {
    this.setLoading(true);
  },
  mounted() {
    console.log('url地址',window.location.href);
    
    this.bodyHeight = window.document.body.clientHeight;
    this.setLoading(false);
  },
  methods: {
    ...mapActions(["saveToken", "setLoading"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    async goLogin() {
      let pushId = await this.native.getJPushId({});
      console.log(pushId);
      if (this.tool.checkPhoneNum(this.phoneNum) === false) return;
      if (
        this.tool.checkEmpty(
          [this.phoneNum, this.password],
          ["手机号不能为空!", "密码不能为空!"]
        ) === false
      )
        return;
      let loginResult = await this.api.loginByPhone({
        mobile: this.phoneNum,
        code: "",
        password: this.password,
        jpush_id: pushId.jpush_id
        // jpush_id: 'a1'
      });
      console.log(loginResult);

      if (loginResult.data && loginResult.data.token) {
        // this.saveToken(loginResult.data.token);

        this.native.saveToken({ token: loginResult.data.token });
      } else {
        // this.$toast('密码或账号错误!')
      }
    },
    async thirdLogin(str) {
      let pushId = await this.native.getJPushId({});
      console.log(pushId);

      if (str === "wx") {
        let result = await this.native.wxLogin({});
        // this.$toast(result);
        console.log("wx登陆-----", result);
        // this.$toast('微信登录' + result.jpush_id, 6000)
        let data = await this.api.loginByOther({
          type: "2",
          auth_token: result.auth_token,
          jpush_id: pushId.jpush_id
        });
        console.log("data-------", data);
        // console.log('data-------',data.error_code);
        if (data.error_code == "1028") {
          this.$router.push({
            path: "supply",
            query: {
              type: "2",
              auth_token: result.auth_token,
              jpush_id: pushId.jpush_id
            }
          });
        } else {
          console.log("没遇见这个情况啊");
          console.log(data.data.token);
          this.native.saveToken({ token: data.data.token });
        }
      }
      if (str === "qq") {
        let result = await this.native.qqLogin({});
        if (result.auth_token) {
          // this.$toast('QQ登录' + result.auth_token, 6000)
          let data = await this.api.loginByOther({
            type: "1",
            auth_token: result.auth_token,
            jpush_id: pushId.jpush_id
          });
          if (data.error_code == "1028") {
            this.$router.push({
              path: "supply",
              query: {
                type: "1",
                auth_token: result.auth_token,
                jpush_id: pushId.jpush_id
              }
            });
          } else {
            console.log("没遇见这个情况啊");
            console.log(data.data.token);
            this.native.saveToken({ token: data.data.token });
          }
        }
      }
    },
    loginBack() {
      console.log("loginBack---");
      this.native.login_back_btn({});
    }
  }
};
</script>

<style lang='less' scoped>
.Login {
  width: 100vw;
  // height: 100vh;
  box-sizing: border-box;
  padding: 30px;
  background: #ffffff;
  position: relative;
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
  .btn2 {
    width: 640px;
    height: 88px;
    border: 2px solid #4ccdfa;
    border-radius: 44px;
    color: #4ccdfa;
    font-size: 36px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .forget-pwd {
    font-size: 24px;
    color: #999999;
    margin-top: 20px;
    width: 100%;
    flex-direction: row-reverse;
    // padding: 0 30px;
  }
  .third-login {
    // position: absolute;
    // bottom: 40px;
    // left: 50%;
    // transform: translateX(-50%);
    margin-top: 50px;
    .tl-top {
      .tl-line {
        width: 60px;
        border-bottom: 1px solid #e5e5e5; /*no*/
      }
      .tl-txt {
        font-size: 28px;
        color: #999999;
        margin: 0 20px;
      }
    }
    .tl-third {
      margin-top: 40px;
      .tl-con {
        .tl-box {
          width: 80px;
          height: 80px;
          border-radius: 40px;
          border: 1px solid #44c250; /*no*/
          overflow: hidden;
          .tl-wx-img {
            width: 40px;
            height: 34px;
          }
          .tl-wx-img-qq {
            width: 36px;
            height: 38px;
          }
        }
        .tl-box2 {
          border-color: #4496e1;
        }
        .tl-title {
          font-size: 22px;
          color: #333333;
          margin-top: 10px;
        }
      }
      .tl-ml {
        margin-left: 160px;
      }
      .tl-qq {
      }
    }
  }
}
</style>
