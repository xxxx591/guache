<template>
  <div class="Mine" v-if="show">
    <div class="top">
      <div class="top-1 flex-h" >
        <img src="../../assets/set.png" class="top-set" @click.stop="gotoPage({name: 'Set', pageUrl: '/Mine/Set'})"/>
        <!-- 消息功能取消 -->
        <img src="../../assets/alerm.png" class="top-alerm" @click.stop="gotoPage({name: 'AllMessage', pageUrl: '/Mine/AllMessage'})"/>
      </div>
      <div class="t-info flex-h" @click.stop="gotoPage({name: 'Info', pageUrl: '/Mine/Info'})">
        <div class="t-head">
          <img :src="userInfo.avatar" class="t-img" />
          <div class="t-box flex-v">
            <div class="t-title">{{userInfo.nickname}}</div>
            <div class="t-des">{{userInfo.desc}}</div>
          </div>
        </div>
        <img src="../../assets/arrow-right-white.png" class="t-arrow" />
      </div>
      <div class="top-box">
        <div class="top-box2 flex-h">
          <div
            class="top-item flex-v flex-cc"
            @click.stop="gotoPage2({name: 'LoveCar', pageUrl: '/Index/LoveCar'})"
          >
            <div class="top-num">{{userInfo2.user_car_count || '0'}}</div>
            <div class="top-txt">我的车辆</div>
          </div>
          <div
            class="top-item flex-v flex-cc"
            @click.stop="gotoPage({name: 'OrderList', pageUrl: '/Mine/OrderList'})"
          >
            <div
              class="top-num"
            >{{(userInfo2.goods_order_count + userInfo2.point_order_count) || '0'}}</div>
            <div class="top-txt">我的订单</div>
          </div>
          <div
            class="top-item flex-v flex-cc"
            @click.stop="gotoPage({name: 'TieZi', pageUrl: '/Mine/TieZi'})"
          >
            <div class="top-num">{{userInfo2.note_count || '0'}}</div>
            <div class="top-txt">我的帖子</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <!-- @click.stop="gotoPage({name: 'PointsMall', pageUrl: '/Index/PointsMall'})" -->
      <div class="b-box flex-h">
        <div class="b-left flex-h" @click.stop="gotoPointMail">
          <img src="../../assets/icon-jifen.png" class="b-left-icon" />
          <div class="b-txt">积分商城</div>
        </div>
        <div class="b-arrow">
          <img src="../../assets/right-arrow.png" class="b-arrow-img" />
        </div>
      </div>
      <div
        class="b-box flex-h"
        @click.stop="gotoPage3({name: 'InvitedGift', pageUrl: 'Car/InvitedGift'})"
      >
        <div class="b-left flex-h">
          <img src="../../assets/invite-icon.png" class="b-left-icon" />
          <div class="b-txt">邀请有礼</div>
        </div>
        <div class="b-arrow">
          <img src="../../assets/right-arrow.png" class="b-arrow-img" />
        </div>
      </div>
      <!-- 我的收藏功能删除 -->
      <div class="b-box flex-h"  @click.stop="gotoPage({name: 'Collect', pageUrl: '/Mine/Collect'})">
        <div class="b-left flex-h">
          <img src="../../assets/uncollect.png" class="b-left-icon">
          <div class="b-txt">我的收藏</div>
        </div>
        <div class="b-arrow">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div class="b-box flex-h" @click.stop="gotoPage({name: 'Help', pageUrl: '/Mine/Help'})">
        <div class="b-left flex-h">
          <img src="../../assets/help-icon.png" class="b-left-icon" />
          <div class="b-txt">帮助中心</div>
        </div>
        <div class="b-arrow">
          <img src="../../assets/right-arrow.png" class="b-arrow-img" />
        </div>
      </div>
      <!-- 该功能删除 -->
      <div class="b-box flex-h"   @click.stop="gotoPage({name: 'AboutUs', pageUrl: '/Mine/AboutUs'})">
        <div class="b-left flex-h">
          <img src="../../assets/about-us-icon.png" class="b-left-icon">
          <div class="b-txt">关于我们</div>
        </div>
        <div class="b-arrow">
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import { setInterval, setTimeout } from "timers";

