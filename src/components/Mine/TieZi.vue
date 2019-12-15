<template>
  <div class="TieZi">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">帖子</div>
    </div>
    <div class="scroll flex-h">
      <div
        class="scroll-item"
        :class="{'scroll-active': currentTab === index}"
        @click.stop="changeTab(index, item)"
        v-for="(item, index) in scrollTitle"
        :key="index"
      >{{item.name}}</div>
      <div class="scroll-right">.</div>
    </div>
    <div class="product-box" v-for="(item, index) in tieZiList" :key="index">
      <div
        class="product flex-h"
        v-if="showCar"
        @click.stop="gotoPage({name: 'QuanDetail', query: { id: item.id }, params: { product: item }, pageUrl: '/index/SecondCarDetail'})"
        @touchstart="gotouchstart(item)"
        @touchmove="gotouchmove"
        @touchend="gotouchend"
      >
        <div class="p-left">
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
import { debuglog } from "util";

export default {
  name: "TieZi",
  data() {
    return {
      scrollTitle: ["购车", "杂谈", "故事", "物流", "风景", "餐馆", "乐园"],
      currentTab: 0,
      tieZiList: [],
      token: "",
      showCarFlag: false,
      timeOutEvent: 0,
      showCar: true,
      listIndex: 0
    };
  },
  inject: ["reload"],
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  async created() {
    this.token = await this.native.getToken({});
    this.getTieZiCat();
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    changeTab(tabNum, item) {
      console.log(item);
      this.currentTab=tabNum
      this.listIndex = tabNum;
      this.getCatList(item.id);
    },
    topBack() {
      this.native.back_btn({});
      // this.$router.back(-1);
    },
    async getTieZiCat() {
      let list = await this.api.getTieZiCategory({});
      this.scrollTitle = list.data;
      this.listIndex = list.data[0].id;
      this.getCatList(this.listIndex);
    },
    async getCatList(id) {
      let token = await this.native.getToken({});
      let list = await this.api.tieZiList({
        token: token.token,
        note_category_id: id,
        page: 1,
        pagesize: 10000
      });
      list.data.data.forEach((item, index) => {
        item.created_at = item.created_at.substr(0, 10);
      });
      this.tieZiList = list.data.data;
      console.log("getCatList---", list.data.data);
    },
    gotoPage(obj) {
      if (obj === "") return;
      this.$router.push({
        name: obj.name,
        query: obj.query || {},
        params: obj.params || {}
      });
      // 此页面所有路由跳转都要调用此原生通知
      // this.native.routerGoTo({ url: 'http://gczj.sinmore.vip/html/#' + obj.pageUrl })
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
            message: "您确定要删除该车辆信息吗？"
          })
          .then(async () => {
            console.log(item);
            let parms = {
              token: this.token,
              note_id: item.id
            };
            let data = await this.api.delTiezi(parms);
            console.log("data", data);
            if (data.error_code == 0) {
              console.log("de1!");
              let id = ''
              switch (this.currentTab) {
                case 0:
                  id= '4'
                  break;
                case 1:
                  id= '3'
                  break;
                case 2:
                  id= '5'
                  break;
                case 3:
                  id= '1'
                  break;
              
                default:
                  break;
              }
              this.getCatList(id);
              this.showCar = false;
              this.$nextTick(_ => {
                this.showCar = true;
              });
            }
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
    }
  }
};
</script>

<style lang='less' scoped>
.TieZi {
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
  .product-box {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    .product {
      width: 100%;
      margin-top: 30px;
      -webkit-touch-callout: none; /* iOS Safari */

      -webkit-user-select: none; /* Chrome/Safari/Opera */

      -khtml-user-select: none; /* Konqueror */

      -moz-user-select: none; /* Firefox */

      -ms-user-select: none; /* Internet Explorer/Edge */

      user-select: none; /* Non-prefixed version, currently

not supported by any browser */
      .p-left {
        min-width: 240px;
        max-width: 240px;
        height: 140px;
        position: relative;
        overflow: hidden;
        border-radius: 15px;
        .p-left-img {
          width: 100%;
          height: 100%;
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
