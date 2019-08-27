<template>
  <div
    class="SecondCar"
    :class="{'over-hide': isShowSelectedColorBox || isShowSelectedPriceBox || isShowSelectedYearBox || isShowSelectedWeightBox }"
  >
    <div class="top-fixed">
      <div class="top">
        <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back" />
        <div class="top-txt">二手挂车</div>
        <img
          src="../../assets/publish.png"
          class="publish"
          @click.stop="$router.push({name: 'PublishCar2', query: {type: 1}})"
        />
      </div>
      <div class="select flex-h">
        <div class="s-box" @click.stop="isShowSelectedColorBox = !isShowSelectedColorBox">
          <div class="s-box2 flex-h flex-cc">
            <div class="s-txt">{{selectedColor || '颜色'}}</div>
            <img src="../../assets/arrow-bottom.png" class="s-icon" />
          </div>
        </div>
        <div class="s-box" @click.stop="isShowSelectedPriceBox = !isShowSelectedPriceBox">
          <div class="s-box2 flex-h flex-cc">
            <div class="s-txt">{{selectedPrice || '价格'}}</div>
            <img src="../../assets/arrow-bottom.png" class="s-icon" />
          </div>
        </div>
        <div class="s-box" @click.stop="isShowSelectedYearBox = !isShowSelectedYearBox">
          <div class="s-box2 flex-h flex-cc">
            <div class="s-txt">{{selectedYear || '年限'}}</div>
            <img src="../../assets/arrow-bottom.png" class="s-icon" />
          </div>
        </div>
        <div class="s-box" @click.stop="isShowSelectedWeightBox = !isShowSelectedWeightBox">
          <div class="s-box2 flex-h flex-cc">
            <div class="s-txt">{{selectedWeight || '吨位'}}</div>
            <img src="../../assets/arrow-bottom.png" class="s-icon" />
          </div>
        </div>
      </div>
    </div>
    <div class="product-box">
      <div
        class="product flex-h"
        v-for="(item, index) in carList"
        @click.stop="gotoPage({name: 'SecondCarDetail', query: { productid: item.id }, params: { product: item }, pageUrl: '/index/SecondCarDetail'})"
        :key="index"
      >
        <div class="p-left">
          <img :src="item.get_pic && item.get_pic[0].pic" class="p-left-img" />
          <div class="p-time">{{item.created_at}}</div>
        </div>
        <div class="p-right flex-v">
          <div class="p-top">
            <div class="p-title">{{item.name}}</div>
            <div class="p-des">{{item.desc}}</div>
            <div class="p-price">￥{{item.price}}万</div>
          </div>
          <div class="p-bottom flex-h">
            <div class="p-mark flex-h">{{item.get_colour.name}}</div>
            <!-- <div class="p-mark flex-h">{{item.price}}万</div> -->
            <div class="p-mark flex-h">{{item.years}}年</div>
            <div class="p-mark flex-h">{{item.load}}吨</div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="pop-box"
      v-show="isShowSelectedColorBox"
      @click.stop="isShowSelectedColorBox = !isShowSelectedColorBox"
    >
      <div class="pop-mask">
        <div class="select-color flex-v flex-cc">
          <div class="sc-title">选择颜色</div>
          <div
            class="sc-color"
            @click.stop="selectColor(item)"
            v-for="(item, index) in colorList"
            :key="index"
          >{{item.name}}</div>
        </div>
      </div>
    </div>

    <!-- 选择年限弹框 -->
    <!-- @click.stop="isShowSelectedYearBox = !isShowSelectedYearBox" -->
    <div
      class="select-box1"
      v-show="isShowSelectedYearBox"
      @click.stop="isShowSelectedYearBox = !isShowSelectedYearBox"
      @mousemove.stop="tempMove"
    >
      <div class="select-box s-year">
        <div class="select-box-txt">
          <div class="seb-box flex-h flex-cc">
            <div
              class="seb-box-cancel flex-h flex-cc"
              @click.stop="isShowSelectedYearBox = !isShowSelectedYearBox"
            >取消</div>
            <div class="seb-box-certain flex-h flex-cc" @click.stop="certainSelectYear">确定</div>
          </div>
        </div>
        <mt-picker :slots="yearSlots" @change="selectYear"></mt-picker>
      </div>
    </div>

    <!-- 选择价格弹框 -->
    <!-- @click.stop="isShowSelectedPriceBox = !isShowSelectedPriceBox" -->
    <div
      class="select-box1"
      v-show="isShowSelectedPriceBox"
      @click.stop="isShowSelectedPriceBox = !isShowSelectedPriceBox"
      @mousemove.stop="tempMove"
    >
      <div class="select-box s-year">
        <div class="select-box-txt">
          <div class="seb-box flex-h flex-cc">
            <div
              class="seb-box-cancel flex-h flex-cc"
              @click.stop="isShowSelectedPriceBox = !isShowSelectedPriceBox"
            >取消</div>
            <div class="seb-box-certain flex-h flex-cc" @click.stop="certainSelectPrice">确定</div>
          </div>
        </div>
        <mt-picker :slots="priceSlots" @change="selectPrice"></mt-picker>
      </div>
    </div>

    <!-- 选择吨位弹框 -->
    <!-- @click.stop="isShowSelectedWeightBox = !isShowSelectedWeightBox" -->
    <div
      class="select-box1"
      v-show="isShowSelectedWeightBox"
      @click.stop="isShowSelectedWeightBox = !isShowSelectedWeightBox"
      @mousemove.stop="tempMove"
    >
      <div class="select-box s-year">
        <div class="select-box-txt">
          <div class="seb-box flex-h flex-cc">
            <div
              class="seb-box-cancel flex-h flex-cc"
              @click.stop="isShowSelectedWeightBox = !isShowSelectedWeightBox"
            >取消</div>
            <div class="seb-box-certain flex-h flex-cc" @click.stop="certainSelectWeight">确定</div>
          </div>
        </div>
        <mt-picker :slots="weightSlots" @change="selectWeight"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import { close } from "fs";

