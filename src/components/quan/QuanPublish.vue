<template>
  <div class="QuanPublish">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back" />
      <div class="top-txt">发布内容</div>
      <div class="top-publish" @click.stop="publishArticle">发布</div>
    </div>

    <div class="box">
      <input type="text" class="title" placeholder="请输入标题" v-model="title" />
    </div>

    <div
      class="editorBox content"
      ref="writeBox"
      v-html="htmlForEditor"
      contenteditable="true"
      placeholder="请输入..."
    ></div>
    <div class="category">
      <div class="b-box flex-h">
        <div class="b-box2 flex-h" @click.stop="articleAddImg">
          <img src="../../assets/img.png" class="b-box-img" />
          <div class="b-box-title">添加内容图片</div>
        </div>
        <div class="b-box2 flex-h" @click.stop="addCoverImg">
          <img src="../../assets/img.png" class="b-box-img" />
          <div class="b-box-title">{{coverImg ? '已上传封面图' : '添加封面图'}}</div>
        </div>
      </div>
      <div class="c-c-box">
        <div
          class="c-box flex-h"
          @click.stop="isShowSelectedCategoryBox = !isShowSelectedCategoryBox"
        >
          <div class="c-left">{{selectedCategory.name || '选择所属分类'}}</div>
          <img src="../../assets/right-arrow.png" class="c-img" />
        </div>
      </div>
    </div>

    <div
      class="pop-box"
      v-show="isShowSelectedCategoryBox"
      @click.stop="isShowSelectedCategoryBox = !isShowSelectedCategoryBox"
    >
      <div class="pop-mask" @mousedown.stop="tempMove">
        <div class="select-color flex-v flex-cc">
          <div class="sc-title">选择分类</div>
          <div class="sc-box">
            <div
              class="sc-color"
              @click.stop="selectCategory(item)"
              v-for="(item, index) in categoryList"
              :key="index"
            >{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import { setTimeout } from "timers";

export default {
  name: "QuanPublish",
  data() {
    return {
      title: "",
      htmlForEditor: "",
      imgArr: [],
      categoryList: [],
      selectedCategory: {},
      isShowSelectedCategoryBox: false,
      coverImg: "",
      jieliu: true,
      isshow: true
    };
  },
  computed: {
    ...mapState({
      token: state => state.datas.token
    })
  },
  watch: {
    htmlForEditor(newName, oldName) {
      console.log("val", oldName);
    }
  },
  created() {
    this.getCategory();
  },
  methods: {
    tempMove() {},
    // ...mapActions(["saveToken"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    changer(e) {
      console.log("e,", e.target.innerHTML);
      if (e.target.innerHTML.length > 0) {
        this.isshow = false;
      } else {
        this.isshow = true;
      }
    },
    async getCategory() {
      // let token = await this.native.getToken({});
      let list = await this.api.getTieZiCategory({});
      let arr = [];
      let arr2 = [];
      list.data.map(item => {
        if (this.$route.query.type == 1) {
          if (item.id == 4 || item.id == 5) {
            arr.push(item);
          } else {
            arr2.push(item);
          }
        } else {
          if (item.id == 4 || item.id == 5) {
            } else { 
            arr.push(item);
          }
        }
      });
      console.log(arr);
      console.log("this", this.$route.query.type);

      this.categoryList = arr;
    },
    async publishArticle() {
      if (this.jieliu) {
        this.jieliu = false;
        let content = (this.$refs.writeBox.innerHTML);
  console.log('content',content);
        // this.pasteHtmlAtCaret(`<img style="width=30px;height:30px;" src="http://www.sinmore.com.cn/Public/Home/images/news_1.jpg" alt="">`)

        if (
          this.tool.checkEmpty(
            [this.title, content, this.selectedCategory.id],
            ["标题不能为空!", "内容不能为空!", "分类不能为空!"]
          ) === false
        ) {
          return;
        }
        let token = await this.native.getToken({});
        let result = await this.api.quanPublishArticle({
          token: token.token,
          title: this.title,
          thumb: this.coverImg,
          content: content,
          note_category_id: this.selectedCategory.id
        });
        if (!result.error_code) {
          this.$toast("发布成功!");
          this.native.gotoQuan();
        }
      } else {
        this.$toast("点击过快，请稍后再试");
        setTimeout(_ => {
          this.jieliu = true;
        }, 3000);
        return;
      }
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
      this.native.back_btn({});
      this.$router.back(-1);
    },
    async articleAddImg() {
      let result = await this.native.uploadImgs({ count: 6, type: "user" });
      console.log("result", result);

      if (result.image.length === 0) return;
      // result.image.forEach((item, index) => {
      //   this.pasteHtmlAtCaret(
      //     `<img style="width:100%;margin: 0 auto;display: block;" src="${item}"><br/>`
      //   );
      // });
      this.pasteHtmlAtCaret(
        `<img style="width:80%;margin: 0 auto;display: block;" src="${
          result.image[0]
        }"><br/>`
      );
    },
    selectCategory(item) {
      this.selectedCategory = item;
      this.isShowSelectedCategoryBox = !this.isShowSelectedCategoryBox;
    },
    async addCoverImg() {
      let result = await this.native.uploadImgs({ count: 1, type: "user" });
      // this.$toast(result, 1500)
      if (result.image.length === 0) return;
      this.coverImg = result.image[0];
      console.log('this.cover',this.coverImg);
      
    }
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
        if (cls && cls.contains("editorBox")) {
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
  }
};
</script>

<style lang='less' scoped>
.QuanPublish {
  min-width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 150px;

  .title-div {
    padding: 0.4rem;
    position: absolute;
    color: #999;
    margin: 0;
  }
  .top {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 85px;
    border-bottom: 1px solid #e6e6e6; /*no*/
    background: #ffffff;
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
  .box {
    height: 110px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #e6e6e6; /*no*/
    padding: 30px;
    margin-top: 85px;
    .title {
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
      font-size: 36px;
      font-weight: bolder;
    }
  }
  .content {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    padding-bottom: 2.5rem;
    font-size: 28px;
    // border: 1px solid blue;
    min-height: 1200px;

    outline: none;
  }
  .category {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    background: #ffffff;
    padding: 30px;
    padding-bottom: 40px;
    // height: 90px;
    .c-c-box {
      background: #f7f8fa;
      width: 690px;
      height: 90px;
      .c-box {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 30px;
        justify-content: space-between;
        align-items: center;
        .c-left {
          font-size: 32px;
          color: #333333;
        }
        .c-img {
          width: 14px;
          height: 25px;
        }
      }
    }
    .b-box {
      width: 100%;
      align-items: center;
      padding-bottom: 20px;
      background: #ffffff;
      .b-box-img {
        width: 40px;
        height: 40px;
      }
      .b-box-title {
        font-size: 32px;
        color: #4ccdfa;
        margin-left: 20px;
      }
      .b-box2:nth-child(2) {
        margin-left: 100px;
      }
    }
  }
  .pop-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    overflow: hidden;
    .pop-mask {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ffffff;
      border-radius: 10px;
      .select-color {
        width: 400px;
        padding: 30px 0;
        .sc-title {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .sc-box {
          width: 100%;
          max-height: 800px;
          overflow-y: scroll;
          box-sizing: border-box;
          padding: 10px;
          .sc-color {
            font-size: 30px;
            padding: 10px 0;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
