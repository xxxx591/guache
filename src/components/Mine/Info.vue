<template>
  <div class="Info">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">基本信息</div>
    </div>
    <div class="head flex-h" @click.stop="changeHeadImg">
      <div class="h-txt">头像</div>
      <img :src="userInfo.avatar" class="h-img">
    </div>
    <div class="box">
      <div
        class="b-box flex-h"
        @click.stop="gotoPage({name: 'ModifyNickname', pageUrl: '/Mine/ModifyNickname'})"
      >
        <div class="b-left flex-h">
          <div class="b-txt">昵称:</div>
        </div>
        <div class="b-arrow flex-h">
          <div class="b-arrow-txt">{{userInfo.nickname || ''}}</div>
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div class="b-box flex-h other" @click.stop="gotoPage({name: 'Des', pageUrl: '/Mine/Des'})">
        <div class="b-left flex-h">
          <div class="b-txt">自我介绍:</div>
        </div>
        <div class="b-arrow flex-h">
          <div class="b-arrow-txt b-desc">{{userInfo.desc}}</div>
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div class="b-box flex-h" @click.stop="gotoPage({name: 'ChangePwd', pageUrl: '/ChangePwd'})">
        <div class="b-left flex-h">
          <div class="b-txt">修改密码:</div>
        </div>
        <div class="b-arrow flex-h">
          <!-- <div class="b-arrow-txt">我的简介是新墨科技产品经理</div> -->
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div
        class="b-box flex-h"
        @click.stop="gotoPage({name: 'ModifyPhone', pageUrl: '/Mine/ModifyPhone'})"
      >
        <div class="b-left flex-h">
          <div class="b-txt">修改手机:</div>
        </div>
        <div class="b-arrow flex-h">
          <div class="b-arrow-txt">{{userInfo.mobile}}</div>
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <!-- 该功能取消 -->
      <!-- <div class="b-box flex-h">
        <div class="b-left flex-h">
          <div class="b-txt">微信:</div>
        </div>
        <div class="b-arrow flex-h">
          <div class="b-arrow-txt">{{userInfo.mobile}}</div>
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>
      <div class="b-box flex-h">
        <div class="b-left flex-h">
          <div class="b-txt">QQ:</div>
        </div>
        <div class="b-arrow flex-h">
          <div class="b-arrow-txt">112233</div>
          <img src="../../assets/right-arrow.png" class="b-arrow-img">
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: "Info",
  data() {
    return {
      userInfo: {}
    };
  },
  computed: {
    
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    async getUserInfo() {
       
      let info = await this.api.userDetail({ token: this.$route.query.token });
      this.userInfo = info.data;
      console.log("info---", info);
    },
    topBack() {
      this.native.back_btn({})
      // this.$router.back(-1);
    },
    async changeHeadImg() {
      let resultImg = await this.native.uploadImgs({ count: 1, type: "user" });
      console.log('resultImg',resultImg);
      console.log('this.$route.query.token',this.$route.query.token);
      
      if (resultImg.image.length === 0) return;
       
      await this.api.modifyHeadImg({
        token: this.$route.query.token,
        avatar: resultImg.image[0]
      });
      this.getUserInfo();
    },
    gotoPage(obj) {
      if (obj === "") return;
      this.$router.push({
        name: obj.name,
        query: {
          nickName: this.userInfo.nickname || "挂车之家用户",
          des: this.userInfo.desc,
          mobile: this.userInfo.mobile
        }
      });
      // 此页面所有路由跳转都要调用此原生通知
      // this.native.routerGoTo({ url: 'http://gczj.sinmore.vip/html/#' + obj.pageUrl })
    }
  }
};
</script>

<style lang='less' scoped>
.Info {
  background: #ffffff;
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
  .head {
    width: 690px;
    height: 160px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6; /*no*/
    margin: 0 auto;
    .h-txt {
      font-size: 32px;
      color: #333333;
    }
    .h-img {
      width: 90px;
      height: 90px;
      border-radius: 45px;
    }
  }
  .box {
    width: 100%;
    height: 110px;
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
          min-width: 2.066667rem;
        }
      }
      // &.other {
      //   height: 400px;
      //   .b-arrow {
      //     .b-desc {
      //       white-space: normal;
      //       width: auto;
      //     }
      //   }
      // }
      .b-arrow {
        align-items: center;
        .b-arrow-img {
          min-width: 16px;
          height: 29px;
        }
        .b-arrow-txt {
          font-size: 32px;
          color: #999999;
          margin-right: 20px;
        }
        .b-desc {
          width: 6.466667rem;
          white-space: nowrap;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
          // display: flex;
          flex-direction: row-reverse;
        }
      }
    }
  }
}
</style>
