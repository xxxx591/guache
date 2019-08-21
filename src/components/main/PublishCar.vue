<template>
  <div class="PublishCar">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">发布车辆</div>
      <div class="top-publish" @click.stop="publishArticle">发布</div>
    </div>
    <div class="pic">
      <div class="pic-txt">车辆图片</div>
      <div class="pic-img flex-h">
        <div
          class="pic-box"
          v-for="(item, index) in imgArr"
          @click.stop="deleteImg(item) "
          :key="index"
        >
          <img :src="item" class="pic-img2">
          <img src="../../assets/delete-img.png" alt class="pic-delete">
        </div>
        <div class="pic-add flex-h flex-cc" @click.stop="uploadImg">
          <img src="../../assets/add.png" class="pic-add-img">
        </div>
      </div>
      <div class="pic-line"></div>
    </div>

    <div class="car-detail">车辆详情</div>

    <div
      class="con-txt"
      ref="writeBox"
      v-html="htmlForEditor"
      contenteditable="true"
      placeholder="请输入..."
    ></div>
    <div class="bottom">
      <div class="b-box flex-h" @click.stop="articleAddImg">
        <img src="../../assets/img.png" class="b-box-img">
        <div class="b-box-title">添加图片</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  name: "PublishCar",
  data() {
    return {
      htmlForEditor: "",
      imgArr: [],
      form: {}
    };
  },
  computed: {
    ...mapState({
      token: state => state.datas.token
    })
  },
  mounted() {
    var _this = this;
    // this.$refs.publishBox.style.height = document.body.clientHeight + "px";
    document.addEventListener("selectionchange", function() {
      var sel = getSelection();
      // console.log(sel)
      if (!sel) {
        return;
      }
      var node = sel.anchorNode;
      // console.log(node.node.nodeType)
      var isIn = false;
      while (node && node.nodeType != node.DOCUMENT_NODE) {
        var cls = node.classList;
        if (cls && cls.contains("con-txt")) {
          isIn = true;
          break;
        }
        node = node.parentNode;
      }
      if (!isIn) return;
      // console.log("getCursor");
      // console.log(sel)
      self.select = sel;
      self.lastRange = sel.getRangeAt(0);
      // console.log(self.lastRange)
      _this.showUpFile = true;
    });
  },
  created() {
    this.form = this.$route.query;
     let addr = this.form.selectedAddr.split(" ");
      console.log("adddr--", addr[0], addr[1],addr[2]);
  },
  methods: {
    // ...mapActions(["saveToken"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    async publishArticle() {
      let content = encodeURIComponent(this.$refs.writeBox.innerHTML);
      let addr = this.form.selectedAddr.split(" ");
      console.log("adddr--", addr[0], addr[1]);
      if (!content) {
        this.$toast("内容不能为空!");
        return;
      }
      if (this.imgArr.length === 0) {
        this.$toast("车辆图片不能为空!");
        return;
      }

      let token = await this.native.getToken({});
      let result = await this.api.publishSecondCar({
        token: token.token,
        name: this.form.carName,
        desc: this.form.des,
        type: this.form.type || 1,
        colour: this.form.selectedColorId,
        vehicle_id: this.form.selectedBrand2Id,
        price: this.form.price,
        load: parseInt(this.form.selectedCarWeight),
        course: this.form.carDistance == "全新" ? "1" : this.form.carDistance,
        plate_time: parseInt(this.form.carCardTime),
        years: parseInt(this.form.selectedYear),
        province: addr[0],
        city: addr[1],
        area:addr[2],
        count: this.form.selectedGuoHuNum,
        turbo: this.form.selectedDismiss,
        motor: this.form.engineData,
        contact: this.form.userName,
        mobile: this.form.phone,
        content: content,
        pic: this.imgArr
        // pic: ['http://gczj.sinmore.vip/storage/banner/20190328/uNdrMB4RNwPDQCQGwcamtwmsZFHEqja2sz2BrDnA.png']
      });
      // this.$toast(result, 6000)
      if (!result.error_code) {
        console.log("result", result);

        this.$toast("发布成功!");
        setTimeout(() => {
          if (this.form.type == 1) {
            this.$router.push({ name: "SecondCar" });
          } else {
            this.$router.push({ name: "SecondCarQian" });
          }
        }, 100);
      }
      console.log("publishArticle--result---", result);
    },
    pasteHtmlAtCaret(html, type) {
    var sel;
      var range;
      // if (window.getSelection) {
      sel = self.select;
      range = self.lastRange;
      range.deleteContents();
      var el = document.createElement("div");
      el.innerHTML = html;
      var frag = document.createDocumentFragment();
      var node;
      var lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1);
    },
    async uploadImg() {
      let result = await this.native.uploadImgs({ count: 6, type: "user" });
      if (result.image.length === 0) return;
      result.image.forEach((item, indeex) => {
        this.imgArr.push(item);
      });
    },
    async articleAddImg() {
      let result = await this.native.uploadImgs({ count: 6, type: "user" });
      console.log("result", result);

      if (result.image.length === 0) return;
      result.image.forEach((item, index) => {
        this.pasteHtmlAtCaret(
          `<img style="width:100%;margin: 0 auto;display: block;" src="${item}"><br/>`
        );
      });
      // this.pasteHtmlAtCaret(`<img style="width:80%;margin: 0 auto;display: block;" src="${result.image[0]}"><br/>`)
    },
    deleteImg(img) {
      this.imgArr.forEach((item, index) => {
        if (item === img) {
          this.imgArr.splice(index, 1);
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.PublishCar {
  width: 100%;
  background: #ffffff;
  min-height: 100vh;
  padding-top: 90px;
  .top {
    height: 85px;
    // position: relative;
    border-bottom: 1px solid #e6e6e6; /*no*/
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
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
    .top-publish {
      width: 65px;
      height: 45px;
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translateY(-50%);
      color: #4ccdfa;
      white-space: nowrap;
      font-size: 28px;
    }
  }
  .pic {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    .pic-line {
      padding-bottom: 40px;
      border-bottom: 1px solid #e6e6e6; /*no*/
    }
    .pic-txt {
      font-size: 28px;
      color: #333333;
      margin-bottom: 20px;
    }
    .pic-img {
      width: 100%;
      flex-wrap: wrap;
      .pic-box {
        width: 160px;
        height: 160px;
        box-sizing: border-box;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        margin-top: 30px;
        margin-left: 30px;
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

      .pic-add {
        width: 160px;
        height: 160px;
        box-sizing: border-box;
        background: #f7f8fa;
        margin-left: 30px;
        margin-top: 30px;
        .pic-add-img {
          width: 94px;
          height: 94px;
        }
      }
    }
  }
  .car-detail {
    font-size: 28px;
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
  }
  .con-txt {
    width: 690px;
    margin: 0 auto;
    min-height: 600px;
    padding: 30px;
    box-sizing: border-box;
    outline: none;
    border: none;
    font-size: 28px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    margin-bottom: 100px;
    border: 1px solid #e6e6e6;
    padding-bottom: 1.3rem;
  }
  .bottom {
    width: 100%;
    position: fixed;
    bottom: 0px;
    height: 80px;
    // box-sizing: border-box;
    padding-left: 35px;
    background: #ffffff;
    .b-box {
      width: 100%;
      align-items: center;
      // padding-bottom: 40px;
      .b-box-img {
        width: 40px;
        height: 40px;
      }
      .b-box-title {
        font-size: 32px;
        color: #4ccdfa;
        margin-left: 20px;
      }
    }
  }
}
</style>
