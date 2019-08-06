<template>
  <div class="Main">
    <div class="top">
      <div class="top-txt">圈子</div>
      <img
        src="../../assets/publish.png"
        class="publish"
        @click.stop="$router.push('/Quan/QuanPublish')"
      >
    </div>
    <div class="banner">
      <swiper :options="swiperOption1" class="banner-swiper">
        <template v-for="(item, index) in [1,2,3]">
          <swiper-slide class="banner-swiper-item" :key="index">
            <img src="../../assets/temp-car.png" alt class="banner-swiper-img">
          </swiper-slide>
        </template>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
    <div class="scroll flex-h">
      <div
        class="scroll-item"
        :class="{'scroll-active': currentTab === index}"
        @click.stop="changeTab(index, item)"
        v-for="(item, index) in categoryList"
        :key="index"
      >{{item.name}}</div>
      <div class="scroll-right">.</div>
    </div>
    <div class="product-box" v-for="(item, index) in productList" :key="index">
      <div
        class="product flex-h"
        @click.stop="$router.push({name: 'QuanDetail', query: {id: item.id}})"
         @touchstart="gotouchstart(item)"
            @touchmove="gotouchmove"
            @touchend="gotouchend"
      >
      <!-- :style="' background-image: url('+item.thumb+');'" -->
        <div class="p-left" >
          <img :src="item.thumb" class="p-left-img">

          <div class="p-time">{{item.created_at}}</div>
        </div>
        <div class="p-right flex-v">
          <div class="p-top">
            <div class="p-title">{{item.title}}</div>
          </div>
          <div class="p-bottom flex-h">
            <div class="p-txt">{{item.get_user.nickname}}</div>
            <div class="p-read">{{item.view}}次阅读</div>
          </div>
        </div>
      </div>
      <div class="p-line"></div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: "Main",
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
          el: ".swiper-pagination"
        }
      },
      scrollTitle: ["购车", "杂谈", "故事", "物流", "风景", "餐馆", "乐园"],
      currentTab: 0,
      categoryList: [],
      productList: []
    };
  },
  created() {
    this.setTab(1);
    this.getCategoryList();
  },
  computed: {
    ...mapState({
      token: state => state.datas.token
    })
  },
  methods: {
    ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    changeTab(tabNum, item) {
      this.currentTab = tabNum;
      console.log("changeTab--", item);
      this.getProductList(item.id);
    },
    async getCategoryList() {
      let token = await this.native.getToken({});
      let list = await this.api.getTieZiCategory({ token: token.token });
      this.categoryList = list.data;
      this.getProductList(list.data[0].id);
    },
    async getProductList(id) {
      let token = await this.native.getToken({});
      let list = await this.api.quanProductList({
        token: token.token,
        page: 1,
        pagesize: 10000,
        note_category_id: id
      });
      list.data.data.forEach((item, index) => {
        item.created_at = item.created_at.substr(0, 10);
      });
      this.productList = list.data.data;
    },
    gotouchstart(item) {
      let that = this;
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
      this.timeOutEvent = setTimeout(_ => {
        //执行长按要执行的内容，
        this.$dialog
          .confirm({
            title: "提示",
            message: "您确定要删除该帖子吗？"
          })
          .then(async () => {
            console.log(item);
            let parms = {
              token: this.$store.state.token,
              user_car_id: item.id
            };
            let data = await this.api.delCar(parms);
            this.carList = await this.api.myCars({
              token: this.$store.state.token
            });
            console.log(this.list);
            this.showCarFlag = false;
            this.$nextTick(_ => {
              if (this.carList.length > 0) {
                this.showCarFlag = true;
              } else {
                this.showCarFlag = true;
                this.showCar = false;
              }
            });
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      }, 600); //这里设置定时
    },
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend() {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0) {
        //这里写要执行的内容（尤如onclick事件）
      }
    },
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove() {
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
    },
  }
};
</script>

<style lang='less' scoped>
.Main {
  .top {
    height: 85px;
    position: relative;
    // border-bottom: 1px solid #e6e6e6; /*no*/
    background: #ffffff;
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
  .banner {
    width: 100%;
    height: 362px;
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
  .scroll {
    width: 100%;
    box-sizing: border-box;
    height: 90px;
    border-bottom: 2px solid #e5e5e5;
    align-items: center;
    overflow-x: scroll;
    margin-bottom: 30px;
    .scroll-item {
      margin-right: 136px;
      white-space: nowrap;
      height: 88px;
      line-height: 100px;
      box-sizing: border-box;
      border-radius: 2px;
      font-size: 28px;
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
  .scroll::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
  .product-box {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    .product {
      width: 100%;
      margin-top: 30px;
      .p-left {
        min-width: 240px;
        max-width: 240px;
        height: 140px;
        position: relative;
        overflow: hidden;
        border-radius: 15px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        .p-left-img {
          width: 100%; 
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
        .p-top {
          .p-title {
            font-size: 32px;
            font-weight: bold;
            color: #333333;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        .p-bottom {
          justify-content: space-between;
          .p-txt {
            font-size: 24px;
            color: #999999;
          }
          .p-read {
            font-size: 24px;
            color: #999999;
          }
        }
      }
    }
    .p-line {
      margin-top: 30px;
      border-bottom: 1px solid #e5e5e5; /*no*/
    }
  }
}
</style>
