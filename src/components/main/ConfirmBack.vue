<template>
  <div class="ConfirmBack">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">订单回执</div>
    </div>
    <div class="c-success flex-v">
      <img src="../../assets/cuowu.png" alt class="c-img" v-if="success">
      <img src="../../assets/confirmOk.png" alt class="c-img" v-else>
      <div class="txt">{{msg}}</div>

      <div class="btn flex-h">
        <!-- <div class="back flex-h flex-cc" @click.stop="gotoHome">回首页</div> -->
        <div class="detail flex-h flex-cc" @click.stop="goPage()">查看订单</div>
      </div>
    </div>
    <div class="warning">
      温馨提示：
      <br>平台以订单异常、系统升级为由要求您点击任何网址链接进行退 款操作。
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import { setTimeout } from "timers";

export default {
  name: "ConfirmBack",
  data() {
    return {
      msg: "支付成功",
      success: false,
      payStatus: false
    };
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  methods: {
    // ...mapActions(["saveToken"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1);
    },
    gotoHome() {
      this.native.gotoHome();
    },
    goPage() {
      this.$router.push({ path: "/Mine/OrderList", query: { type: 2 } });
    },
    async init() {
      let token = await this.native.getToken({});

      let a = async function() {
        let data = await this.api.queryPay({
          token: token,
          type: self.$route.query.type,
          order_id: self.$route.query.orderid
        });
        console.log(data);
        if (data.data.status == 1) {
          this.payStatus = true;
          self.msg = "支付成功";
          self.success = false;
        } else {
          setTimeout(_ => {
            a();
          }, 500);
        }
      };
      a();
    }
  },
  mounted() {
    if (this.$route.query.type == "2") {
      // this.init();
    } else {
      this.msg = "支付成功";
      this.success = false;
    }
  }
};
</script>

<style lang='less' scoped>
.ConfirmBack {
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
  .c-success {
    width: 100%;
    height: 570px;
    justify-content: flex-end;
    align-items: center;
    .c-img {
      width: 120px;
      height: 120px;
    }
    .txt {
      font-size: 36px;
      color: #333333;
      margin: 30px 0;
    }
    .info {
      font-size: 28px;
      .info1 {
      }
      .info2 {
        color: #ff5d25;
      }
    }
    .btn {
      margin-top: 100px;
      .back {
        width: 300px;
        height: 70px;
        background: #ffffff;
        border: 1px solid #4ccdfa; /*no*/
        font-size: 30px;
        color: #4ccdfa;
        margin-right: 40px;
        border-radius: 35px;
      }
      .detail {
        width: 300px;
        height: 70px;
        background: #4ccdfa;
        font-size: 30px;
        border-radius: 35px;
        color: white;
      }
    }
  }
  .warning {
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 24px;
    color: #999999;
    box-sizing: border-box;
    width: 100%;
    padding: 0 30px;
    padding-bottom: 60px;
  }
}
</style>
