
<template>
  <div class="MsgList">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">消息列表</div>
    </div>
    <div class="box" v-for="(item, index) in [1,2,3]">
      <div class="box-time">2019-01-25 16:23</div>
      <div class="box-item flex-v">
        <div class="box-title">你购买的商品发货了你购买的商品发货了你购买的商品发货了</div>
        <div class="box-des">昆仑润滑油已经发货了，快去查看物流信息快去查看物流信息快去查看物流信息</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'MsgList',
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
.MsgList {
  width: 100vw;
  height: 100vh;
  background: #f7f8fa;
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
    padding-top: 30px;
    .box-time {
      text-align: center;
      font-size: 28px;
      color: #999999;
    }
    .box-item {
      width: 690px;
      height: 140px;
      background: #ffffff;
      margin-top: 30px;
      box-sizing: border-box;
      justify-content: center;
      padding: 0 30px;
      .box-title {
        font-size: 32px;
        color: #333333;
        font-weight: bold;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .box-des {
        font-size: 24px;
        color: #999999;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-top: 10px;
      }
    }
  }
}
</style>