export default {
  name: "SecondCar",
  data() {
    return {
      msg: "发布车辆",
      carList: [],
      colorList: [],
      selectedColor: "",
      selectedColorId: "",
      selectedPrice: "",
      selectedTempPrice: "",
      selectedYear: "",
      selectedTempYear: "",
      selectedWeight: "",
      selectedTempWeight: "",
      isShowSelectedColorBox: false,
      isShowSelectedPriceBox: false,
      isShowSelectedYearBox: false,
      isShowSelectedWeightBox: false,
      yearSlots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      priceSlots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      weightSlots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      searchCondition: {
        color: "",
        price: "",
        year: "",
        weight: ""
      }
    };
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
      mobileHeight: state => state.datas.mobileHeight
    }),
    setColors(str) {
      let self = this;
      return function(str) {
        let color = "";
        console.log(str);
        self.colorList.forEach(item => {
          if (item.id == str) {
            color = item.name;
          }
          return color;
        });
      };
    }
  },
  async created() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    if (isAndroid) {
      console.log("token", this.$route.query.token);
      this.$store.state.datas.token = this.$route.query.token;
      this.getSecondCarList();
      this.getColorList();
      this.createYear();
      this.createColor();
      this.createWeight();
    } else {
      this.$store.state.datas.token = await this.native.getToken({});
      this.getSecondCarList();
      this.getColorList();
      this.createYear();
      this.createColor();
      this.createWeight();
    }
  },
  methods: {
    // ...mapActions(["saveToken"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    tempClick() {},
    tempMove() {},
    async getColorList() {
      let list = await this.api.getAllColors({});
      list.data.unshift({ id: 0, name: "全部" });
      this.colorList = list.data;
      // console.log('color--list--', list)
    },
    async getSecondCarList() {
      // let token = await this.native.getToken({});
      let list = await this.api.secondHandCarList({
        token: this.$store.state.datas.token,
        page: 1,
        pagesize: 1000,
        type: 1
      });
      list.data.data.forEach((item, index) => {
        item.created_at = item.created_at.substr(0, 10);
      });
      this.carList = list.data.data;
      console.log(this.carList);
      // console.log('list---', list)
    },
    selectColor(item) {
      this.selectedColorId = item.id;
      this.selectedColor = item.name;
      this.isShowSelectedColorBox = !this.isShowSelectedColorBox;
      this.doSearch();
    },
    createYear() {
   
      let nowYear = 1;
      this.yearSlots[0].values.push("无");
      this.yearSlots[0].values.push(nowYear);
      for (let i = 0; i < 9; i++) {
        this.yearSlots[0].values.push(++nowYear);
      }
    },
    createColor() {
      let nowPrice = 1;
      this.priceSlots[0].values.push("请选择");
      this.priceSlots[0].values.push("10万元以上");
      this.priceSlots[0].values.push("20万元以上");
      this.priceSlots[0].values.push("30万元以上");
      this.priceSlots[0].values.push("40万元以上");
      this.priceSlots[0].values.push("50万元以上");
    },
    createWeight() {
      let nowWeight = 1;
      this.weightSlots[0].values.push("无");
      this.weightSlots[0].values.push(nowWeight);
      for (let i = 0; i < 49; i++) {
        this.weightSlots[0].values.push(++nowWeight);
      }
    },
    selectYear(e, year) {
      this.selectedTempYear = year[0];
    },
    selectPrice(e, price) {
      this.selectedTempPrice = price[0];
    },
    certainSelectYear() {
      if (this.selectedTempYear === "无") {
        this.selectedTempYear = "";
      }
      this.selectedYear = this.selectedTempYear;
      this.isShowSelectedYearBox = !this.isShowSelectedYearBox;
      this.doSearch();
    },
    certainSelectPrice() {
      if (this.selectedTempPrice === "请选择") {
        this.selectedTempPrice = "0";
      }
      this.selectedPrice = parseInt(this.selectedTempPrice);
      this.isShowSelectedPriceBox = !this.isShowSelectedPriceBox;
      this.doSearch();
    },
    certainSelectWeight() {
      if (this.selectedTempWeight === "无") {
        this.selectedTempWeight = "";
      }
      this.selectedWeight = this.selectedTempWeight;
      this.isShowSelectedWeightBox = !this.isShowSelectedWeightBox;
      this.doSearch();
    },
    selectWeight(e, weight) {
      this.selectedTempWeight = weight[0];
    },
    // 筛选
    async filterSecondCar() {
      let list = await this.api.filterSecondCar({
        page: 1,
        pagesize: 1000,
        colour_id: this.selectedColorId,
        price: this.selectedPrice,
        years: this.selectedYear,
        load: this.selectedWeight,
        vehicle_id: "",
        type: 1
      });
      list.data.data.forEach((item, index) => {
        item.created_at = item.created_at.substr(0, 10);
      });
      this.carList = list.data.data;
    },
    doSearch() {
      console.log("搜索");
      console.log(this.selectedColor);
      console.log(this.selectedPrice);
      console.log(this.selectedYear);
      console.log(this.selectedWeight);
      let tempArr = [];
      if (
        !this.selectedColor &&
        !this.selectedPrice &&
        !this.selectedYear &&
        !this.selectedWeight
      ) {
        this.getSecondCarList();
      } else {
        this.filterSecondCar();
      }
    },
    topBack() {
      this.native.back_btn({});
      // this.$router.back(-1)
    },
    gotoPage(obj) {
      if (obj === "") return;
      this.$router.push({
        name: obj.name,
        query: obj.query || {},
        params: obj.params || {}
      });
      // 此页面所有路由跳转都要调用此原生通知
      // this.native.routerGoTo({ url: 'http://gczj.sinmore.vip/html/#' + obj.pageUrl })
    }
  }
};
</script>

