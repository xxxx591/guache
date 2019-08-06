<template>
  <div class="ArticleDetail">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">文章详情</div>
    </div>
    <div class="main">
      <div class="main-title">波兰Wielton ZJ7J35波兰Wielton ZJ7J35波兰Wielton ZJ7J35</div>
      <div class="main-des">苍栅式挂车苍栅式挂车苍栅式挂车苍栅式挂车苍栅式挂车</div>
      <div class="main-line"></div>
    </div>
    <div class="content">文章内容</div>

    <div class="bottom flex-h">
      <div class="b-left flex-h">
        <!-- <img src="../../assets/collect.png" class="b-img"> -->
        <img src="../../assets/uncollect.png" class="b-img">
        <div class="b-txt">收藏</div>
      </div>
      <div class="b-btn flex-h flex-cc">立即预订</div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'ArticleDetail',
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
.ArticleDetail {
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
  .main {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    .main-title {
      font-size: 40px;
      color: #333333;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: bold;
    }
    .main-des {
      font-size: 28px;
      color: #999999;
      margin-top: 10px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .main-line {
      margin-top: 40px;
      border: 1px solid #e6e6e6;
    }
  }
  .content {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
  }
  .bottom {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 110px;
    box-sizing: border-box;
    justify-content: space-between;
    border-top: 1px solid #e6e6e6; /*no*/
    align-items: center;
    padding: 30px;
    .b-left {
      align-items: center;
      .b-img {
        width: 44px;
        height: 44px;
      }
      .b-txt {
        font-size: 22px;
        color: #999999;
        margin-left: 18px;
      }
    }
    .b-btn {
      width: 380px;
      height: 70px;
      background: #4ccdfa;
      border-radius: 35px;
      font-size: 28px;
      color: #ffffff;
    }
  }
}
</style>
