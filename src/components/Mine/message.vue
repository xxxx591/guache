<template>
  <div class="Collect">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back" />
      <div class="top-txt">服务消息</div>
    </div>
    <div class="scroll flex-h">
      <div
        class="scroll-item"
        :class="{'scroll-active': currentTab === index}"
        @click.stop="changeTab(index)"
        v-for="(item, index) in scrollTitle"
        :key="index"
      >{{item.val+' '+item.num}}</div>
      <!-- <div class="scroll-right">.</div> -->
    </div>
    <div class="box flex-h" v-if="currentTab==0">
      <div class="fuwu-tuisong" v-for="(item,index) in tieziList" :key="index">
        <div class="time-box">
          <p>{{item.created_at}}</p>
        </div>
        <div class="title-box">
          <p>您发布的“{{item.note.title}}”{{item.status == 0?'已下架':'已上架'}}</p>
        </div>
      </div>
    </div>
    <div class="box flex-h" v-if="currentTab==1">
      <div class="fuwu-tuisong" v-for="(item,index) in shopList" :key="index">
        <div class="time-box">
          <p>{{item.created_at}}</p>
        </div>
        <div class="title-box">
          <p>您发布的“{{item.used_car.name}}”{{item.status == 0?'已下架':'已上架'}}</p>
        </div>
      </div>
    </div>
    <!-- <div class="box flex-h" v-if="currentTab==2">
      <div class="fuwu-tuisong" v-for="(item,index) in carList" :key="index">
        <div class="time-box">
          <p>{{item.created_at}}</p>
        </div>
        <div class="title-box">
          <p>您发布的“{{item.used_car.name}}”{{item.status == 0?'已下架':'已上架'}}</p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: "Collect",
  data() {
    return {
      scrollTitle: [
        { val: "帖子", num: 0 },
        { val: "二手挂车", num: 0 },
        // { val: "二手牵引车", num: 0 }
      ],
      shopList: [],
      tieziList: [],
      carList: [],
      currentTab: 0,
      token: ""
    };
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.token = await this.native.getToken();
      let params = {
        token: this.token,
        page: 0,
        pagesize: 30
      };
      let data = await this.api.getTwoTiezi(params);
      let data2 = await this.api.getTwoCar(params);
      console.log("data", data);
      console.log("data2", data2);
      if (data2.data.data == undefined || data.data.data == undefined) {
        return;
      }
      this.tieziList = data.data.data;
      let arr = data2.data.data;
      console.log("this.scrollTitle[0].num ", this.tieziList);
      this.scrollTitle[0].num = data.data.count;
      arr.map(item => {
        console.log("ite,", item);
        // if (item.type == 2) {
        //   this.carList.push(item);
        // } else {
        this.shopList.push(item);
        // }
      });
      console.log(this.carList);
      this.scrollTitle[1].num = arr.length;
      // this.changeTab(0);
      // let data1 = await this.api.getShops(params);
      // console.log("data1", data1);
      // this.shopList = data1.data.data;
    },
    inputBlur() {
      window.scrollTo(0, 0);
    },
    async changeTab(tabNum) {
      this.currentTab = tabNum;
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1);
    },
    goosDetails(item) {
      this.$router.push({
        path: "/Quality/QualityProductDetail",
        query: { productid: item.goods.id, type: 2 }
      });
    },
    tieziDetails(item) {
      this.$router.push({
        path: "/Quan/QuanDetail",
        query: { id: item.note.id, type: 2 }
      });
    },
    carDetails(item) {
      // this.$router.push({
      //   path: "/Quality/QualityProductDetail",
      //   query: { productid: item.goods.id, type: 2 }
      // });
      this.native.routerGoTo({
        url:
          "http://h5.gc-app.com/#/Car/ProductDetail?id=" +
          item.trailer.id +
          "&token=this.token"
      });
    }
  }
};
</script>

<style lang='less' scoped>
.Collect {
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
  .scroll {
    width: 100%;
    box-sizing: border-box;
    height: 90px;
    border-bottom: 2px solid #e5e5e5;
    align-items: center;
    overflow-x: scroll;
    display: flex;
    justify-content: space-around;
    .scroll-item {
      // margin-right: 120px;
      white-space: nowrap;
      height: 88px;
      line-height: 100px;
      box-sizing: border-box;
      border-radius: 2px;
      font-size: 28px;
      padding: 0 8px;
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
    .fuwu-tuisong {
      font-size: 32px;
      text-align: center;
      width: 100%;
      margin-bottom: 60px;
      border-bottom: 1px solid #cacaca;
      p {
        margin: 0;
        color: #999;
        font-size: 28px;
      }
      .title-box {
        p {
          padding: 30px 0;
          font-size: 32px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: #000;
          text-align: left;
        }
      }
    }
  }
  .content-box {
    display: flex;
    margin-bottom: 30px;
    border-bottom: 1px solid #cacaca;
    padding-bottom: 15px;
    .left-content {
      height: 140px;
      width: 240px;
      margin-right: 30px;
      img {
        width: 100%;
        border-radius: 10px;
      }
    }
    .left-content-car {
      height: 160px;
      width: 160px;
      background-size: cover;
      border-radius: 5px;
    }
    .right-content {
      font-size: 32px;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      line-height: 44px;
      p {
        margin: 0;
      }
      .bottom-content {
        display: flex;
        justify-content: space-between;
        width: 100%;
        p {
          color: rgba(153, 153, 153, 1);
          font-size: 24px;
        }
        .red-price {
          font-weight: 500;
          color: rgba(255, 93, 37, 1);
          font-size: 28px;
        }
      }
    }
  }
}
</style>
