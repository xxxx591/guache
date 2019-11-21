<template>
  <div class="ProductDetail">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back" />
      <!-- <img src="../../assets/collect.png" class="top-collect"> -->
      <div class="top-txt">商品详情</div>
      <img
        src="../../assets/shoucang.png"
        alt
        class="top-icon"
        v-if="productInfo.is_collect==0"
        @click="shoucang"
      />
      <img
        src="../../assets/shoucang-on.png"
        alt
        class="top-icon"
        v-if="productInfo.is_collect==1"
        @click="shoucang"
      />
    </div>
    <div class="banner">
      <swiper
        :options="swiperOption1"
        v-if="productInfo.goods_pic && productInfo.goods_pic.length"
        class="banner-swiper"
      >
        <template v-for="(item, index) in productInfo.goods_pic">
          <swiper-slide class="banner-swiper-item" :key="index">
            <img :src="item.pic" alt class="banner-swiper-img" />
          </swiper-slide>
        </template>
      </swiper>
      <!-- <div class="swiper-pagination"></div> -->
    </div>
    <div class="info">
      <div class="title">{{productInfo.title}}</div>
      <div class="des">{{productInfo.desc}}</div>
      <div class="price-box flex-h">
        <div class="price">¥{{productInfo.price}}</div>
        <!-- <div class="price-txt">积分</div> -->
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
        <div class="contact flex-h">
          <img src="../../assets/kefu.png" alt class="contact-img" />
          <div class="contact-txt" @click.stop="waiter">客服</div>
          <img src="../../assets/shop-car.png" alt class="contact-img shop-car" />
          <div class="contact-txt" @click.stop="gouwuche">购物车</div>
        </div>
        <!-- <div class="exchange flex-h flex-cc">立即兑换</div> -->
        <div class="buy-right flex-h">
          <div class="buy-add flex-h flex-cc" @click.stop="addToShopCar">加入购物车</div>
          <div class="buy-now flex-h flex-cc" @click.stop="goBuyIt()">立即购买</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  // /Quality/QualityProductDetail
  name: "QualityProductDetail",
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     if (from.name === 'Main') {
  //       vm.buyNum = 1
  //       vm.getProductDetail(vm.$route.params.product)
  //     }
  //   })
  // },
  data() {
    return {
      swiperOption1: {
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
      productInfo: {}
    };
  },
  computed: {
    ...mapState({
      token: state => state.datas.token
    })
  },
  created() {
    let query = this.$route.query;
    console.log("query---", query);

    this.getProductDetail(query.productid);
    // this.getProductDetail(this.$route.params.product)
  },
  methods: {
    async shoucang() {
      console.log("aasd");

      let token = await this.native.getToken({});
      let params = {
        token: token,
        goods_id: this.productInfo.id
      };
      let data = await this.api.quality_goodCollect(params);
      this.productInfo.is_collect = data.data.is_collect;
    },
    goBuyIt() {
      this.$store.state.productInfo = this.productInfo;
      this.$router.push({
        name: "ConfirmOrder",
        query: { buyNum: this.buyNum }
      });
    },
    // ...mapActions(["addShopCar"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    gouwuche() {
      this.$router.push({
        path: "ShopCar",
        query: { productid: this.$route.query.productid }
      });
      // {name: 'ShopCar', params: {query:this.$route.query.productid}}
    },
    subNum() {
      if (this.buyNum === 1) return;
      this.buyNum--;
    },
    addNum() {
      if (this.buyNum === 99) return;
      this.buyNum++;
    },
    async getProductDetail(productid) {
      let token = await this.native.getToken({});
      let data = await this.api.quality_getProductDetailDetail({
        goods_id: productid,
      });
      this.productInfo = data.data;
    },
    async addToShopCar() {
      this.$toast("加入购物车成功!");
      this.productInfo.buyNum = this.buyNum;
      // this.addShopCar(this.productInfo)
      let token = await this.native.getToken({});
      console.log("token", token);

      this.api.addProductToShopCar({
        token: token.token,
        goods_id: this.productInfo.id,
        number: this.buyNum
      });
    },
    topBack() {
      console.log("route", this.$route.query);

      if (this.$route.query.type == 2) {
        this.$router.back(-1);
      } else {
        this.native.back_btn({});
      }
    },
    waiter() {
      // (function(m, ei, q, i, a, j, s) {
      //   m[i] =
      //     m[i] ||
      //     function() {
      //       (m[i].a = m[i].a || []).push(arguments);
      //     };
      //   (j = ei.createElement(q)), (s = ei.getElementsByTagName(q)[0]);
      //   j.async = true;
      //   j.charset = "UTF-8";
      //   j.src = "https://static.meiqia.com/dist/meiqia.js?_=t";
      //   s.parentNode.insertBefore(j, s);
      // })(window, document, "script", "_MEIQIA");
      // window._MEIQIA("entId", 147235);
      this.native.makeCall({
        mobile: "4000135880"
      });
    }
  }
};
</script>

<style lang='less' scoped>
.ProductDetail {
  background: #f6f7f9;
  margin-bottom: 200px;
  padding-top: 85px;
  .top {
    width: 100%;
    height: 85px;
    position: fixed;
    top: 0;
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
    .top-collect {
      width: 44px;
      height: 44px;
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translateY(-50%);
    }
    .top-icon {
      width: 0.7rem;
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -0.35rem;
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
      -webkit-line-clamp: 1;
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
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    background: #ffffff;
    p {
      font-size: 12px !important;
    }
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
        .shop-car {
          margin-left: 30px;
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
    .buy-right {
      .buy-add {
        width: 190px;
        height: 70px;
        border-top-left-radius: 35px;
        border-bottom-left-radius: 35px;
        border: 1px solid #4ccdfa; /*no*/
        font-size: 28px;
        color: #4ccdfa;
      }
      .buy-now {
        width: 190px;
        height: 70px;
        border-top-right-radius: 35px;
        border-bottom-right-radius: 35px;
        border: 1px solid #4ccdfa; /*no*/
        border-left: none;
        font-size: 28px;
        color: #ffffff;
        background: #4ccdfa;
      }
    }
  }
}
</style>
