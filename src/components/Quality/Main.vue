<template>
  <div class="Main">
    <div class="top">
      <div class="top-txt">质造</div>
    </div>
    <div class="banner">
      <swiper :options="swiperOption1" class="banner-swiper">
        <template v-for="(item, index) in [1,2,3]">
          <swiper-slide class="banner-swiper-item" :key="index">
            <img src="../../assets/temp-car.png" alt class="banner-swiper-img">
          </swiper-slide>
        </template>
      </swiper>
      <!-- <div class="swiper-pagination"></div> -->
    </div>
    <div class="scroll flex-h">
      <div
        class="scroll-item"
        :class="{'scroll-active': currentTab === index}"
        @click.stop="changeTab(index)"
        v-for="(item, index) in scrollTitle"
        :key="index"
      >{{item}}</div>
      <div class="scroll-right">.</div>
    </div>
    <div class="box flex-h">
      <div class="box-pro" v-for="(item,index) in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]" :key="index">
        <div class="b-top">
          <img src="../../assets/temp5.png" class="b-top-img">
        </div>
        <div class="b-title">ZJ7J35-ZJ7J35-ZJ7J35</div>
        <div class="b-price">8.5-12.9万-8.5-12.9万-8.5-12.9万</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  // 质造主页
  name: 'Main',
  data() {
    return {
      swiperOption1: {
        direction: 'horizontal',
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
      scrollTitle: ['购车', '杂谈', '故事', '物流', '风景', '餐馆', '乐园'],
      currentTab: 0
    }
  },
  created() {
    this.setTab(3)
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  methods: {
    ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    changeTab(tabNum) {
      this.currentTab = tabNum
    }
  }
}
</script>

<style lang='less' scoped>
.Main {
  padding-bottom: 100px;
  .top {
    height: 85px;
    position: relative;
    border-bottom: 1px solid #e6e6e6; /*no*/
    background: #ffffff;
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
    .scroll-item {
      margin-right: 80px;
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
