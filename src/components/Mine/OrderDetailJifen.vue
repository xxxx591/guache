<template>
  <div class="OrderDetail" v-if="details ">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">订单详情</div>
    </div>
    <div class="o-box flex-h">
      <div class="o-left">
        <div class="o-txt">订单状态：{{orderstatus(orderDetails.status)}}</div>
      </div>
      <img src="../../assets/menu.png" class="o-img">
    </div>
    <div class="b-box1">
      <div class="b-box flex-h">
        <div class="b-left flex-h">
          <img src="../../assets/car-icon.png" class="b-left-icon">
          <div class="b-txt">
            <div class="b-txt1">订单编号：</div>
            <div class="b-txt2">{{orderDetails.sn}}</div>
          </div>
        </div>
        <div class="b-arrow"></div>
      </div>
      <div class="b-box box-no flex-h">
        <div class="b-left flex-h">
          <img src="../../assets/car-icon.png" class="b-left-icon">
          <div class="b-txt">
            <div class="b-txt1">发货时间：</div>
            <div class="b-txt2">{{orderDetails.delivery_time}}</div>
          </div>
        </div>
        <div class="b-arrow"></div>
      </div>
    </div>
    <div class="product">
      <div
        class="p-product flex-h"
        v-for="(item,index) in orderDetails.order_goods"
        :key="index"
        @click.stop="gotoPage({name: 'QualityProductDetail', query: { productid: item.goods_id,type:2 }})"
      >
        <div class="p-left">
          <img :src="item.cover" alt class="p-left-img">
        </div>
        <div class="p-right2 flex-v">
          <div class="p-title2">{{item.desc}}</div>
          <div class="p-bottom flex-h">
            <div class="p-price">
              <span>¥{{item.price}}</span>
              x {{item.number}}
            </div>
            <div class="p-num"></div>
          </div>
        </div>
      </div>
      <div class="p-line"></div>
      <div class="price">
        <div class="p-box flex-h">
          <div class="p-box-txt">商品金额</div>
          <div class="p-box-price">¥{{orderDetails.amount}}</div>
        </div>
        <!-- <div class="p-box p-box-top flex-h">
          <div class="p-box-txt">运费</div>
          <div class="p-box-price">¥30</div>
        </div>-->
        <div class="p-box p-box-top flex-h">
          <div class="p-box-txt">合计</div>
          <div class="p-box-price">¥{{orderDetails.amount}}</div>
        </div>
        <div class="p-line"></div>
      </div>
    </div>
    <div class="info-box">
      <div class="info-item">订单编号：{{orderDetails.sn}}</div>
      <div class="info-item info-item-mg">下单时间：{{orderDetails.created_at}}</div>
      <div class="info-item">支付方式：{{orderDetails.pay_type == 1?'微信支付':'支付宝支付'}}</div>
    </div>
    <div class="bottom flex-h">
      <div class="b-left flex-h">
        <!-- <div class="left-txt">合计:</div>
        <div class="left-price">¥999</div>-->
      </div>
      <div class="b-btns flex-h">
        <div
          class="btn btn1 flex-h flex-cc"
          v-if=" orderDetails2.status==2"
          @click="wuliu(orderDetails)"
        >查看物流</div>
        <div
          class="btn btn2 flex-h flex-cc"
          v-if="orderDetails2.status==2"
          @click="queren(orderDetails)"
        >确认收货</div>
         
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: "OrderDetail",
  data() {
    return {
      orderDetails: {},
      details: true
    };
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    }),
    orderstatus: function(str) {
      return function(str) {
        console.log("obj", this.$route.query);

        if (str == 1) {
          return "待发货";
        }
        if (str == 2) {
          return "待收货";
        }
        if (str == 3) {
          return "交易完成";
        }
      };
    }
  },
  created() {},
  mounted() {
    this.orderDetails = {};
    this.isType2 = false;
    this.init2();
  },
  methods: {
    async queren(item) {
      let token = await this.native.getToken({});
      let data = this.api.jfqueren({
        token: token,
        order_id: item.id
      });
      console.log("data", data);
      this.$router.back(-1);
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
    gotoPage(obj) {
      // if (obj === '') return
      this.$router.push({
        name: obj.name,
        query: obj.query || {},
        params: obj.params || {}
      });
      // 此页面所有路由跳转都要调用此原生通知
    },
    async payWay(id) {
      let token = await this.native.getToken({});
      let params = {
        token: token,
        pay_type: this.orderDetails.pay_type,
        goods_order_id: this.orderDetails.id //订单号
      };
      let list = await this.api.getGoodCarPay(params);
      console.log("list------", list);
      let payid = "";
      if (this.orderDetails.pay_type == 2) {
        payid = 0;
      } else {
        payid = 1;
      }
      let payObj = {
        type: payid,
        data: list
      };
      let payResolve = await this.native.gotoPay(payObj);
      console.log(payResolve);
      this.$router.push({ path: "OrderList" });
    },
    async init() {
      let token = await this.native.getToken({});
      let data = await this.api.gdetail({
        token: token,
        order_id: this.$route.query.orderId
      });
      this.details = false;
      this.orderDetails = data.data;
      this.orderDetails2 = data.data;
      console.log("data", this.orderDetails);
      this.$nextTick(_ => {
        this.details = true;
      });
    },
    async init2() {
      let token = await this.native.getToken({});
      let data = await this.api.jdetail({
        token: token,
        order_id: this.$route.query.orderId
      });
      this.details = false;
      this.orderDetails = data.data;
      this.orderDetails2 = data.data;
      console.log("data", this.orderDetails);
      this.$nextTick(_ => {
        this.details = true;
      });
    },
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    topBack() {
      // this.native.back_btn({})
      if (this.$route.query.type2 == 2) {
        this.$router.push({ path: "/Mine/OrderList", query: { type2: 2 } });
      } else {
        this.$router.back(-1);
      }
    }
  }
};
</script>

