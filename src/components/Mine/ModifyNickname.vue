<template>
  <div class="ModifyNickname" v-bind:style="{height: mobileHeight + 'px'}">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">修改昵称</div>
    </div>
    <div class="box">
      <div class="input">
        <!-- <img src="../../assets/img/clear.png" alt class="clear-img"> -->
        <input type="text" autofocus="autofocus" v-model="nickName" placeholder="请输入昵称">
      </div>
    </div>
    <div class="btn" @click.stop="saveNickname">保存</div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: "ModifyNickname",
  data() {
    return {
      nickName: ""
    };
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
      mobileHeight: state => state.datas.mobileHeight
    })
  },
  created() {
    this.nickName = this.$route.query.nickName;
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    async saveNickname() {
      let token = await this.native.getToken({});
      let result = await this.api.modifyNickname({
        token: token.token,
        nickname: this.nickName
      });
      if (result.error_code === 0) {
        this.topBack();
      }
      console.log("result---", result);
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1);
    }
  }
};
</script>

<style lang='less' scoped>
.ModifyNickname {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  background: #ffffff;
  min-height: 100vh;
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
  .box {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    .input {
      height: 88px;
      border-radius: 10px;
      font-size: 32px;
      line-height: 40px;
      display: flex;
      background: #fafafa;
      align-items: center;
      padding: 0 8px;
      position: relative;
      margin-top: 30px;

      .clear-img {
        width: 31px;
        height: 31px;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
      input {
        flex: 1;
        height: 88px;
        background: #fafafa;
        border: none;
        outline: none;
        font-size: 32px;
      }
    }
  }
  .btn {
    width: 8.533333rem;
    height: 1.173333rem;
    background: #4ccdfa;
    border-radius: 0.586667rem;
    color: white;
    font-size: 0.48rem;
    margin: 0 auto;
    margin-top: 1.066667rem;
    text-align: center;
    line-height: 1.173333rem;
    &:active {
      opacity: 0.75;
    }
  }
}
// display: -webkit-box;
// -webkit-box-orient: vertical;
// -webkit-line-clamp: 2;
// text-overflow: ellipsis;
// overflow: hidden;
</style>
