<template>
  <div class="ChooseCar">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">选择车型</div>
    </div>
    <div class="box" v-for="(item, index) in list" @click.stop="selectBrand(item)">
      <img :src="item.cover" alt class="box-car">
      <div class="box-txt">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  // 选配车辆
  name: 'ChooseCar',
  data() {
    return {
      list: []
    }
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  created() {
    this.getSecondHandCarList()
  },
  methods: {
    topBack() {
      this.native.back_btn({})
      this.$router.back(-1)
    },
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    async getSecondHandCarList() {
      let list = await this.api.carCategory({ pid: 0 })
      this.list = list.data
      console.log('list---', list)
    },
    selectBrand(car) {
      this.$router.push({ name: 'ChooseBrand', query: { id: car.id } })
    }
  }
}
</script>

<style lang='less' scoped>
.ChooseCar {
  padding-bottom: 200px;
  padding-top: 85px;
  .top {
    height: 85px;
    // position: relative;
    width: 100%;
    position: fixed;
    z-index: 9;
    background: #ffffff;
    top: 0;
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
  .box {
    width: 690px;
    height: 260px;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 30px;
    margin-bottom: 30px;
    .box-car {
      width: 100%;
      height: 100%;
    }
    .box-txt {
      width: 100%;
      height: 100%;
      line-height: 260px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 40px;
      color: white;
      font-weight: bold;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
