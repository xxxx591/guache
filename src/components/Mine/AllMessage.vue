<template>
  <div class="Collect">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back" />
      <div class="top-txt">消息中心</div>
    </div>
    <div class="list" v-if="show">
      <div class="list-item" @click.stop="waiter">
        <div class="left-box">
          <img src="../../assets/kefu-message.png" alt />
        </div>
        <div class="right-box">
          <p>在线客服</p>
          <!-- <p>查看与客服的沟通记录</p> -->
        </div>
        <!-- <em>{{list.serve_notice_car}}</!-->
        <i>></i>
      </div>
      <div class="list-item" @click.stop="gotoPage({name: 'Message', pageUrl: '/Mine/Message'})">
        <div class="left-box">
          <img src="../../assets/message.png" alt />
        </div>
        <div class="right-box">
          <p>服务消息</p>
          <!-- <p>查看与客服的沟通记录</p> -->
        </div>
        <em
          v-if="list.serve_notice_car+list.serve_notice_note!=0"
        >{{list.serve_notice_car+list.serve_notice_note}}</em>
        <i>></i>
      </div>
      <div
        class="list-item"
        @click.stop="gotoPage({name: 'AdminMessage', pageUrl: '/Mine/AdminMessage'})"
      >
        <div class="left-box">
          <img src="../../assets/admin.png" alt />
        </div>
        <div class="right-box">
          <p>系统消息</p>
          <!-- <p>板车订购交货时间延后说明</p> -->
        </div>
        <em v-if="list.system_notice_num!=0">{{list.system_notice_num}}</em>
        <i>></i>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: "Collect",
  data() {
    return {
      token: "",
      list: [],
      show: true
    };
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  async mounted() {
    this.token = await this.native.getToken();
    this.init();
  },
  methods: {
    async init() {
      let params = {
        token: this.token,
        page: 0,
        pagesize: 30
      };
      let data = await this.api.getTwoWeidu(params);
      console.log("params", data);
      this.show = false;
      this.$nextTick(_ => {
        this.list = data.data;
        this.show = true;
      });
    },
    gotoPage(obj) {
      if (obj === "") return;
      this.$router.push({ name: obj.name });
      // 此页面所有路由跳转都要调用此原生通知
      // this.native.routerGoTo({ url: 'http://gczj.sinmore.vip/html/#' + obj.pageUrl })
    },
    waiter() {
      (function(m, ei, q, i, a, j, s) {
        m[i] =
          m[i] ||
          function() {
            (m[i].a = m[i].a || []).push(arguments);
          };
        (j = ei.createElement(q)), (s = ei.getElementsByTagName(q)[0]);
        j.async = true;
        j.charset = "UTF-8";
        j.src = "https://static.meiqia.com/dist/meiqia.js?_=t";
        s.parentNode.insertBefore(j, s);
      })(window, document, "script", "_MEIQIA");
      window._MEIQIA("entId", 147235);
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
  .list {
    padding: 30px;
    .list-item {
      display: flex;
      font-size: 32px;
      position: relative;
      padding-bottom: 30px;
      border-bottom: 1px solid #cacaca;
      margin-top: 30px;
      &:first-of-type {
        margin-top: 0;
      }
      .left-box {
        width: 80px;
        height: 80px;
        margin-right: 30px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right-box {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        p {
          margin: 0;
          width: 100%;
          font-size: 32px;
          &:last-of-type {
            font-size: 24px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            // color: rgba(153, 153, 153, 1);
            color: #000000;
          }
        }
      }
      i {
        position: absolute;
        top: 50%;
        right: 20px;
        font-size: 40px;
        margin-top: -30px;
      }
      em {
        position: absolute;
        right: 50px;
        top: 50%;
        margin-top: -26px;
        background: #ff4400;
        color: #fff;
        width: 36px;
        text-align: center;
        line-height: 36px;
        border-radius: 50%;
        font-size: 24px;
        font-style: normal;
      }
    }
  }
}
</style>
