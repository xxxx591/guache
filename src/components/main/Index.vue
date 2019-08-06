<template>
  <div class="Index">
    <router-view/>
    <div class="tabs flex-h" v-if="config.env === 0">
      <div class="tab flex-v flex-cc" @click.stop="changeTab(0)">
        <div class="tab-box">
          <img src="../../assets/main-0.png" v-show="tab !== 0" class="tab-gim">
          <img src="../../assets/main-1.png" v-show="tab === 0" class="tab-gim">
        </div>
        <div class="tab-txt" :class="{'tab-txt-active': tab === 0}">主页</div>
      </div>
      <div class="tab flex-v flex-cc" @click.stop="changeTab(1)">
        <div class="tab-box">
          <img src="../../assets/quan-0.png" v-show="tab !== 1" class="tab-gim">
          <img src="../../assets/quan-1.png" v-show="tab === 1" class="tab-gim">
        </div>
        <div class="tab-txt" :class="{'tab-txt-active': tab === 1}">圈子</div>
      </div>
      <div class="tab flex-v flex-cc" @click.stop="changeTab(2)">
        <div class="tab-box">
          <img src="../../assets/car-0.png" v-show="tab !== 2" class="tab-gim">
          <img src="../../assets/car-1.png" v-show="tab === 2" class="tab-gim">
        </div>
        <div class="tab-txt" :class="{'tab-txt-active': tab === 2}">爱车</div>
      </div>
      <div class="tab flex-v flex-cc" @click.stop="changeTab(3)">
        <div class="tab-box">
          <img src="../../assets/make-0.png" v-show="tab !== 3" class="tab-gim">
          <img src="../../assets/make-1.png" v-show="tab === 3" class="tab-gim">
        </div>
        <div class="tab-txt" :class="{'tab-txt-active': tab === 3}">质造</div>
      </div>
      <div class="tab flex-v flex-cc" @click.stop="changeTab(4)">
        <div class="tab-box">
          <img src="../../assets/mine-0.png" v-show="tab !== 4" class="tab-gim">
          <img src="../../assets/mine-1.png" v-show="tab === 4" class="tab-gim">
        </div>
        <div class="tab-txt" :class="{'tab-txt-active': tab === 4}">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'Index',
  data() {
    return {
      currentTab: 0
    }
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
      tab: state => state.datas.tab,
    })
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    changeTab(tabNum) {
      this.currentTab = tabNum
      switch (tabNum) {
        case 0:   // 主页
          this.$router.push('/Index/Main')
          break;
        case 1:   // 圈子
          this.$router.push('/Index/QuanMain')
          break;
        case 2:   // 爱车
          this.$router.push('/Index/LoveCar')
          break;
        case 3:   // 质造
          this.$router.push('/Index/QualityMain')
          break;
        case 4:   // 我的
          this.$router.push('/Index/Mine')
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang='less' scoped>
.Index {
  width: 100vw;
  height: 100vh;
  // border: 1px solid blue;
  box-sizing: border-box;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 100px;
  .tabs {
    width: 100%;
    height: 95px;
    // box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffffff;
    border-top: 2px solid #e5e5e5;
    align-items: center;
    z-index: 999;
    justify-content: space-between;
    flex-wrap: nowrap;
    .tab {
      width: 140px;
      height: 70px;
      margin-top: 5px;
      .tab-box {
        width: 40px;
        height: 40px;
        .tab-gim {
          width: 100%;
          height: 100%;
        }
      }
      .tab-txt {
        font-size: 22px;
        color: #999999;
        margin-top: 5px;
      }
      .tab-txt-active {
        color: #4ccdfa;
      }
    }
  }
}
</style>
