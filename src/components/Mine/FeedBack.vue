<template>
  <div class="FeedBack">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back" />
      <div class="top-txt">留言反馈</div>
    </div>
    <div class="box">
      <div>
        <van-field
          readonly
          clickable
          :value="value"
          placeholder="请选择反馈类型"
          @click="showPicker = true"
        />

        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </div>
      <div class="b-input">
        <textarea
          cols="30"
          rows="10"
          v-model="content"
          maxlength="200"
          placeholder="请输入反馈内容"
          class="b-textarea"
        ></textarea>
      </div>
      <div class="b-input" style="    height: 52px;">
        <textarea
          cols="10"
          rows="10"
          v-model="phoneQQEmail"
          maxlength="200"
          placeholder="手机/QQ/邮箱"
          class="b-textarea"
        ></textarea>
      </div>
      <div>
        <div class="img-list">
          <!-- <van-image  round width="10rem" height="10rem" src="https://img.yzcdn.cn/vant/cat.jpeg" /> -->
          <img v-for="(item, index) in coverImg" :key="index" :src="item" alt />
        </div>
        <div class="b-box2 flex-h" @click.stop="addCoverImg">
          <p>最多上传6张图片</p>
          <img src="../../assets/addimg.png" class="b-box-img" />
        </div>
      </div>
    </div>
    <div class="submit" @click.stop="submit">
      <div class="submit-box flex-h flex-cc">提交</div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: "FeedBack",
  data() {
    return {
      content: "",
      imgArr: [],
      phoneQQEmail: "",
      value: "",
      showPicker: false,
      columns: ["技术反馈", "内容反馈", "投诉或其他"],
      type: 0,
      coverImg: []
    };
  },
  computed: {
    ...mapState({})
  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
      this.type = this.columns.findIndex(item => item === value) + 1;
    },
    inputBlur() {
      window.scrollTo(0, 0);
    },
    topBack() {
      this.$router.back(-1);
    },
    async addCoverImg() {
      let result = await this.native.uploadImgs({ count: 1, type: "user" });
      // this.$toast(result, 1500)
      if (result.image.length === 0) return;
      if (this.coverImg.length == 6) {
        return;
      } else {
        this.coverImg.push(result.image[0]);
      }
    },
    async submit() {
      if (!this.content) {
        this.$toast("内容不能为空!");
        return;
      } else if (this.type == 0) {
        this.$toast("请选择问题分类!");
        return;
      }
      let token = await this.native.getToken({});
      let result = this.api.sendFeedBack({
        token: token.token,
        content: this.content,
        type: this.type,
        contact_way: this.phoneQQEmail,
        pic: this.coverImg
      });
      if (result.error_code != 0) {
        this.$toast("反馈成功!");
        setTimeout(() => {
          this.$router.back(-1);
        }, 1500);
      }
    }
  }
};
</script>

<style lang='less' scoped>
.FeedBack {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
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
    padding: 30px;
    box-sizing: border-box;
    .img-list {
      padding: 30px 0;
      img {
        width: 200px;
        height: 200px;
        margin-right: 20px;
        display: inline-block;
      }
    }
    .b-category {
      background: #f7f8fa;
      height: 100%;
      width: 100%;
      .b-box {
        justify-content: space-between;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
        align-items: center;
        height: 110px;
        margin: 0 auto;
        .b-left {
          flex-grow: 1;
          align-items: center;
          .b-txt {
            font-size: 32px;
            color: #333333;
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
    .b-input {
      width: 100%;
      height: 320px;
      // padding: 30px;
      box-sizing: border-box;
      background: #f7f8fa;
      margin-top: 20px;
      .b-textarea {
        background: #f7f8fa;
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        resize: none;
        border: none;
        outline: none;
        font-size: 32px;
      }
      .con-txt {
        width: 690px;
        margin: 0 auto;
        min-height: 300px;
        padding: 30px;
        box-sizing: border-box;
        outline: none;
        border: none;
        font-size: 28px;
        // overflow-y: scroll;
        // -webkit-overflow-scrolling: touch;
        // margin-bottom: 100px;
        // border: 1px solid #e6e6e6;
      }
    }
    .b-contact {
      width: 100%;
      padding: 30px;
      box-sizing: border-box;
      background: #f7f8fa;
      margin-top: 20px;
      .b-c-input {
        width: 100%;
        height: 100%;
        background: #f7f8fa;
        outline: none;
        border: none;
      }
    }
    .pic {
      width: 100%;
      box-sizing: border-box;
      // padding: 30px;
      .pic-line {
        padding-bottom: 40px;
        border-bottom: 1px solid #e6e6e6; /*no*/
      }
      .pic-txt {
        font-size: 28px;
        color: #333333;
        margin-top: 30px;
      }
      .pic-img {
        width: 100%;
        flex-wrap: wrap;
        .pic-box {
          width: 200px;
          height: 200px;
          box-sizing: border-box;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          margin-top: 30px;
          // margin-left: 30px;
          margin-right: 30px;
          .pic-img2 {
            width: 100%;
            height: 100%;
          }
          .pic-delete {
            width: 32px;
            height: 32px;
            position: absolute;
            top: 5px;
            right: 5px;
          }
        }
        // .pic-box:nth-child(2),
        // .pic-box:nth-child(5) {
        //   // margin-left: 30px;
        //   // margin-right: 30px;
        // }
        .pic-add {
          width: 200px;
          height: 200px;
          box-sizing: border-box;
          background: #f7f8fa;
          // margin-left: 30px;
          margin-top: 30px;
          .pic-add-img {
            width: 94px;
            height: 94px;
          }
        }
      }
    }
    .van-cell {
      background-color: #f7f8fa;
      padding: 0.133333rem 0.2rem;
      align-items: center;
      line-height: 90px;
      font-size: 32px;
    }
  }
  .submit {
    width: 640px;
    height: 70px;
    margin: 0 auto;
    border-radius: 35px;
    background: #4ccdfa;
    margin-top: 100px;
    .submit-box {
      color: #ffffff;
      font-size: 30px;
      width: 100%;
      height: 100%;
    }
  }
  .b-box2 {
    flex-wrap: wrap;
    font-size: 32px;
    p {
      width: 100%;
    }
    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>