<style lang='less' scoped>
.OrderDetail {
  width: 100vw;
  height: 100vh;
  background: #f7f8fa;
  margin-bottom: 100px;
  overflow: hidden;
  .top {
    height: 85px;
    position: relative;
    border-bottom: 1px solid #e6e6e6; /*no*/
    background: #ffffff;
    position: fixed;
    width: 100%;
    z-index: 9999;
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
  .o-box {
    height: 160px;
    width: 100%;
    // box-sizing: border-box;
    padding: 30px;
    justify-content: space-between;
    background: #4cd5fa;
    align-items: center;
    padding-top: 85px;
    .o-left {
      .o-txt {
        font-size: 40px;
        color: #ffffff;
        font-weight: bold;
      }
    }
    .o-img {
      width: 80px;
      height: 70px;
      margin-right: 0.8rem;
    }
  }
  .b-box1 {
    background: #ffffff;
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
          font-size: 28px;
          color: #333333;
          margin-left: 18px;
          .b-txt1 {
            font-size: 28px;
            color: #333333;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .b-txt2 {
            font-size: 24px;
            color: #999999;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        .b-left-icon {
          width: 31px;
          height: 32px;
        }
      }
      .b-arrow {
        .b-arrow-img {
          min-width: 16px;
          height: 29px;
        }
      }
    }
    .box-no {
      border: none;
      margin-bottom: 20px;
    }
  }
  .product {
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;
    .p-product {
      width: 100%;
      box-sizing: border-box;
      padding: 30px;
      overflow: hidden;
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
            span {
              color: #ff5d25;
              font-weight: bold;
            }
            font-size: 32px;
          }
          .p-num {
            font-size: 28px;
            color: #999999;
          }
        }
      }
    }
    .p-line {
      width: 690px;
      margin: 0 auto;
      border-bottom: 1px solid #e6e6e6; /*no*/
    }
    .price {
      padding: 30px;
      padding-bottom: 0;
      box-sizing: border-box;
      margin-bottom: 20px;
      .p-box {
        width: 100%;
        justify-content: space-between;
        .p-box-txt {
          font-size: 28px;
          color: #333333;
        }
        .p-box-price {
          font-size: 28px;
          color: #999999;
        }
      }
      .p-box-top {
        margin: 30px 0;
      }
      .p-price2 {
        .bottom {
          // position: fixed;
          // bottom: 0;
          // left: 0;
          width: 100%;
          height: 100px;
          // padding: 0 30px;
          box-sizing: border-box;
          justify-content: flex-end;
          align-items: center;
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
        }
      }
    }
  }
  .info-box {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    background: #ffffff;
    .info-item {
      font-size: 28px;
      color: #999999;
    }
    .info-item-mg {
      margin: 20px 0;
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 110px;
    padding: 0 30px;
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
</style>
