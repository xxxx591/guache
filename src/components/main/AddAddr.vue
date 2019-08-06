<template>
  <div class="AddAddr">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">添加地址</div>
    </div>
    <div class="box flex-v">
      <div class="box-top">收件人</div>
      <input type="text" class="box-input" v-model="userName">
    </div>
    <div class="box flex-v">
      <div class="box-top">电话</div>
      <input type="text" class="box-input" v-model="phone">
    </div>
    <div class="box flex-v" @click.stop="isShowAddrBox = !isShowAddrBox">
      <div class="box-top">省市区</div>
      <div class="box-input1 flex-h">
        <div
          class="box-input"
        >{{(userAddr.province || '') + (userAddr.city || '') + (userAddr.area || '')}}</div>
        <img src="../../assets/right-arrow.png" alt class="box-img">
      </div>
    </div>
    <div class="box flex-v">
      <div class="box-top">详细地址</div>
      <input type="text" class="box-input" v-model="detailAddr">
    </div>

    <div class="addr-box" v-show="isShowAddrBox" @click.stop="isShowAddrBox = !isShowAddrBox">
      <div class="addr" @click.stop="tempClick">
        <v-distpicker type="mobile" @selected="selectAddr"></v-distpicker>
      </div>
    </div>

    <div class="add-addr">
      <div class="add-box flex-h flex-cc">
        <div class="add-btn add-sub flex-h flex-cc" @click.stop="deleteAddr">删除</div>
        <div class="add-btn flex-h flex-cc" @click.stop="saveAddr">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
// TODOS: 卸载此插件
import VDistpicker from 'v-distpicker'
import { mapActions, mapState } from "vuex"

export default {
  name: 'AddAddr',
  data() {
    return {
      isShowAddrBox: false,
      userAddr: {},
      userName: '',
      phone: '',
      detailAddr: '',
    }
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
    })
  },
  methods: {
    tempMove() { },
    tempClick() { },
    // ...mapActions(["saveToken"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    onAddressChange() {

    },
    selectAddr(addr) {
      this.isShowAddrBox = !this.isShowAddrBox
      // addr
      //   area: {code: "110105", value: "朝阳区"}
      //   city: {code: "110100", value: "北京城区"}
      //   province: {code: "110000", value: "北京市"}
      this.userAddr = {
        province: addr.province.value,
        city: addr.city.value,
        area: addr.area.value
      }
      console.log('addr--', addr)
    },
    deleteAddr() {
      this.userName = ''
      this.phone = ''
      this.userAddr = {}
      this.detailAddr = ''
    },
    checkAddr() {
      let rightPhone = false
      let notEmpty = this.tool.checkEmpty([this.userName, this.userAddr.city, this.detailAddr], ['姓名不能为空!', '地址不能为空!', '详细地址不能为空!'])
      if (notEmpty === true) {
        rightPhone = this.tool.checkPhoneNum(this.phone)
      } else {
        return false
      }
      if (rightPhone === true) {
        return true
      }
      return false
    },
    async saveAddr() {
      if (this.checkAddr() === false) return
      let token = await this.native.getToken({})
      let result = await this.api.addAddr({
        cnee: this.userName,
        mobile: this.phone,
        province: this.userAddr.province,
        city: this.userAddr.city,
        area: this.userAddr.area,
        address: this.detailAddr,
        token: token.token
      })
      if (result.error_code === 0) {
        this.$router.back(-1)
      }
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1)
    }
  },
  components: {
    VDistpicker
  }
}
</script>

<style lang='less' scoped>
.AddAddr {
  background: #ffffff;
  .top {
    height: 85px;
    position: relative;
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
  .box {
    height: 135px;
    box-sizing: border-box;
    padding: 0 30px;
    justify-content: center;
    border-bottom: 1px solid #e5e5e5; /*no*/
    .box-top {
      color: #999999;
      font-size: 24px;
      margin-bottom: 10px;
    }
    .box-input {
      color: #333333;
      font-size: 32px;
      height: 36px;
      line-height: 32px;
      outline: none;
      border: none;
      padding-left: 0;
      // background: #a4a3a5;
    }
    .box-input1 {
      justify-content: space-between;
      .box-img {
        width: 13px;
        height: 28px;
      }
    }
  }
  .addr-box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    overflow: hidden;
    z-index: 2;
    .addr {
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 700px;
      // border: 3px solid blue;
      box-sizing: border-box;
      // overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      background: #ffffff;
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
    .add-box {
      width: 100%;
      height: 100%;
      .add-btn {
        width: 300px;
        height: 70px;
        background: #4ccdfa;
        font-size: 30px;
        border-radius: 35px;
        color: white;
        // transform: translate(-50%, -50%);
      }
      .add-sub {
        background: #ffffff;
        border: 1px solid #4ccdfa; /*no*/
        font-size: 30px;
        color: #4ccdfa;
        margin-right: 40px;
      }
    }
  }
}
</style>
