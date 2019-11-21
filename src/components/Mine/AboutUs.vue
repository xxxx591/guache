<template>
  <div class="AboutUs">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">关于我们</div>
    </div>
    <div class="content" v-html="this.content"></div>
    <div class="box flex-v">
      <img src="../../assets/logo.png" class="b-logo">
      <div class="b-title">挂车之家 v1.0.2</div>
      <div class="b-phone">客服热线：400-0135-880</div>
      <div class="b-email">客服邮箱：305139045@qq.com</div>
    </div>
    <div class="bottom">
      <div class="bo-box flex-v flex-cc">
        <div class="bo-title" @click="tieziDetails">《挂车之家用户协议》</div>
        <div class="bo-title2">CopyRight @挂车之家2015 - 2017</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'AboutUs',
  data() {
    return {
      content: ''
    }
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  created() {
    // this.getServiceContent()
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    async getServiceContent() {
      let token = await this.native.getToken({})
      // 内容id：1服务协议，2意向通用条款与条件，3用户协议，4关于我们
      let data = await this.api.pageInfo({ token: token.token, content_id: 7 })
      this.content = data.data && data.data.content
      console.log('data---', data)
    },
    tieziDetails(item) {
      // this.$store.state.yuanhang = 1;
      this.$router.push({
        path: "/Mine/AboutUs3",
        
      });
    },
    topBack() {
      this.native.back_btn({})
      this.$router.back(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.AboutUs {
  .top {
    height: 85px;
    // position: relative;
    border-bottom: 1px solid #e6e6e6; /*no*/
    background: #ffffff;
    position: fixed;
    width: 100%;
    top: 0;
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
  .content {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;
    padding-top: 80px;
  }
  .box {
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    .b-logo {
      width: 205px;
      height: 205px;
      margin-top: 140px;
    }
    .b-title {
      font-size: 32px;
      color: #333333;
      margin-top: 30px;
    }
    .b-phone {
      font-size: 28px;
      color: #666666;
      margin-top: 30px;
    }
    .b-email {
      font-size: 28px;
      color: #666666;
      margin-top: 20px;
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .bo-box {
      .bo-title {
        font-size: 24px;
        color: #4ccdfa;
      }
      .bo-title2 {
        font-size: 24px;
        color: #999999;
        margin-top: 30px;
        margin-bottom: 40px;
      }
    }
  }
}
// display: -webkit-box;
// -webkit-box-orient: vertical;
// -webkit-line-clamp: 2;
// text-overflow: ellipsis;
// overflow: hidden;
</style>
