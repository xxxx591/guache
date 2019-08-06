<template>
  <div class="Main">
    <div class="banner">
      <swiper v-if="topBanners.length" :options="swiperOption1" class="banner-swiper">
        <template v-for="(item, index) in topBanners">
          <swiper-slide class="banner-swiper-item" :key="index">
            <img :src="item.pic" alt class="banner-swiper-img">
          </swiper-slide>
        </template>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>

    <div class="car-box flex-h">
      <div class="car-item" @click.stop="gotoPage({name: 'ChooseCar', pageUrl: '/Car/ChooseCar?type=2'})">
        <div class="car-img">
          <img src="../../assets/index-icon1.png" class="car-img2">
        </div>
        <div class="car-txt">定制挂车</div>
      </div>
      <div class="car-item"  @click.stop="gotoPage({name: 'ChooseCar', pageUrl: '/Car/ChooseCar?type=2'})">
        <!-- @click.stop="$router.push({name: 'ChooseBrand'})" -->
        <div class="car-img">
          <img src="../../assets/index-icon2.png" class="car-img2">
        </div>
        <div class="car-txt">牵引车</div>
      </div>
      <div class="car-item" @click.stop="gotoQualityMainPage">
        <div class="car-img">
          <img src="../../assets/index-icon3.png" class="car-img2">
        </div>
        <div class="car-txt">挂车配件</div>
      </div>
      <div
        class="car-item"
        @click.stop="gotoPage({name: 'SecondCarQian', pageUrl: '/Index/SecondCarQian'})"
      >
        <div class="car-img">
          <img src="../../assets/index-icon4.png" class="car-img2">
        </div>
        <div class="car-txt">二手牵引车</div>
      </div>
      <div
        class="car-item"
        @click.stop="gotoPage({name: 'SecondCar', pageUrl: '/Index/SecondCar'})"
      >
        <div class="car-img">
          <img src="../../assets/index-icon5.png" class="car-img2">
        </div>
        <div class="car-txt">二手挂车</div>
      </div>
      <!-- TODOS: 跳转圈子, 指定分类 -->
      <div class="car-item" @click.stop="gotoPage({name: 'QuanMain', pageUrl: '/Index/QuanMain'})">
        <div class="car-img">
          <img src="../../assets/index-icon6.png" class="car-img2">
        </div>
        <div class="car-txt">司机招聘</div>
      </div>
    </div>

    <div class="shop" @click.stop="gotoPage({name: 'PointsMall', pageUrl: '/Index/PointsMall'})">
      <img src="../../assets/shop.png" class="shop-img">
    </div>
    <div class="service-box flex-h">
      <div class="service flex-h" @click="gotoPage3('http://www.schebao.com/partner/')">
        <div class="service-txt">违章查询</div>
        <div class="service-img service-img-house">
          <img src="../../assets/search.png" alt class="service-img2">
        </div>
      </div>
      <div class="service flex-h" @click="gotoPage3('https://yuntai.sinmore.vip/server/content.html?id=11')">
        <div class="service-txt">车险服务</div>
        <div class="service-img service-img-carservice">
          <img src="../../assets/house.png" alt class="service-img2">
        </div>
      </div>
      <div class="service flex-h" @click="gotoPage3('http://h5.gc-app.com/#/index/lovecar')">
        <div class="service-txt">油卡查询</div>
        <div class="service-img">
          <img src="../../assets/card.png" alt class="service-img2">
        </div>
      </div>
      <div class="service flex-h">
        <div class="service-txt">线上服务</div>
        <div class="service-img service-img-persion">
          <img src="../../assets/person.png" alt class="service-img2">
        </div>
      </div>
    </div>

    <div class="hot">
      <div class="hot-txt">圈子热点</div>
      <div class="hot-swipe">
        <swiper v-if="quanBanners.length" :options="swiperOption2" class="hot-swiper">
          <template v-for="(item, index) in quanBanners">
            <swiper-slide class="hot-swiper-item" :key="index">
              <img
                :src="item.thumb"
                @click.stop="gotoPage({name: 'QuanDetail', query: {productid: item.id}, pageUrl: '/Quan/QuanDetail'})"
                class="hot-swiper-img"
              >
            </swiper-slide>
          </template>
        </swiper>
        <div class="hot-swipe-txt">平板自卸半挂车可能要取消，卡车司机先别着急入手</div>
      </div>
      <div class="hot-pagination flex-h flex-cc"></div>
    </div>

    <div class="recommend-box">
      <div class="recommend-title">推荐商品</div>
      <div class="r-b flex-h">
        <div
          class="recommend"
          @click.stop="gotoPage({name: 'QualityProductDetail', query: { productid: item.id }, params: { product: item }, pageUrl: '/Quality/QualityProductDetail'})"
          v-for="(item, index) in recommendProducts" :key="index"
        >
          <div class="r-box">
            <img :src="item.cover" class="r-box-img">
          </div>
          <div class="r-title">{{item.title}}</div>
          <div class="r-price">¥{{item.price}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'Main',
  // beforeRouteLeave(to, from, next) {
  //   this.setLoading(true)
  //   if (to.name === 'PointsMall') {
  //     to.meta.keepAlive = false
  //   }
  //   next()
  // },
  data() {
    return {
      swiperOption1: {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        observer: true,
        observeParents: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 2500,
        },
        preventLinksPropagation: false,
        pagination: {
          el: '.swiper-pagination',
        }
      },
      swiperOption2: {
        loop: true,
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
          disableOnInteraction: false,
          delay: 2500
        },
        preventLinksPropagation: false,
        pagination: {
          el: '.hot-pagination',
        }
      },
      recommendProducts: [],
      topBanners: [],
      quanBanners: [],
    }
  },
  beforeCreate(){

  },
  async created() {
    this.setTab(0)
    this.getBanners()
    this.getRecommendProducts()
    // this.tool.hrefObj()
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
      bannerShowType: state => state.datas.bannerShowType,
      // tab: state => state.datas.tab,
    })
  },
  methods: {
    ...mapActions(["setTab", 'setLoading']),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    async getBanners() {
      let token = await this.native.getToken({})
      let data = await this.api.getBannerList({ hot: 1, show: this.bannerShowType, token: token.token })
      let data2 = await this.api.quan_recommend({ page: 0, pagesize: 3, token: token.token })

      console.log('getBanners---', data)
      console.log('getBanners---data2---', data2)
      this.topBanners = data && data.data
      this.quanBanners = data2 && data2.data
    },
    async getRecommendProducts() {
      let data = await this.api.getIndexRecommendProducts()
      let tempArr = []
      data.data.forEach((item, index) => {
        if (index < 8) {
          tempArr.push(item)
        }
      })
      this.recommendProducts = tempArr
      this.setLoading(false)
    },
    gotoPage(obj) {
      // if (obj === '') return
      // this.$router.push({ name: obj.name, query: obj.query || {}, params: obj.params || {} })
      // 此页面所有路由跳转都要调用此原生通知
      this.native.routerGoTo({ url: "http://guacheapi.sinmore.vip/#" + obj.pageUrl })
      
    },
    gotoPage3(url){
      this.native.routerGoTo({url:url})
    },
    gotoQualityMainPage() {
      this.native.gotoQualityMain({})
    },
    // gotoDetail(product) {
    //   this.$router.push({ name: 'ProductDetail', params: { product } })
    // }
  }
}
</script>

