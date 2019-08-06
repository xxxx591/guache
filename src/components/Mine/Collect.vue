<template>
  <div class="Collect">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back" />
      <div class="top-txt">我的收藏</div>
    </div>
    <div class="scroll flex-h">
      <div
        class="scroll-item"
        :class="{'scroll-active': currentTab === index}"
        @click.stop="changeTab(index)"
        v-for="(item, index) in scrollTitle"
        :key="index"
      >{{item.val+' '+item.num}}</div>
      <div class="scroll-right">.</div>
    </div>
    <div class="box flex-h" >
      <div class="box-pro" v-for="(item,index) in shopList" :key="index">
        <div class="b-top" @click="goosDetails(item)">
          <img :src="item.goods.cover" class="b-top-img" />
        </div>
        <div class="b-title">{{item.goods.title}}</div>
        <div class="b-price">{{item.goods.price}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: "Collect",
  data() {
    return {
      scrollTitle: [
        { val: "商品", num: 0 },
        { val: "帖子", num: 0 },
        { val: "车辆", num: 0 }
      ],
      shopList:[],
      currentTab: 0,
      token: ""
    };
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.token = await this.native.getToken();
      let params = {
        token: this.token,
        page:0,
        pagesize:30
      };
      let data = await this.api.getAllNum(params);
      console.log("data", data);
      this.scrollTitle[0].num = data.data.goods_collect;
      this.scrollTitle[1].num = data.data.note_collect;
      this.scrollTitle[2].num = data.data.trailer_collect;
      let data1 = await this.api.getShops(params)
      console.log('data1',data1);
      this.shopList = data1.data.data
    },
    inputBlur() {
      window.scrollTo(0, 0);
    },
    changeTab(tabNum) {
      this.currentTab = tabNum;
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1);
    }
  }
};
</script>

<style lang='less' scoped>
.Collect {
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
  .scroll {
    width: 100%;
    box-sizing: border-box;
    height: 90px;
    border-bottom: 2px solid #e5e5e5;
    align-items: center;
    overflow-x: scroll;
    .scroll-item {
      margin-right: 170px;
      white-space: nowrap;
      height: 88px;
      line-height: 100px;
      box-sizing: border-box;
      border-radius: 2px;
      font-size: 28px;
      padding: 0 8px;
    }
    .scroll-item:nth-child(1) {
      margin-left: 45px;
    }
    .scroll-active {
      border-bottom: 6px solid #4ccdfa;
      color: #4ccdfa;
    }
    .scroll-right {
      width: 1px;
      visibility: hidden;
    }
  }
  .box {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    flex-wrap: wrap;
    .box-pro {
      width: 335px;
      margin-bottom: 30px;
      padding: 10px;
      box-sizing: border-box;
      .b-top {
        width: 335px;
        height: 335px;
        border: 1px solid #e6e6e6; /*no*/
        border-radius: 10px;
        box-sizing: border-box;
        .b-top-img {
          width: 100%;
          height: 100%;
        }
      }
      .b-title {
        font-size: 24px;
        color: #333333;
        margin-top: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .b-price {
        font-size: 24px;
        color: #ff5d25;
        font-weight: bold;
        margin-top: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .box-pro:nth-child(2n) {
      margin-left: 20px;
    }
  }
}
</style>
