<template>
  <div class="AddrManage">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">地址管理</div>
    </div>
    <div class="addr flex-h" v-for="(item, index) in addrList" @click.stop="chooseAddr(item)" :key="index">
      <div class="addr-left">
        <div class="addr-top flex-h">
          <div class="addr-name">{{item.cnee}}</div>
          <div class="addr-phone">{{item.mobile}}</div>
        </div>
        <div class="addr-des">{{item.province + item.city + item.area + item.address}}</div>
        <div class="addr-bottom flex-h" @click.stop="setDefaultAddr(item)">
          <img src="../../assets/selected.png" v-show="item.often" class="addr-selected">
          <img src="../../assets/unselected.png" v-show="!item.often" class="addr-unselected">
          <div class="addr-txt">设为默认</div>
        </div>
      </div>
      <div
        class="addr-right flex-h"
        @click.stop="$router.push({name: 'EditAddr', params: {addr: item}})"
      >编辑</div>
    </div>
    <div class="add-addr">
      <div class="add-box flex-h flex-cc">
        <div
          class="add-btn flex-h flex-cc"
          @click.stop="$router.push({name: 'AddAddr', params: {}})"
        >新增收货地址</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import eventBus from '@/service/eventBus.js'

export default {
  name: 'AddrManage',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'AddAddr') {
        vm.getAllAddr()
      }
    })
  },
  data() {
    return {
      addrList: []
    }
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
    })
  },
  created() {
    this.getAllAddr()
  },
  methods: {
    // ...mapActions(["saveToken"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    async getAllAddr() {
      let token = await this.native.getToken({})
      let list = await this.api.addrList({ token: token.token, page: 1, pagesize: 1000 })
      this.addrList = list.data.data
    },
    async setDefaultAddr(addr) {
      let token = await this.native.getToken({})
      await this.api.setDefaultAddr({ token: token.token, address_id: addr.id })
      // this.addrList.forEach((item, index) => {
      //   if (addr.id === item.id) {
      //     item.ofen = !item.ofen
      //   }
      // })
      this.getAllAddr()
    },
    chooseAddr(addr) { 
       this.$store.state.addr = addr 
      console.log('addr---', this.$store.state.addr)
      this.$router.back(-1)
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.AddrManage {
  padding-bottom: 200px;
  padding-top: 85px;
  .top {
    height: 85px;
    position: fixed;
    top: 0;
    width: 100%;
    background: #ffffff;
    border-bottom: 1px solid #e6e6e6; /*no*/
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
  .addr {
    box-sizing: border-box;
    // padding: 30px;
    width: 690px;
    margin: 0 auto;
    padding: 30px 0;
    border-bottom: 1px solid #e5e5e5; /*no*/
    .addr-left {
      flex-grow: 1;
      .addr-top {
        margin-bottom: 5px;
        .addr-name {
          font-size: 32px;
          color: black;
        }
        .addr-phone {
          font-size: 32px;
          color: black;
          margin-left: 24px;
        }
      }
      .addr-des {
        font-size: 24px;
        color: #999999;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 2;
        // text-overflow: ellipsis;
        // overflow: hidden;
        margin-bottom: 20px;
        padding-right: 5px;
      }
      .addr-bottom {
        align-items: center;
        .addr-selected {
          width: 28px;
          height: 28px;
        }
        .addr-unselected {
          width: 28px;
          height: 28px;
        }
        .addr-txt {
          font-size: 24px;
          color: #333333;
          margin-left: 10px;
        }
      }
    }
    .addr-right {
      min-width: 90px;
      min-height: 75px;
      border-left: 1px solid #e5e5e5; /*no*/
      font-size: 24px;
      color: #999999;
      align-items: center;
      flex-direction: row-reverse;
      padding-right: 5px;
      box-sizing: border-box;
    }
  }
  .add-addr {
    width: 100%;
    height: 110px;
    box-sizing: border-box;
    border-top: 1px solid #e5e5e5; /*no*/
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffffff;
    .add-box {
      width: 100%;
      height: 100%;
      .add-btn {
        width: 640px;
        height: 70px;
        background: #4ccdfa;
        font-size: 30px;
        border-radius: 35px;
        color: white;
        // transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
