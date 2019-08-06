<template>
  <div class="ConfirmOrderList">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">确认订单</div>
    </div>
    <div class="addr flex-h" @click.stop="$router.push({name: 'AddrManage', params: {}})">
      <div class="addr-left flex-h">
        <div class="addr-pos">
          <img src="../../assets/pos.png" alt class="addr-pos-img">
        </div>
        <div class="addr-txt">
          <div class="addr-txt-name">{{addr.cnee}}</div>
          <div class="addr-txt-detail">{{addr.province + addr.city + addr.area + addr.address}}</div>
        </div>
      </div>
      <div class="addr-right">
        <img src="../../assets/right-arrow.png" class="addr-right-img">
      </div>
    </div>
    <div class="product flex-h" v-for="(item, index) in shopCarList" v-show="item.goods.selected" :key="index">
      <div class="p-left">
        <img :src="item.goods.cover" alt class="p-img">
      </div>
      <div class="p-right flex-v">
        <div class="p-title">{{item.goods.title}}</div>
        <div class="p-bottom flex-h">
          <div class="p-ji flex-h">
            <div class="p-ji-num">￥{{item.goods.price}}元</div>
            <div class="p-ji-f flex-h"></div>
          </div>
          <div class="p-num">x{{item.number}}</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="b-box flex-h">
        <div class="b-left flex-h">
          <div class="b-txt flex-h">合计:</div>
          <div class="b-txt-price flex-h">{{sumPrice}}</div>
          <div class="b-txt-txt flex-h">积分</div>
        </div>
        <div class="b-right flex-h flex-cc" @click.stop="submitOrder">提交订单</div>
      </div>
      <van-dialog v-model="payFlag"  show-cancel-button class="pay-box">
      <div class="img-box">
        <p>
          <img src="@/assets/zfb.png" alt srcset @click="payWay(2)">
        </p>
        <p class="line"></p>
        <p>
          <img src="@/assets/wx.png" alt srcset @click="payWay(1)">
        </p>
      </div>
    </van-dialog>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState, mapGetters } from "vuex";
import eventBus from '@/service/eventBus.js'

export default {
  name: 'ConfirmOrderList',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'ProductDetail') {
        // let product = vm.$route.query.product
        // vm.product = vm.$route.query.product
        // vm.buyNum = vm.$route.query.buyNum
        // vm.getDefaultAddr()
      }
    })
  },
  data() {
    return {
      product: {},
      buyNum: 0,
      addr: {},
      userInfo: {},
      payFlag:false
    }
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
      shopCarList: state => state.shopCar.shopCarList,
    }),
    ...mapGetters(['sumPrice'])
  },
  created() {
   this.product = this.$store.state.productInfo;
    this.buyNum = this.$route.query.buyNum 
    this.$store.stata.addr = this.addr
    this.getDefaultAddr()
    this.getUserInfo()
  },
  methods: {
    // ...mapActions(["saveToken"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    async submitOrder() {
      // if (this.userInfo.usable_integral == 0 || this.userInfo.usable_integral < this.sumPrice) {
      //   this.$toast('您的积分不够!')
      //   return
      // }
      this.payFlag = true
      
    },
   async payWay(id){
     this.payFlag =false;
     let shopCarIdArr = []
      this.shopCarList.forEach((item, index) => {
        if (item.goods.selected) {
          shopCarIdArr.push(item.id)
        }
      })
      let token = await this.native.getToken({})
      let result = await this.api.confirmOrder_quality({
        token: token.token,
        cart_id: shopCarIdArr,
        address_id: this.addr.id,
      })
      let orderId = result.data.order_id  // 获取到订单号
      // console.log(orderId.data.order_id);
    // 支付开始
    let params = {
        token: token.token,
        pay_type: id,
        goods_order_id: orderId //订单号
      };
      let list = await this.api.getGoodCarPay(params);
      console.log("list------", list);
      let payid = '';
      if (id == 2 ) {
        payid = 0 
      }else{
        payid = 1
      }
      let payObj = {
        type: payid,
        data: list
      };
      let payResolve = await this.native.gotoPay(payObj);
      console.log(payResolve);
      this.$router.push({ path: "ConfirmBack",query:{orderid:orderId,type:'2'}});
    },
    async getDefaultAddr() {
      let token = await this.native.getToken({})
      let list = await this.api.addrList({ token: token.token, page: 1, pagesize: 1000 })
      if (list.data && list.data.data) {
        list.data.data.forEach((addr, index) => {
          if (addr.often) {
            this.addr = addr
          }
        })
      }
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1)
    },
    async getUserInfo() {
      let token = await this.native.getToken({})
      let info = await this.api.userDetail({ token: token.token })
      this.userInfo = info.data
    },
  }
}
</script>

<style lang='less' scoped>
.ConfirmOrderList {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
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
  .addr {
    height: 140px;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 0 30px;
    align-items: center;
    background: #ffffff;
    margin-bottom: 20px;
    .addr-left {
      align-items: center;
      .addr-pos {
        width: 35px;
        height: 44px;
        .addr-pos-img {
          width: 100%;
          height: 100%;
        }
      }
      .addr-txt {
        margin-left: 30px;

        .addr-txt-name {
          font-size: 32px;
          color: #333333;
        }
        .addr-txt-detail {
          flex-grow: 1;
          font-size: 24px;
          color: #999999;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    .addr-right {
      width: 13px;
      height: 28%;
      .addr-right-img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .product {
    width: 100%;
    height: 260px;
    background: #ffffff;
    box-sizing: border-box;
    padding: 30px;
    .p-left {
      width: 200px;
      height: 200px;
      background: #f9f9f9;
      overflow: hidden;
      border-radius: 10px;
      .p-img {
        width: 100%;
        height: 100%;
      }
    }
    .p-right {
      flex-grow: 1;
      margin-left: 23px;
      flex-direction: column;
      justify-content: space-between;
      .p-title {
        font-size: 28px;
        color: #333333;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .p-bottom {
        justify-content: space-between;
        .p-ji {
          // border: 1px solid blue; /*no*/
          height: 30px;
          .p-ji-num {
            font-size: 25px;
            height: 100%;
            color: #ff5d25;
            font-weight: bold;
          }
          .p-ji-f {
            height: 100%;
            font-size: 25px;
            color: #ff5d25;
            align-items: flex-end;
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
    width: 100%;
    height: 110px;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffffff;
    .b-box {
      width: 100%;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 30px;
      .b-left {
        .b-txt {
          height: 30px;
          font-size: 20px;
          line-height: 20px;
          align-items: flex-end;
        }
        .b-txt-price {
          font-size: 30px;
          height: 30px;
          line-height: 25px;
          align-items: flex-end;
          color: #ff5d25;
          font-weight: bold;
        }
        .b-txt-txt {
          height: 30px;
          font-size: 15px;
          line-height: 15px;
          align-items: flex-end;
          color: #ff5d25;
        }
      }
      .b-right {
        width: 280px;
        height: 70px;
        background: #4ccdfa;
        border-radius: 35px;
        color: #ffffff;
        font-size: 30px;
      }
    }
  }
  .pay-box {
    .img-box {
      display: flex;
     padding: 0.666667rem 1.266667rem;
      img {
        width: 2.16rem /* 162/75 */;
        height: 0.746667rem /* 56/75 */;
      }
    }
    .line {
      position: relative;
      padding: 0 0.773333rem /* 58/75 */;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        border-right: .026667rem /* 2/75 */ solid #e6e6e6;
        height: 100%;
      }
    }
  }
}
</style>