<style lang='less' scoped>
.SecondCar {
  padding-bottom: 100px;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: #ffffff;
  padding-top: 200px;
  .top-fixed {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 999;
    background: #ffffff;
    .top {
      height: 85px;
      position: relative;
      // border-bottom: 1px solid #e6e6e6; /*no*/
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
      .publish {
        width: 46px;
        height: 43px;
        position: absolute;
        top: 50%;
        right: 30px;
        transform: translateY(-50%);
      }
    }
    .select {
      width: 100%;
      height: 80px;
      box-sizing: border-box;
      border-bottom: 1px solid #e6e6e6; /*no*/
      justify-content: space-around;
      align-items: center;
      background: #ffffff;
      .s-box {
        .s-box2 {
          .s-txt {
            font-size: 28px;
            color: #333333;
            margin-right: 12px;
          }
          .s-icon {
            width: 18px;
            height: 10px;
          }
        }
      }
    }
  }
  .product-box {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    .product {
      width: 100%;
      margin-top: 30px;
      .p-left {
        min-width: 200px;
        max-width: 200px;
        height: 200px;
        position: relative;
        overflow: hidden;
        border-radius: 15px;
        .p-left-img {
          width: 100%;
          height: 100%;
        }
        .p-time {
          // width: 120px;
          height: 30px;
          line-height: 30px;
          border-top-left-radius: 10px;
          border-bottom-right-radius: 10px;
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.5);
          white-space: nowrap;
          color: #ffffff;
          font-size: 18px;
          padding: 0 15px;
          text-align: center;
        }
      }
      .p-right {
        margin-left: 30px;
        flex-grow: 1;
        justify-content: space-between;
        position: relative;
        .p-top {
          .p-title {
            font-size: 32px;
            font-weight: bold;
            color: #333333;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .p-des {
            font-size: 24px;
            color: #999999;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-top: 10px;
          }
          .p-price {
            font-size: 0.4rem;
            line-height: 0.4rem;
            color: #ff5d25;
            font-weight: bold;
            margin-top: 10px;
          }
        }
        .p-bottom {
          .p-mark {
            border: 1px solid #4ccdfa; /*no*/
            margin-right: 10px;
            font-size: 20px;
            color: #4ccdfa;
            align-items: center;
            padding: 0 10px;
            border-radius: 16px;
          }
        }
      }
    }
  }
  .select-box1 {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.7);
    .select-box {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 160px;
      background: #ffffff;
      box-sizing: border-box;
      padding: 30px;
      .select-box-txt {
        position: absolute;
        top: -70px;
        left: 0;
        width: 100%;
        height: 80px;
        background: #ffffff;
        .seb-box {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          .seb-box-cancel {
            flex-grow: 1;
            font-size: 30px;
          }
          .seb-box-certain {
            flex-grow: 1;
            font-size: 30px;
          }
        }
      }
    }
    .s-year {
      height: 400px;
    }
  }
}
.pop-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  z-index: 9;
  .pop-mask {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 10px;
    .select-color {
      width: 400px;
      padding: 30px 0;
      .sc-title {
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .sc-color {
        font-size: 30px;
        padding: 10px 0;
      }
    }
  }
}
</style>
