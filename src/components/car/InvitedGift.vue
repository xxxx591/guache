<template>
  <div class="InvitedGift">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">邀请有礼</div>
    </div>
    <div class="invite flex-v">
      <img src="../../assets/invite2.png" class="i-img">
      <div class="i-earn">邀请既得</div>
      <div class="i-ji">{{inviteData.integral}}积分</div>
      <div class="i-btn flex-h flex-cc">立即邀请</div>
    </div>
    <div class="info">
      邀请规则：
      <br>平台以订单异常、系统升级为由要求您点击任何网址链接进行退 款操作。
    </div>
    <div class="mid flex-h">
      <div class="m-left flex-h">
        <div class="m-icon">
          <img src="../../assets/person2.png" alt class="m-icon-img">
        </div>
        <div class="m-l-right">
          <div class="ml-title">成功邀请(人)</div>
          <div class="ml-num">{{inviteData.number}}</div>
        </div>
      </div>
      <div class="m-right flex-h">
        <div class="m-icon">
          <img src="../../assets/money.png" alt class="m-icon-img">
        </div>
        <div class="m-l-right">
          <div class="ml-title">累计奖励(积分)</div>
          <div class="ml-num">{{inviteData.invite_sum}}</div>
        </div>
      </div>
    </div>
    <div class="invite-record flex-h">邀请记录</div>
    <div class="record">
      <div class="r-box flex-h" v-for="(item, index) in inviteList">
        <div class="r-left flex-h">
          <img src="item.avatar" class="r-img">
          <div class="r-left2 flex-v">
            <div class="r-name">{{item.nickname}}</div>
            <div class="r-phone">{{item.mobile}}</div>
          </div>
        </div>
        <div class="r-right">{{item.created_at}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'InvitedGift',
  data() {
    return {
      inviteList: [],
      inviteData: {}
    }
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
    })
  },
  created() {
    this.getInviteData()
    this.getShareData()
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    async getShareData() {
      let token = await this.native.getToken({})
      let data = await this.api.invitePageData({ token: token.token })
      this.inviteData = data.data
      console.log('data--', data)
    },
    async getInviteData() {
      let token = await this.native.getToken({})
      let list = await this.api.inviteList({ token: token.token, page: 1, pagesize: 10000 })
      list.data.data.forEach((item, index) => {
        item.created_at = item.created_at.substr(0, 10)
      })
      this.inviteList = list.data.data
      console.log('list--', list)
    },
    topBack() {
      this.native.back_btn({})
      this.$router.back(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.InvitedGift {
  width: 100vw;
  min-height: 100vh;
  background: #f7f8fa;
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
  .invite {
    background: #ffffff;
    align-items: center;
    .i-img {
      width: 220px;
      height: 225px;
      margin-top: 50px;
    }
    .i-earn {
      font-size: 28px;
      color: #999999;
      margin-top: 30px;
    }
    .i-ji {
      font-size: 40px;
      color: #ff5d25;
      margin-top: 10px;
      font-weight: bold;
    }
    .i-btn {
      width: 640px;
      height: 70px;
      background: #4ccdfa;
      font-size: 30px;
      color: #ffffff;
      border-radius: 35px;
      margin-top: 40px;
    }
  }
  .info {
    background: #ffffff;
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    color: #999999;
    font-size: 24px;
  }
  .mid {
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    background: #ffffff;
    margin: 20px 0;
    .m-left {
      min-width: 374px;
      max-width: 374px;
      height: 100%;
      align-items: center;
      .m-icon {
        min-width: 60px;
        max-width: 60px;
        margin-left: 30px;
        height: 50px;
        .m-icon-img {
          width: 100%;
          height: 100%;
        }
      }
      .m-l-right {
        margin-left: 30px;
        .ml-title {
          font-size: 28px;
          color: #999999;
        }
        .ml-num {
          font-size: 32px;
          color: #ff5d25;
          font-weight: bold;
        }
      }
    }
    .m-right {
      width: 374px;
      height: 80px;
      border-left: 1px solid #e5e5e5; /*no*/
      align-self: center;
      align-items: center;
      .m-icon {
        min-width: 60px;
        max-width: 60px;
        margin-left: 30px;
        height: 50px;
        .m-icon-img {
          width: 100%;
          height: 100%;
        }
      }
      .m-l-right {
        margin-left: 30px;
        .ml-title {
          font-size: 28px;
          color: #999999;
        }
        .ml-num {
          font-size: 32px;
          color: #ff5d25;
          font-weight: bold;
        }
      }
    }
  }
  .invite-record {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    padding: 30px;
    font-size: 28px;
    color: #999999;
    align-items: center;
  }
  .record {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    background: #ffffff;
    .r-box {
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6; /*no*/
      // padding-bottom: 30px;
      height: 140px;
      .r-left {
        align-items: center;
        .r-img {
          width: 80px;
          height: 80px;
          border-radius: 40px;
        }
        .r-left2 {
          justify-content: center;
          margin-left: 20px;
          .r-name {
            font-size: 29px;
            color: #333333;
          }
          .r-phone {
            font-size: 24px;
            color: #999999;
          }
        }
      }
      .r-right {
        height: 80px;
        font-size: 24px;
        color: #999999;
        align-self: center;
      }
    }
  }
}
</style>
