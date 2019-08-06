<template>
  <div class="SetCar">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">配置车辆</div>
    </div>
    <div class="box flex-h">
      <div class="box-left">
        <div
          class="box-btn"
          v-for="(item, index) in rules"
          :key="index"
          @click.stop="chooseRule(item)"
        >
          <img src="../../assets/box-btn.png" v-show="selectedRule !== item" class="box-btn-img">
          <img src="../../assets/box-btn2.png" v-show="selectedRule === item" class="box-btn-img">
          <div class="box-btn-txt" :class="{selectBtn: selectedRule === item}">{{item}}</div>
        </div>
      </div>
      <div class="box-right">
        <img src="../../assets/house.png" class="box-right-img">
      </div>
    </div>
    <div class="line"></div>
    <div class="select">
      <div class="s-txt">选择配置项</div>
      <div class="s-item flex-h">
        <div class="s-ele flex-h flex-cc s-ele2">yanghong</div>
        <div class="s-ele flex-h flex-cc">yanghong</div>
      </div>
    </div>
    <div class="bbt">
      <div class="bbt-box flex-h">
        <div class="bbbt-left">¥998</div>
        <div class="bbbt-right flex-h flex-cc">继续选配</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'SetCar',
  data() {
    return {
      rules: ['颜色', '后盖', '车顶', '底盘'],
      selectedRule: ''
    }
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  created() {
    this.getCarRules()
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1)
    },
    chooseRule(item) {
      this.selectedRule = item
    },
    getCarRules() {
      console.log('router-----', this.$route.query)
    }
  }
}
</script>

<style lang='less' scoped>
.SetCar {
  width: 100%;
  min-height: 100vh;
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
    // height: 90px;
    padding: 30px;
    padding-bottom: 0;
    background: #ffffff;
    .box-left {
      background: #ffffff;
      .box-btn {
        width: 180px;
        height: 70px;
        position: relative;
        margin-bottom: 30px;
        .box-btn-img {
          width: 100%;
          height: 100%;
        }
        .box-btn-txt {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          font-size: 30px;
          color: #4ccdfa;
          text-align: center;
          line-height: 70px;
          padding-right: 20px;
          box-sizing: border-box;
        }
        .selectBtn {
          color: #ffffff;
        }
      }
    }
    .box-right-img {
      width: 486px;
      height: 486px;
      margin-left: 20px;
    }
  }
  .line {
    width: 690px;
    margin: 0 auto;
    border-top: 1px solid #e5e5e5; /*no*/
  }
  .select {
    background: #ffffff;
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    .s-txt {
      font-size: 32px;
      color: #333333;
    }
    .s-item {
      margin-top: 30px;

      .s-ele {
        height: 70px;
        // box-sizing: border-box;
        padding: 0 30px;
        border: 1px solid #e6e6e6; /*no*/
        border-radius: 35px;
        margin-right: 30px;
        font-size: 28px;
      }
      .s-ele2 {
        background: #4ccdfa;
        color: #ffffff;
      }
    }
  }
  .bbt {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 110px;
    background: #ffffff;
    .bbt-box {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 30px;
      align-items: center;
      justify-content: space-between;
      .bbbt-left {
        font-size: 40px;
        color: #ff5d25;
        font-weight: bold;
      }
      .bbbt-right {
        width: 280px;
        height: 70px;
        background: #4ccdfa;
        border-radius: 35px;
        font-size: 30px;
        color: #ffffff;
      }
    }
  }
}
</style>
