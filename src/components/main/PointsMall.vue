<template>
  <div class="PointsMall" @scroll="homeScroll" ref="home">
    <div class="homeBox" ref="homeBox">
      <div class="top">
        <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
        <div class="top-txt">积分商城</div>
      </div>
      <div class="banner">
        <swiper :options="swiperOption1" v-if="topBanners.length" class="banner-swiper">
          <template v-for="(item, index) in topBanners">
            <swiper-slide class="banner-swiper-item" :key="index">
              <img :src="item.pic" alt class="banner-swiper-img">
            </swiper-slide>
          </template>
        </swiper>
        <div class="swiper-pagination"></div>
      </div>
      <div class="scroll flex-h">
        <div
          class="scroll-item"
          :class="{'scroll-active': currentTab === index}"
          @click.stop="changeTab(item, index)"
          v-for="(item, index) in categoryArr"
          :key="index"
        >{{item.title}}</div>
        <div class="scroll-right">.</div>
      </div>
      <div class="recomend">
        <div class="r-box r-box-video flex-h">
          <div
            class="r-video"
            v-for="(item, index) in productList"
            @click.stop="$router.push({name: 'ProductDetail', query: { productid: item.id }, params: {product: item}})"
          >
            <div class="r-video-box">
              <img :src="item.cover" class="r-video-img">
            </div>
            <div class="r-video-title">{{item.title}}</div>
            <div class="r-video-des flex-h">
              <div class="r-video-price">{{item.price}}</div>
              <div class="r-video-txt">积分</div>
            </div>
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
  name: 'PointsMall',
  // beforeRouteEnter(to, from, next) {
  //   // 设置下一个路由的 meta
  //   // to.meta.keepAlive = false
  //   next((vm) => {
  //     if (from.name === 'Main') {
  //     } else {
  //       vm.setLoading(false)
  //     }
  //   })
  // },
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
          el: '.swiper-pagination',
        }
      },
      scrollTitle: ['全部', '挂车配件', '配件', '挂车配件', '挂车点击', '接口', '时间金额'],
      currentTab: 0,
      topBanners: [],
      categoryArr: [],
      productList: [],
      currentCategoryId: '',
      dataPageNum: 1
    }
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  created() {
    this.getBanners()
    this.getCategory()
  },
  methods: {
    ...mapActions(['setLoading']),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    changeTab(item, tabNum) {
      this.currentTab = tabNum
      this.currentCategoryId = item.id
      // 每次切换tab的时候清空商品列表, 清空请求数据的页数
      this.productList = []
      this.dataPageNum = 1
      this.getProductList(this.currentCategoryId)
    },
    async getBanners() {
      let token = await this.native.getToken({})
      let data = await this.api.getBannerList({ hot: 1, show: this.bannerShowType, token: token.token })
      this.topBanners = data && data.data
      // this.setLoading(false)
    },
    async getCategory() {
      let data = await this.api.jifen_categoryList()
      this.categoryArr = data && data.data
      // 赋初值
      this.currentCategoryId = this.categoryArr[0].id
      this.getProductList(this.currentCategoryId)
      // console.log('getCategory---', data)
    },
    async getProductList(id) {
      let data = await this.api.jifen_productList({ page: this.dataPageNum, pagesize: this.config.pageSize, point_class_id: id })
      if (!(data && data.data && data.data.data && data.data.data.length !== 0)) {
        return
      }
      this.dataPageNum += 1
      data.data.data.forEach((item, index) => {
        this.productList.push(item)
      })
    },
    homeScroll(e) {
      let homeBoxHeight = this.$refs.homeBox.clientHeight
      let homeHeight = this.$refs.home.clientHeight
      let delta = homeBoxHeight - homeHeight
      if (this.$refs.home.scrollTop > delta - 300) {
        this.debounce(() => {
          this.getProductList(this.currentCategoryId)
        }, 1000)
      }
    },
    topBack() {
      this.native.back_btn({})
      this.$router.back(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.PointsMall {
  width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .top {
    height: 85px;
    position: relative;
    // border-bottom: 2px solid #e6e6e6;
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
      margin-right: 80px;
      white-space: nowrap;
      height: 88px;
      line-height: 100px;
      box-sizing: border-box;
      border-radius: 2px;
    }
    .scroll-item:nth-child(1) {
      margin-left: 45px;
    }
    .scroll-active {
      border-bottom: 6px solid #4ccdfa;
    }
    .scroll-right {
      width: 1px;
      visibility: hidden;
    }
  }
  .recomend {
    .r-box {
      width: 100%;
      overflow-x: scroll;
      // border: 1px solid blue;
      box-sizing: border-box;
      .r-item {
        width: 240px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        margin-right: 18px;
        border: 1px solid #e6e6e6;
        background: #fafafa;
        .r-img-box {
          width: 240px;
          height: 340px;
          box-sizing: border-box;
          position: relative;
          .r-img {
            width: 100%;
            height: 100%;
          }
          .r-img-cover {
            position: absolute;
            bottom: 0;
            left: 0;
          }
          .r-num {
            position: absolute;
            bottom: 20px;
            right: 14px;
            color: white;
            font-size: 20px;
          }
        }
        .r-title {
          font-size: 30px;
          color: #1a1a1a;
          margin-top: 18px;
          margin-bottom: 18px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-left: 9px;
        }
        .r-dir {
          font-size: 24px;
          // line-height: 28px;
          color: #999999;
          margin-left: 9px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .r-company {
          font-size: 24px;
          // line-height: 28px;
          color: #999999;
          margin-top: 5px;
          margin-bottom: 15px;
          margin-left: 9px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .r-item:nth-child(1) {
        margin-left: 32px;
      }
      .r-item:nth-last-child(1) {
        margin-right: 32px;
      }
      .r-video {
        width: 350px;
        margin-bottom: 36px;
        .r-video-box {
          width: 350px;
          height: 210px;
          position: relative;
          .r-video-img {
            width: 350px;
            height: 210px;
          }
        }
        .r-video-title {
          width: 100%;
          font-size: 30px;
          color: #1a1a1a;
          margin-top: 20px;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .r-video-des {
          // width: 100%;
          height: 30px;
          font-size: 24px;
          color: #999999;
          align-items: flex-end;
          // display: -webkit-box;
          // -webkit-box-orient: vertical;
          // -webkit-line-clamp: 1;
          // text-overflow: ellipsis;
          // overflow: hidden;
          .r-video-price {
            height: 30px;
            line-height: 30px;
            font-size: 30px;
            color: #ff5d25;
            font-weight: bold;
            box-sizing: border-box;
          }
          .r-video-txt {
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: #ff5d25;
            box-sizing: border-box;
          }
        }
      }
      .r-video:nth-child(2n + 1) {
        margin-right: 16px;
      }
    }
    .r-box-video {
      box-sizing: border-box;
      padding: 0 16px;
      flex-wrap: wrap;
    }
  }
}
</style>
