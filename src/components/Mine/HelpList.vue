
<template>
  <div class="HelpList">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">帮助</div>
    </div>
    <div class="box">
      <div class="box-item flex-v">
        <div class="box-title">Q：{{helpDetailList.name}}</div>
        <div class="box-des" v-html="helpDetailList.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: 'HelpList',
  data() {
    return {
      helpDetailList: []
    }
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  created() {
    this.getHelpDetail(this.$route.query.id)
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1)
    },
    async getHelpDetail(id) {
      let token = await this.native.getToken({})
      let list = await this.api.helpDetail({ token: token.token, help_id: id })
      // 此处应是数组, TODOS
      this.helpDetailList = list.data
    }
  }
}
</script>

<style lang='less' scoped>
.HelpList {
  padding-top: 95px;
  .top {
    width: 100%;
    height: 85px;
    position: fixed;
    top: 0;
    left: 0px;
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
    padding: 0 30px;
    .box-item {
      // height: 145px;
      width: 100%;
      border-bottom: 1px solid #e6e6e6; /*no*/
      justify-content: center;
      overflow-x: scroll;
      .box-title {
        font-size: 32px;
        color: #333333;
        font-weight: bold;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .box-des {
        // font-size: 24px;
        // color: #666666;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 1;
        // text-overflow: ellipsis;
        // overflow: hidden;
      }
    }
  }
}
</style>
