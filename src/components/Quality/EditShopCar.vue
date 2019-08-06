<template>
  <div class="EditShopCar">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-collect" @click.stop="gopage()">取消</div>
      <div class="top-txt">购物车</div>
    </div>
    <div class="box flex-h" v-for="(item, index) in shopCarList" :key="index">
      <div class="b-select">
        <img
          src="../../assets/shop-selected2.png"
          v-show="item.goods.selected === true"
          class="b-selected2"
          @click.stop="selectedShopCar({product: item, isSelected: false})"
        >
        <img
          src="../../assets/shop-selected.png"
          v-show="item.goods.selected === true"
          class="b-selected"
          @click.stop="selectedShopCar({product: item, isSelected: false})"
        >
        <img
          src="../../assets/shop-unselected.png"
          v-show="item.goods.selected === false"
          class="b-unselected"
          @click.stop="selectedShopCar({product: item, isSelected: true})"
        >
      </div>
      <div class="b-product flex-h">
        <div class="b-left">
          <img :src="item.goods.cover" class="b-left-img">
        </div>
        <div class="b-right flex-v">
          <div class="b-title">{{item.goods.title}}</div>
          <div class="b-bottom flex-h">
            <div class="b-price">￥{{item.goods.price}}元</div>
            <div class="b-btns">
              <div class="car flex-h">
                <div class="car-box flex-h">
                  <div class="car-sub flex-h flex-cc" @click.stop="subProductBuyNum(item)">-</div>
                  <div class="car-num flex-h flex-cc">{{item.number}}</div>
                  <div class="car-add flex-h flex-cc" @click.stop="addProductBuyNum(item)">+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot flex-h">
      <div class="f-left flex-h" @click.stop="toggleIsSelectedAll">
        <div class="f-left-select">
          <img
            src="../../assets/shop-selected2.png"
            v-show="isSelectedAll === true"
            class="b-selected2"
          >
          <img
            src="../../assets/shop-selected.png"
            v-show="isSelectedAll === true"
            class="b-selected"
          >
          <img
            src="../../assets/shop-unselected.png"
            v-show="isSelectedAll === false"
            class="b-unselected"
          >
        </div>
        <div class="f-left-txt">全选</div>
      </div>
      <div class="f-right flex-h">
        <!-- <div class="f-price">
          <div class="b-left flex-h">
            <div class="b-txt flex-h">合计:</div>
            <div class="b-txt-price flex-h">¥389</div>
          </div>
        </div>-->
        <!-- <div class="f-btn2 flex-h flex-cc">移入收藏</div> -->
        <div class="f-btn flex-h flex-cc" @click.stop="doDelete">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "EditShopCar",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
      shopCarList: state => state.shopCar.shopCarList
    }), 
    ...mapGetters(["isSelectedAll", "sumPrice"])
  },
  methods: {
    ...mapActions([
      "addShopCar",
      "selectedShopCar",
      "addProductBuyNum",
      "subProductBuyNum",
      "toggleIsSelectedAll"
    ]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.push({
        path: "ShopCar",
        query: {
          productid: this.$route.query.productid
        }
      });
    },
    gopage() {
      this.$router.push({
        path: "ShopCar",
        query: { productid: this.$route.query.productid }
      });
    },
    async doDelete() {
      let token = await this.native.getToken({});
      let arrayList = [];
      this.shopCarList.forEach(item => {
        console.log("item---", item);
        if (item.goods.selected || item.goods.isSelectedAll) {
          arrayList.push(item.id);
        }
      });
      console.log(arrayList);

      let data = await this.api.deleteShopCarProduct({
        token: token,
        cart_id: arrayList
      });
      if (data.error_code == 0) {
        this.$toast("删除成功");
        let list = await this.api.shopCarList({
          token: token.token,
          page: 1,
          pagesize: 100000
        });
        this.addShopCar(list.data.data);
        console.log(this.shopCarList);
      }
      this.$router.go(-1)
    }
  }
};
</script>

