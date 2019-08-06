<template>
  <div class="Setting">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">设置</div>
    </div>
    <div class="box">
      <div class="b-box flex-h">
        <div class="b-left flex-h">
          <div class="b-txt">给我们好评</div>
        </div>
        <div class="b-arrow">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div class="b-box flex-h">
        <div class="b-left flex-h">
          <div class="b-txt">留言反馈</div>
        </div>
        <div class="b-arrow">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div class="b-box flex-h">
        <div class="b-left flex-h">
          <div class="b-txt">关于我们</div>
        </div>
        <div class="b-arrow">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div class="b-box flex-h">
        <div class="b-left flex-h">
          <div class="b-txt">版本说明</div>
        </div>
        <div class="b-arrow">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div class="b-box flex-h">
        <div class="b-left flex-h">
          <div class="b-txt">清除缓存</div>
        </div>
        <div class="b-arrow">
          <div class="b-arrow-img">888k</div>
        </div>
      </div>
    </div>
    <div class="btn flex-h flex-cc">退出登录</div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'Setting',
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
.Setting {
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
    .b-box {
      justify-content: space-between;
      width: 690px;
      box-sizing: border-box;
      // padding: 0 30px;
      align-items: center;
      height: 110px;
      margin: 0 auto;
      border-bottom: 1px solid #e6e6e6; /*no*/
      background: #ffffff;
      .b-left {
        flex-grow: 1;
        align-items: center;
        .b-txt {
          font-size: 32px;
          color: #333333;
        }
      }
      .b-arrow {
        .b-arrow-img {
          min-width: 16px;
          height: 29px;
          font-size: 32px;
          color: #333333;
        }
      }
    }
  }
  .btn {
    position: fixed;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    width: 640px;
    height: 88px;
    border-radius: 44px;
    border: 1px solid #4ccdfa; /*no*/
    font-size: 36px;
    color: #4ccdfa;
  }
}
// display: -webkit-box;
// -webkit-box-orient: vertical;
// -webkit-line-clamp: 2;
// text-overflow: ellipsis;
// overflow: hidden;
</style>
