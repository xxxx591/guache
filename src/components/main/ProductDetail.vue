<template>
  <div class="ProductDetail">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">商品详情</div>
    </div>
    <div class="banner">
      <swiper
        :options="swiperOption1"
        v-if="productInfo.point_pic && productInfo.point_pic.length"
        class="banner-swiper"
      >
        <template v-for="(item, index) in (productInfo && productInfo.point_pic)">
          <swiper-slide class="banner-swiper-item" :key="index">
            <img :src="item.pic" alt class="banner-swiper-img">
          </swiper-slide>
        </template>
      </swiper>
      <!-- <div class="swiper-pagination"></div> -->
    </div>
    <div class="info">
      <div class="title">{{productInfo.title}}</div>
      <div class="des">{{productInfo.desc}}</div>
      <div class="price-box flex-h">
        <div class="price">{{productInfo.price}}</div>
        <div class="price-txt">积分</div>
      </div>
    </div>
    <div class="car flex-h">
      <div class="car-txt">选择数量</div>
      <div class="car-box flex-h">
        <div class="car-sub flex-h flex-cc" @click.stop="subNum">-</div>
        <div class="car-num flex-h flex-cc">{{buyNum}}</div>
        <div class="car-add flex-h flex-cc" @click.stop="addNum">+</div>
      </div>
    </div>
    <div class="detail" v-html="productInfo.content">
      <!-- <img src="../../assets/temp-car.png" alt class="detail-img"> -->
    </div>
    <div class="buy">
      <div class="buy-box flex-h">
        <div class="contact flex-h" @click.stop="waiter">
          <img src="../../assets/kefu.png" alt class="contact-img">
          <div class="contact-txt">客服</div>
        </div>
        <div class="exchange flex-h flex-cc" @click.stop="nowExchange">立即兑换</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import { debuglog } from "util";

export default {
  name: "ProductDetail",
  data() {
    return {
      swiperOption1: {
        loop: true,
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
          disableOnInteraction: false,
          delay: 2500
        },
        preventLinksPropagation: false,
        pagination: {
          // el: '.swiper-pagination',
        }
      },
      buyNum: 1,
      productInfo: {},
      userInfo: {}
    };
  },
  computed: {
    ...mapState({
      token: state => state.datas.token
    })
  },
 async created() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    if (isAndroid) {
      console.log("token",this.$route.query.token);
      // console.log('state',this.$store.state.datas.token);
      let product = this.$route.params.product;
      let productid = this.$route.query.productid;
      this.$store.state.datas.token = this.$route.query.token
      this.getProductDetail(productid);
      this.getUserInfo();
    }else{
      this.$store.state.datas.token = await this.native.getToken({});
      console.log('this.$store.state.datas.token',this.$store.state.datas.token);
      
      let product = this.$route.params.product;
      let productid = this.$route.query.productid;
      let params ={
        token:this.$store.state.datas.token,
        goods_id:productid
      }
      console.log("productid---", productid);
      this.getProductDetail(productid);
      this.getUserInfo();
    }
  },
  methods: {
    // ...mapActions(["saveToken"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    subNum() {
      if (this.buyNum === 1) return;
      this.buyNum--;
    },
    addNum() {
      if (this.buyNum === 99) return;
      this.buyNum++;
    },
    async getProductDetail(id) {
      this.buyNum = 1;
      
      let data = await this.api.jifen_productDetail({
        point_id: id,
        token: this.$store.state.datas.token
      });
      this.productInfo = data.data;
    },
    topBack() {
      this.native.back_btn({});
      this.$router.back(-1);
    },
    nowExchange() {
      if (
        this.userInfo.usable_integral != 0 ||
        this.userInfo.usable_integral < this.productInfo.price
      ) {
        this.$store.state.productInfo = this.productInfo;
        this.$router.push({
          name: "ConfirmOrderJiFen",
          query: { buyNum: this.buyNum }
        });
      } else {
        this.$toast("您的积分不够!");
        return;
      }
      // buyNum: 1,
      // productInfo: {}
    },
    async getUserInfo() {
      // let token = await this.native.getToken({});
      // console.log("getUserInfo", token);
      let info = await this.api.userDetail({ token: this.$store.state.datas.token });
      this.userInfo = info.data;
      console.log("this.userInfo--", this.userInfo);
    },
    waiter() {
      (function(m, ei, q, i, a, j, s) {
        m[i] =
          m[i] ||
          function() {
            (m[i].a = m[i].a || []).push(arguments);
          };
        (j = ei.createElement(q)), (s = ei.getElementsByTagName(q)[0]);
        j.async = true;
        j.charset = "UTF-8";
        j.src = "https://static.meiqia.com/dist/meiqia.js?_=t";
        s.parentNode.insertBefore(j, s);
      })(window, document, "script", "_MEIQIA");
      window._MEIQIA("entId", 147235);
    }
  }
};
</script>

