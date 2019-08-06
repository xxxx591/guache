<template>
  <div class="Version">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">版本说明</div>
    </div>
    <div class="box">
      <div class="box-tit">2019-03-28</div>
      <div class="box-tit">V 2.0.0</div>
      <div class="box-tit">1.购物满88包邮，48小时退款，30天无忧退货</div>
      <div class="box-tit">2.邀请好友，领走300元</div>
      <div class="box-tit">3.商品标签，一眼Get商</div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'Version',
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
      // this.native.back_btn({})
      this.$router.back(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.Version {
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
    padding: 30px;
    box-sizing: border-box;
    margin-top: 20px;
    .box-tit {
      font-size: 28px;
      color: #666666;
      margin: 30px 0;
    }
  }
}
// display: -webkit-box;
// -webkit-box-orient: vertical;
// -webkit-line-clamp: 2;
// text-overflow: ellipsis;
// overflow: hidden;
</style>