export default {
  name: "Mine",
  data() {
    return {
      userInfo: {},
      userInfo2: {},
      isLoading: false,
      count: 1,
      show: true,
      token: { token: "" }
    };
  },
  async created() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    if (isAndroid) {
      console.log("window.local", window.location.href);
      this.token.token = this.$route.query.token; // TODOS
      this.getUserInfo();
      // 更新页面数据
    } else {
      this.token = await this.native.getToken({}); // TODOS
      console.log("token", this.token.token);
      console.log("type", typeof this.token.token);

      if (this.token.token == "undefined") {
        console.log("11234", this.token);
        this.native.saveToken({ token: "" }); // TODOS
        this.token = await this.native.getToken();
        // this.native.saveToken({ token: this.token.token });
        // this.getUserInfo();
        let data = await this.native.viewWillAppear();
        console.log("data更新页面");
      }

      this.getUserInfo();
      this.native.saveToken({ token: this.token.token });
      this.show = false;
      this.$nextTick(_ => {
        this.show = true;
      });
      // 更新页面数据
    }
  },
  computed: {
    // ...mapState({
    //   token: state => state.datas.token
    // })
  },
  methods: {
    ...mapActions(["setTab", "saveToken"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },

    async getUserInfo() {
      // let token = await this.native.getToken({});
      console.log("用户token", this.token);
      let token = await this.token;
      let info = await this.api.userDetail({ token: token.token });
      let info2 = await this.api.getMineHeadInfo({ token: token.token });
      this.userInfo = info.data;
      this.userInfo2 = info2.data;
      console.log("info---", info);
      if (info.error_code == 1005) {
        this.replaceParamVal("token","")
      }
      console.log("info2---", this.userInfo2);
    },
    replaceParamVal(paramName, replaceWith) {
      var oUrl = window.location.href.toString();
      var re = eval("/(" + paramName + "=)([^&]*)/gi");
      var nUrl = oUrl.replace(re, paramName + "=" + replaceWith);
      this.location = nUrl;
      window.location.href = nUrl;
    },
    gotoPage(obj) {
      // if (obj === '') return
      console.log('obj',obj);
      
      // this.$router.push({ name: obj.name })
      // 此页面所有路由跳转都要调用此原生通知
      this.native.routerGoTo({
        url:
          "http://guacheapi.sinmore.vip/#" +
          obj.pageUrl +
          "?token=" +
          this.token.token
      });
    },
    gotoPage2(obj) {
      // if (obj === '') return
      // this.$router.push({ name: obj.name })
      // 此页面所有路由跳转都要调用此原生通知
      // this.native.routerGoTo({ url: 'http://h5.gc-app.com/#' + obj.pageUrl })
      this.native.gotoQualityMain();
    },
    gotoPage3(obj) {
      // if (obj === '') return
      // this.$router.push({ name: obj.name })
      // 此页面所有路由跳转都要调用此原生通知
      this.native.routerGoTo({
        url:
          "http://h5.gc-app.com/#" + obj.pageUrl + "?token=" + this.token.token
      });
      // this.native.gotoQualityMain();
    },
    gotoPointMail() {
      this.native.gotoPointsMall({});
    }
  }
};
</script>

<style lang='less' scoped>
.Mine {
  background: #ffffff;
  min-height: 100vh;
  .top {
    width: 100%;
    height: 390px;
    background: #50ecfe;
    position: relative;
    margin-bottom: 100px;
    .top-1 {
      width: 100%;
      padding: 30px;
      justify-content: space-between;
      box-sizing: border-box;
      .top-set {
        width: 44px;
        height: 44px;
      }
      .top-alerm {
        width: 42px;
        height: 44px;
      }
    }
    .t-info {
      width: 100%;
      box-sizing: border-box;
      padding: 30px;
      justify-content: space-between;
      align-items: center;
      .t-head {
        .t-img {
          width: 121px;
          height: 121px;
          border-radius: 60px;
          flex: 1;
          float: left;
        }
        .t-box {
          float: left;
          margin-left: 28px;
          justify-content: center;
          flex: 5;
          .t-title {
            font-size: 40px;
            color: #ffffff;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 520px;
          }
          .t-des {
            font-size: 26px;
            color: #ffffff;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 520px;
          }
        }
      }
      .t-arrow {
        min-width: 13px;
        height: 28px;
      }
    }
    .top-box {
      position: absolute;
      bottom: -90px;
      left: 50%;
      transform: translateX(-50%);
      width: 690px;
      height: 180px;
      border-radius: 10px;
      background: #ffffff;
      box-shadow: 0 0 10px #0cc;
      .top-box2 {
        width: 100%;
        height: 100%;
        justify-content: space-around;
        .top-item {
          .top-num {
            font-size: 48px;
            color: #333333;
            font-weight: bold;
          }
          .top-txt {
            font-size: 28px;
            color: #333333;
          }
        }
      }
    }
  }
  .box {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    .b-box {
      justify-content: space-between;
      width: 690px;
      box-sizing: border-box;
      // padding: 0 30px;
      align-items: center;
      height: 110px;
      margin: 0 auto;
      border-bottom: 1px solid #e6e6e6; /*no*/
      background: #ffffff;
      .b-left {
        flex-grow: 1;
        align-items: center;
        .b-txt {
          font-size: 32px;
          color: #333333;
          margin-left: 18px;
        }
        .b-left-icon {
          width: 31px;
          height: 32px;
        }
      }
      .b-arrow {
        .b-arrow-img {
          min-width: 16px;
          height: 29px;
        }
      }
    }
  }
}
</style>