<style lang='less' scoped>
.ProductDetail {
  background: #f6f7f9;
  margin-bottom: 120px;
  padding-top: 85px;
  .top {
    height: 85px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
    background: #ffffff;
    border-bottom: 2px solid #e6e6e6;
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
  .banner {
    width: 100%;
    height: 750px;
    position: relative;
    .banner-swiper {
      width: 100%;
      height: 100%;
      .banner-swiper-item {
        width: 100%;
        height: 100%;
        .banner-swiper-img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .swiper-pagination {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .info {
    background: #ffffff;
    margin-bottom: 35px;
    padding-bottom: 20px;
    .title {
      font-size: 40px;
      line-height: 60px;
      color: #333333;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: bold;
      padding: 0 30px;
      padding-top: 30px;
      padding-bottom: 10px;
      // box-sizing: border-box;
    }
    .des {
      font-size: 28px;
      color: #999999;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      overflow: hidden;
      // font-weight: bold;
      // margin-top: 30px;
      margin-bottom: 20px;
      box-sizing: border-box;
      padding: 0 30px;
    }
    .price-box {
      height: 30px;
      box-sizing: border-box;
      padding: 0 30px;
      align-items: flex-end;
      .price {
        font-size: 30px;
        line-height: 30px;
        color: #ff5d25;
        font-weight: bold;
      }
      .price-txt {
        font-size: 20px;
        line-height: 20px;
        color: #ff5d25;
        font-weight: bold;
      }
    }
  }
  .car {
    width: 100%;
    height: 100px;
    background: #ffffff;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 30px;
    margin-bottom: 20px;
    .car-txt {
      font-size: 32px;
      color: #333333;
    }
    .car-box {
      .car-sub {
        width: 70px;
        height: 70px;
        border-top-left-radius: 35px;
        border-bottom-left-radius: 35px;
        border: 1px solid #e5e5e5; /*no*/
        font-size: 40px;
        font-weight: bold;
      }
      .car-num {
        width: 70px;
        height: 70px;
        border-top: 1px solid #e5e5e5; /*no*/
        border-bottom: 1px solid #e5e5e5; /*no*/
        font-size: 36px;
        font-weight: bold;
      }
      .car-add {
        width: 70px;
        height: 70px;
        border-top-right-radius: 35px;
        border-bottom-right-radius: 35px;
        border: 1px solid #e5e5e5; /*no*/
        font-size: 40px;
        font-weight: bold;
      }
    }
  }
  .detail {
    box-sizing: border-box;
    padding: 30px;
    background: #ffffff;
    overflow: hidden;
    .detail-img {
      width: 100%;
    }
  }
  .buy {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 110px;
    border-top: 1px solid #e5e5e5; /*no*/
    background: #ffffff;
    .buy-box {
      width: 100%;
      height: 100%;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 30px;
      align-items: center;
      .contact {
        .contact-img {
          width: 48px;
          height: 38px;
          margin-right: 15px;
        }
        .contact-txt {
          font-size: 22px;
          color: #999999;
        }
      }
      .exchange {
        width: 380px;
        height: 70px;
        background: #4ccdfa;
        font-size: 28px;
        color: white;
        border-radius: 35px;
      }
    }
  }
}
</style>