<style lang='less' scoped>
.Main {
  background: #ffffff;
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
  .car-box {
    width: 100%;
    box-sizing: border-box;
    padding: 40px 60px;
    flex-wrap: wrap;
    .car-item {
      width: 140px;
      margin-bottom: 50px;
      .car-img {
        width: 140px;
        height: 140px;
        border-radius: 70px;
        overflow: hidden;
        .car-img2 {
          width: 100%;
          height: 100%;
        }
      }
      .car-txt {
        text-align: center;
        white-space: nowrap;
        margin-top: 20px;
        font-size: 28px;
        color: #333333;
      }
    }
    .car-item:nth-child(2),
    .car-item:nth-child(5) {
      margin: 0 100px;
    }
  }
  .shop {
    width: 690px;
    height: 138px;
    border-radius: 69px;
    overflow: hidden;
    margin: 0 auto;
    margin-bottom: 60px;
    .shop-img {
      width: 100%;
      height: 100%;
    }
  }
  .service-box {
    box-sizing: border-box;
    padding: 0 30px;
    flex-wrap: wrap;
    margin-bottom: 60px;
    .service {
      width: 335px;
      height: 150px;
      border-radius: 10px;
      background: #f5f8fa;
      align-items: center;
      .service-txt {
        width: 65px;
        color: #4f5557;
        font-size: 32px;
        margin-left: 40px;
        font-weight: bold;
      }
      .service-img {
        width: 133px;
        height: 100px;
        margin-left: 60px;
        .service-img2 {
          width: 100%;
          height: 100%;
        }
      }
      .service-img-carservice {
        width: 125px;
        height: 120px;
      }
      .service-img-house {
        width: 125px;
        height: 98px;
      }
      .service-img-persion {
        width: 128px;
        height: 118px;
      }
    }
    .service:nth-child(1),
    .service:nth-child(3) {
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
  .hot {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;
    margin-bottom: 60px;
    .hot-txt {
      font-size: 40px;
      color: #333333;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .hot-swipe {
      width: 100%;
      height: 400px;
      overflow: hidden;
      box-sizing: border-box;
      border-radius: 10px;
      position: relative;
      .hot-swipe-txt {
        font-size: 32px;
        color: #ffffff;
      }
      .hot-swiper {
        width: 100%;
        height: 100%;
        .hot-swiper-item {
          width: 100%;
          height: 100%;
          .hot-swiper-img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .recommend-box {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;
    margin-bottom: 30px;
    .recommend-title {
      font-size: 40px;
      color: #333333;
      width: 100%;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .r-b {
      flex-wrap: wrap;
      width: 100%;
      box-sizing: border-box;
      .recommend {
        width: 335px;
        box-sizing: border-box;
        .r-box {
          width: 100%;
          height: 335px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #e6e6e6; /*no*/
          .r-box-img {
            width: 100%;
            height: 100%;
          }
        }
        .r-title {
          width: 100%;
          font-size: 28px;
          color: #333333;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-top: 20px;
        }
        .r-price {
          font-size: 32px;
          line-height: 32px;
          color: #ff5d25;
          font-weight: bold;
          margin-top: 15px;
          margin-bottom: 30px;
        }
      }
      .recommend:nth-child(2n + 1) {
        margin-right: 20px;
      }
    }
  }
}
</style>