<style lang='less' scoped>
.EditShopCar {
  min-width: 100vw;
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 200px;
  padding-top: 85px;
  .top {
    height: 85px;
    position: fixed;
    top: 0;
    width: 100%;
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
      // width: 44px;
      // height: 44px;
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translateY(-50%);
      font-size: 28px;
      color: #4ccdfa;
    }
  }
  .box {
    width: 100%;
    box-sizing: border-box;
    padding: 30px 0;
    padding-left: 30px;
    align-items: center;
    background: #ffffff;
    .b-select {
      min-width: 40px;
      max-width: 40px;
      height: 40px;
      position: relative;
      top: -15px;
      .b-selected {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
      }
      .b-selected2 {
        width: 25px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
      }
      .b-unselected {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .b-product {
      margin-left: 30px;
      border-bottom: 1px solid #e6e6e6; /*no*/
      padding-bottom: 30px;
      .b-left {
        min-width: 200px;
        max-width: 200px;
        height: 200px;
        border-radius: 10px;
        overflow: hidden;
        .b-left-img {
          width: 100%;
          height: 100%;
        }
      }
      .b-right {
        margin-left: 30px;
        justify-content: space-between;
        width: 100%;
        padding-right: 30px;
        padding-top: 10px;
        .b-title {
          font-size: 28px;
          color: #333333;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;
          min-width: 380px;
        }
        .b-bottom {
          justify-content: space-between;
          align-items: center;
          .b-price {
            font-size: 28px;
            color: #ff5d25;
            // font-weight: bold;
          }
          .b-btns {
            height: 60px;
            .car {
              width: 100%;
              height: 60px;
              background: #ffffff;
              align-items: center;
              justify-content: space-between;
              box-sizing: border-box;
              padding: 0 30px;
              padding-right: 0;
              margin-bottom: 20px;
              .car-txt {
                font-size: 32px;
                color: #333333;
              }
              .car-box {
                .car-sub {
                  width: 60px;
                  height: 60px;
                  border-top-left-radius: 30px;
                  border-bottom-left-radius: 30px;
                  border: 1px solid #e5e5e5; /*no*/
                  font-size: 36px;
                }
                .car-num {
                  width: 70px;
                  height: 60px;
                  border-top: 1px solid #e5e5e5; /*no*/
                  border-bottom: 1px solid #e5e5e5; /*no*/
                  font-size: 30px;
                }
                .car-add {
                  width: 60px;
                  height: 60px;
                  border-top-right-radius: 30px;
                  border-bottom-right-radius: 30px;
                  border: 1px solid #e5e5e5; /*no*/
                  font-size: 36px;
                }
              }
            }
          }
        }
      }
    }
  }
  .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 110px;
    background: #ffffff;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 30px;
    z-index: 9;
    .f-left {
      align-items: center;
      .f-left-select {
        min-width: 40px;
        max-width: 40px;
        height: 40px;
        position: relative;
        .b-selected {
          width: 40px;
          height: 40px;
          position: absolute;
          top: 0;
          left: 0;
        }
        .b-selected2 {
          width: 25px;
          height: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
        .b-unselected {
          width: 40px;
          height: 40px;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .f-left-txt {
        font-size: 28px;
        color: #999999;
        margin-left: 20px;
      }
    }
    .f-right {
      align-items: center;
      .f-price {
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
      }
      .f-btn {
        margin-left: 30px;
        width: 190px;
        height: 70px;
        background: #4ccdfa;
        color: #ffffff;
        border-radius: 35px;
        font-size: 35px;
      }
      .f-btn2 {
        margin-left: 30px;
        width: 190px;
        height: 70px;
        background: #ffffff;
        color: #4ccdfa;
        border-radius: 35px;
        font-size: 35px;
        border: 1px solid #4ccdfa; /*no*/
        box-sizing: border-box;
      }
    }
  }
}
</style>
