<template>
  <div class="OrderList" v-if="showFlag">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">订单列表</div>
    </div>
    <div class="tab flex-h">
      <div
        class="tab-1 flex-h flex-cc"
        :class="{'tab-active': tabNum === 1}"
        @click.stop="changeTab(1, 'order')"
      >商品订单</div>
      <div
        class="tab-1 flex-h flex-cc"
        :class="{'tab-active': tabNum === 2}"
        @click.stop="changeTab(2, 'jiFen')"
      >积分订单</div>
    </div>
    <div style="padding-top:85px;" v-if="tabNum==1">
      <div class="package" v-for="(item, index) in orders" :key="index">
        <div class="p-title flex-h">
          <div class="p-left">订单号：{{item.sn}}</div>
          <div class="p-right">{{item.statusText}}</div>
        </div>
        <div
          class="p-product flex-h"
          v-for="(item, index) in item.order_goods"
          :key="index"
          @click="ckDetails(item)"
        >
          <div class="p-left">
            <img :src="item.cover" alt class="p-left-img">
          </div>
          <div class="p-right2 flex-v">
            <div class="p-title2">{{item.title}}</div>
            <div class="p-bottom flex-h">
              <div class="p-price">
                <span>¥{{item.price}}</span>
                x {{item.number}}
              </div>
            </div>
          </div>
        </div>
        <div class="bottom flex-h">
          <div class="b-left flex-h">
            <div class="left-txt">合计:</div>
            <div class="left-price">¥{{item.amount}}</div>
          </div>
          <div class="b-btns flex-h" v-if="item.status ==3">
            <div class="btn btn1 flex-h flex-cc" @click="wuliu(item)">查看物流</div>
            <div class="btn btn2 flex-h flex-cc" @click="queren(item)">确认收货</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="tabNum==2" style="padding-top:85px;">
      <div class="package" v-for="(item, index) in orders" :key="index">
        <div class="p-title flex-h">
          <div class="p-left">订单号：{{item.sn}}</div>
          <div class="p-right">{{statusJifen(item.status)}}</div>
        </div>
        <div
          class="p-product flex-h"
          v-for="(item, index) in item.order_point"
          :key="index"
          @click="ckDetails2(item)"
        >
          <div class="p-left">
            <img :src="item.cover" alt class="p-left-img">
          </div>
          <div class="p-right2 flex-v">
            <div class="p-title2">{{item.title}}</div>
            <div class="p-bottom flex-h">
              <div class="p-price">
                <span>{{item.price}}积分</span>
                x {{item.number}}
              </div>
            </div>
          </div>
        </div>
        <div class="bottom flex-h">
          <div class="b-left flex-h">
            <div class="left-txt">合计:</div>
            <div class="left-price">{{item.amount}}积分</div>
          </div>
          <div class="b-btns flex-h" v-if=" item.status ==2">
            <div class="btn btn1 flex-h flex-cc" @click="wuliu(item)">查看物流</div>
            <div class="btn btn2 flex-h flex-cc" @click="querenjifen(item)">确认收货</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: "OrderList",
  data() {
    return {
      tabNum: 1,
      orders: [],
      showFlag: true
    };
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    }),
    statusJifen(num){
      return function (num) {
        switch (num) {
          case 1:
            return '待发货'
            break;
          case 2:
            return '待收货'
            break;
          case 3:
            return '交易完成'
            break;
        
          default:
            break;
        }
      }
    }
  },
  created() {
     
    console.log("看看type是多少?", this.$route);
    if (this.$route.query.type == 2) {
      this.tabNum = 2;
      this.getOrderData("jiFen");
    } else if (this.$route.query.type2 == 2) {
      this.tabNum = 2;
      this.getOrderData("jiFen");
    } else {
      this.tabNum = 1;
      this.getOrderData("order");
    }
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    changeTab(num, str) {
      this.tabNum = num;
      this.getOrderData(str);
    },
    topBack() {
      // if (this.$route.query.type) {
      //   console.log("123");
      //   this.$router.back(-1);
      // } else {
        this.native.back_btn({});
      // }
    },
    async getOrderData(type = "order") {
      this.orders = [];
      let token = await this.native.getToken({});
      let list;
      if (type === "order") {
        list = await this.api.orderList({
          token: token.token,
          page: 1,
          pagesize: 10000
        });
      }
      if (type === "jiFen") {
        list = await this.api.jiFenList({
          token: token.token,
          page: 1,
          pagesize: 10000
        });
      }
      if (list.error_code !== 0) {
        return;
      }
      list.data.data.forEach((item, index) => {
        switch (item.status) {
          case 1:
            item.statusText = "待支付";
            break;
          case 2:
            item.statusText = "待发货";
            break;
          case 3:
            item.statusText = "待收货";
            break;
          case 4:
            item.statusText = "交易完成";
            break;
          case 5:
            item.statusText = "交易关闭";
            break;
          default:
            item.statusText = "";
            break;
        }
      });
      this.orders = list.data.data;
      console.log("list---", this.orders);
    },
    async queren(item) {
      let token = await this.native.getToken({});
      let data = this.api.mqueren({
        token: token,
        order_id: item.id
      });
      console.log(data);
      if (this.tabNum == 2) {
        this.getOrderData("jiFen");
      } else {
        this.tabNum = 1;
        this.getOrderData("order");
      }
      this.showFlag = false;
      this.$nextTick(_ => {
        this.showFlag = true;
      });
    },
    async querenjifen(item) {
      let token = await this.native.getToken({});
      let data = this.api.jfqueren({
        token: token,
        order_id: item.id
      });
      console.log(data);
      if (this.tabNum == 2) {
        this.getOrderData("jiFen");
      } else {
        this.tabNum = 1;
        this.getOrderData("order");
      }
      this.showFlag = false;
      this.$nextTick(_ => {
        this.showFlag = true;
      });
    },
    wuliu(item) {
      this.$dialog
        .alert({
          title: "物流单号",
          message: "您的物流单号为：" + item.track_number
        })
        .then(() => {
          // on close
        });
    },
    ckDetails(item) {
      console.log(item);
      this.$router.push({
        path: "OrderDetail",
        query: {
          orderId: item.order_id,
          type2: "1"
        }
      });
    },
    ckDetails2(item) {
      console.log(item);
      this.$router.push({
        path: "OrderDetailjifen",
        query: {
          orderId: item.order_id,
          type2: "2"
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.OrderList {
  min-width: 100vw;
  min-height: 100vh;
  background: #f7f8fa;
  .top {
    height: 85px;
    position: relative;
    border-bottom: 1px solid #e6e6e6; /*no*/
    background: #ffffff;
    position: fixed;
    width: 100%;
    z-index: 999;
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
  .tab {
    width: 100%;
    height: 90px;
    box-sizing: border-box;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
    background: #ffffff;
    position: fixed;
    top: 85px;
    .tab-1 {
      font-size: 28px;
      color: #999999;
      height: 100%;
      box-sizing: border-box;
      border-bottom: 6px solid #ffffff;
    }
    .tab-active {
      border-bottom: 6px solid #4ccdfa;
      color: #4ccdfa;
    }
  }
  .package {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;
    // margin-top: 30px;
    background: #ffffff;
    .p-title {
      align-items: center;
      height: 80px;
      border-bottom: 1px solid #e6e6e6; /*no*/
      justify-content: space-between;
      .p-left {
        font-size: 28px;
        color: #333333;
      }
      .p-right {
        font-size: 28px;
        color: #4ccdfa;
      }
    }
    .p-product {
      width: 100%;
      box-sizing: border-box;
      padding: 30px;
      overflow: hidden;
      border-bottom: 1px solid #e6e6e6; /*no*/
      .p-left {
        min-width: 200px;
        max-width: 200px;
        height: 200px;
        background: #f9f9f9;
        border-radius: 10px;
        overflow: hidden;
        .p-left-img {
          width: 100%;
          height: 100%;
        }
      }
      .p-right2 {
        margin-left: 23px;
        justify-content: space-between;
        .p-title2 {
          font-size: 28px;
          color: #333333;
        }
        .p-bottom {
          justify-content: space-between;
          .p-price {
            font-size: 32px;
            span {
              color: #ff5d25;
              font-weight: bold;
            }
          }
          .p-num {
            font-size: 28px;
            color: #999999;
          }
        }
      }
    }
    .bottom {
      // position: fixed;
      // bottom: 0;
      // left: 0;
      width: 100%;
      height: 110px;
      // padding: 0 30px;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      .b-left {
        height: 30px;
        .left-txt {
          font-size: 20px;
          height: 20px;
          line-height: 20px;
          color: #333333;
          align-self: flex-end;
        }
        .left-price {
          font-size: 30px;
          height: 30px;
          line-height: 30px;
          color: #ff5d25;
          padding-top: 2px;
          margin-left: 10px;
          font-weight: bold;
        }
      }
      .btn {
        width: 160px;
        height: 60px;
        // background: #4ccdfa;
        border-radius: 30px;
        color: #ffffff;
        font-size: 30px;
      }
      .btn1 {
        font-size: 28px;
        color: #666666;
        border: 1px solid #666666; /*no*/
      }
      .btn2 {
        font-size: 28px;
        color: #4ccdfa;
        border: 1px solid #4ccdfa; /*no*/
        margin-left: 20px;
      }
    }
  }
}
</style>
