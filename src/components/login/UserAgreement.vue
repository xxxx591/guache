<template>
  <div class="UserAgreement">
    <div class="top">
      <div class="top-txt">服务协议</div>
      <img src="../../assets/back-arrow.png" @click="topBack" class="top-back">
    </div>
    <div class="txt" v-html="content.content || ''"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'UserAgreement',
  data() {
    return {
      content: {}
    }
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
    })
  },
  created() {
    this.getServiceContent()
  },
  methods: {
    async getServiceContent() {
      // 内容id：1服务协议，2意向通用条款与条件，3用户协议，4关于我们
      let data = await this.api.pageInfo({  content_id: 3 })
      this.content = data.data
      console.log('data---', data)
    },
    topBack() {
      this.native.back_btn({})
      this.$router.back(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.UserAgreement {
  padding: 30px;
  box-sizing: border-box;
  padding-top: 90px;
  .top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    height: 85px;
    background: #ffffff;
    border-bottom: 1px solid #e6e6e6; /*no*/
    .top-txt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      // font-weight: 700;
    }
    .top-back {
      position: absolute;
      top: 50%;
      left: 30px;
      transform: translate(0, -50%);
      width: 25px;
      height: 45px;
    }
  }
}
</style>
