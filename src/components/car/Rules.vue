<template>
  <div class="Rules">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">规则说明</div>
    </div>
    <ul class="box">
      <div class="item">• 参与者资格：所有平台注册用户均可参与。活动期间每位用户分享邀请码均可获得总值100元的积分(有效期7天)，每日分享次数不设</div>
      <div class="item">• 参与者资格：所有平台注册用户均可参与。活动期间每位用户分享邀请码均可获得总值100元的积分(有效期7天)，每日分享次数不设</div>
      <div class="item">• 参与者资格：所有平台注册用户均可参与。活动期间每位用户分享邀请码均可获得总值100元的积分(有效期7天)，每日分享次数不设</div>
      <div class="item">• 参与者资格：所有平台注册用户均可参与。活动期间每位用户分享邀请码均可获得总值100元的积分(有效期7天)，每日分享次数不设</div>
    </ul>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'Rules',
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
.Rules {
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
    .item {
      font-size: 32px;
      color: #666666;
      margin-bottom: 70px;
    }
  }
}
</style>
