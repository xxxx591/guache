<template>
  <div class="QuanDetail">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back" />
      <div class="top-txt">文章详情</div>
      <!-- <span style="position: absolute;right: 0.4rem;" @click="yaoqing">···</span> -->
    </div>
    <div class="box">
      <div class="title">{{articleDetail.title}}</div>
      <div class="mark flex-h">
        <div class="m-left flex-h">
          <div
            class="m-txt"
          >{{articleDetail.get_note_category && articleDetail.get_note_category.name}}</div>
          <div class="m-name">{{articleDetail.get_user && articleDetail.get_user.nickname}}</div>
          <div class="m-time">{{articleDetail.created_at}}</div>
        </div>
        <div class="m-view">{{articleDetail.view}}浏览</div>
      </div>
      <div class="box-line"></div>
    </div>
    <div class="content" v-html="articleDetail.content"></div>
    <div class="comments">
      <div class="comments-title">评论({{commentsList.length}})</div>
      <div class="comments-box" v-for="(item, index) in commentsList" :key="index">
        <div class="comments-top flex-h">
          <div class="comments-left flex-h">
            <div class="comments-img">
              <img :src="item.get_user.avatar" class="comments-img2" />
            </div>
            <div class="comments-name">{{item.get_user.nickname}}</div>
          </div>
          <div class="comments-right">{{item.created_at}}</div>
        </div>
        <div class="comments-txt">{{item.content}}</div>
        <div class="comments-line"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-box flex-h">
        <div class="b-input flex-h" @click.stop="pinglun" :class="{'show-hidden': type == 1008}">请输入要评论的内容</div>
        <div class="b-star" v-if="articleDetail.is_like==0">
          <img
            src="../../assets/undianzan.png"
            alt
            class="b-img"
            @click.stop="dianzan"
            style="width: 0.486667rem;height: 0.486667rem;"
          />
          <div class="b-num">{{articleDetail.like_count}}</div>
        </div>
        <div class="b-star" v-if="articleDetail.is_like==1">
          <img
            src="../../assets/dianzan.png"
            alt
            class="b-img"
            @click.stop="dianzan"
            style="width: 0.486667rem;height: 0.486667rem;"
          />
          <div class="b-num">{{articleDetail.like_count}}</div>
        </div>
        <div class="b-star" v-if="articleDetail.is_collect==0">
          <img src="../../assets/shoucang.png" alt class="b-img" @click.stop="shoucang" />
          <div class="b-num">{{articleDetail.collect_count}}</div>
        </div>
        <div class="b-star" v-if="articleDetail.is_collect==1">
          <img src="../../assets/shoucang-on.png" alt class="b-img" @click.stop="shoucang" />
          <div class="b-num">{{articleDetail.collect_count}}</div>
        </div>
        <div class="b-star" style="margin-left: 0.6rem;">
          <img
            src="../../assets/fenxiang2.png"
            alt
            class="b-img"
            @click.stop="yaoqing"
            style="width: 0.486667rem;height: 0.486667rem;"
          />
        </div>
      </div>
    </div>
    <div class="c-box" v-show="false">
      <div class="c-com">
        <div class="c-top flex-h">
          <div class="c-canvel">取消</div>
          <div class="c-send">发送</div>
        </div>
        <textarea cols="30" rows="10" class="c-textarea" placeholder="请输入要评价的内容"></textarea>
      </div>
    </div>
    <div class="box-c" v-show="isShowommentBox" @click.stop="isShowommentBox = !isShowommentBox">
      <div class="box-input" @click.stop="tempClick">
        <div class="box-i-top flex-h">
          <div class="box-i-left" @click.stop="isShowommentBox = !isShowommentBox">取消</div>
          <div class="box-i-right" @click.stop="sendComment">发送</div>
        </div>
        <div class="box-i-txt">
          <textarea
            cols="30"
            rows="10"
            class="box-i-area"
            v-model="commentText"
            placeholder="请输入要评论的内容"
            ref="myInput"
            @blur="shiqu"
            
          ></textarea>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="true">
      <div class="yaoqing-box">
        <p class="title">立即邀请</p>
        <div class="img-box">
          <p @click="fenxiang('1')">
            <img src="../../assets/yaoqing_qq.png" />
            <span>微信好友</span>
          </p>
          <p @click="fenxiang('5')">
            <img src="../../assets/pengyouquan.png" />
            <span>朋友圈</span>
          </p>
          <p @click="fenxiang('2')">
            <img src="../../assets/yaoqing_wx.png" />
            <span>QQ好友</span>
          </p>
          <p @click="fenxiang('3')">
            <img src="../../assets/weibo.png" />
            <span>微博</span>
          </p>
          <p @click="fenxiang('4')">
            <img src="../../assets/kongjian.png" />
            <span>QQ空间</span>
          </p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import { setTimeout } from "timers";

export default {
  name: "QuanDetail",
  data() {
    return {
      articleDetail: {},
      commentsList: [],
      commentText: "",
      isShowommentBox: false,
      jieliu: true,
      show: false,
      type:''
    };
  },
  computed: {
    ...mapState({
      // token: state => state.datas.token,
    })
  },
  watch: {
    isShowommentBox(val) {
      if (val) {
        this.$nextTick(function() {
          this.$refs.myInput.focus();
        });
      }
    }
  },
  async created() {
    if (this.$route.query.token == undefined) {
      let token = await this.native.getToken({});
      this.token = token.token;
    } else {
      this.token = this.$route.query.token;
    }
    this.type = this.$route.query.type
    this.getDetail(this.$route.query.id);
    this.getComments(this.$route.query.id);
    console.log(this.$route.query.token);
  },
  methods: {
    tempClick() {},
    // ...mapActions(["saveToken"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    topBack() {
      if (this.$route.query.type == 2) {
        this.$router.back(-1);
      } else {
        this.native.back_btn({});
      }
    },
    pinglun() {
      this.isShowommentBox = !this.isShowommentBox;
    },
    shiqu() {
      window.scrollTo(0, 0);
    },
    async dianzan() {
      let data = await this.api.quanDianzan({
        token: this.token,
        note_id: this.articleDetail.id
      });
      if (data.error_code == 0) {
        if (this.articleDetail.is_like == 1) {
          this.articleDetail.is_like = 0;
          this.articleDetail.like_count--;
        } else {
          this.articleDetail.is_like = 1;
          this.articleDetail.like_count++;
        }
      }
    },
    async shoucang() {
      // let token = await this.native.getToken({});
      let params = {
        token: this.token,
        note_id: this.articleDetail.id
      };
      let data = await this.api.quanNoteCollect(params);
      console.log("data", data);
      this.articleDetail.is_collect = data.data.is_collect;
    },
    async getDetail(id) {
      // let token = await this.native.getToken({});
      let detail = await this.api.quanArticleDetail({
        note_id: id,
        token: this.token
      });
      detail.data.content = decodeURIComponent(detail.data.content);
      this.articleDetail = detail.data;
      console.log("detail--", detail);
    },
    async getComments(id) {
      let list = await this.api.quanArticleCommentsList({
        note_id: id,
        page: 1,
        pagesize: 10000
      });
      this.commentsList = list.data.data;
      console.log("this.commentsList--", this.commentsList);
    },

    async sendComment() {
      if (this.jieliu) {
        this.jieliu = false;
        // let token = await this.native.getToken({});
        let result = await this.api.sendComment({
          token: this.token,
          note_id: this.$route.query.id,
          content: this.commentText
        });
        if (result.error_code === 0) {
          this.$toast("评论成功!");
          this.isShowommentBox = !this.isShowommentBox;
          this.commentText = "";
          this.getComments(this.$route.query.id);
        }
      } else {
        this.$toast("点击过快，请稍后再试");
        setTimeout(_ => {
          this.jieliu = true;
        }, 3000);
        return;
      }
    },
    yaoqing() {
      this.show = true;
    },
    async fenxiang(type) {
      this.show = !this.show;
      let pushId = await this.native.getJPushId({});
      this.native.share({
        url:
          "http://guacheapi.sinmore.vip/#/Quan/QuanDetail?id=" +
          this.$route.query.id +
          "&token=" +
          this.token + "&type=1008",
        title: this.articleDetail.title,
        desc: "挂车之家给您分享了一篇文章，点击查看",
        thumb: "xxxxx",
        type: type
      });
    }
  }
};
</script>

<style lang='less' scoped>
.QuanDetail {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  background: #ffffff;
  padding-bottom: 200px;
  padding-top: 85px;
  overflow-x: hidden;
  overflow-y: scroll;
  .top {
    height: 85px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
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
    .title {
      font-size: 40px;
      color: #333333;
      font-weight: bold;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .mark {
      width: 100%;
      margin-top: 30px;
      margin-bottom: 30px;
      justify-content: space-between;
      box-sizing: border-box;
      .m-left {
        .m-txt {
          font-size: 28px;
          color: #178fec;
        }
        .m-name {
          font-size: 28px;
          color: #999999;
          margin-left: 20px;
        }
        .m-time {
          font-size: 28px;
          color: #999999;
          margin-left: 20px;
        }
      }
      .m-view {
        font-size: 28px;
        color: #999999;
      }
    }
    .box-line {
      border-bottom: 1px solid #e6e6e6; /*no*/
      width: 100%;
      box-sizing: border-box;
      padding: 0 30px;
    }
  }
  .content {
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    font-size: 28px;
  }
  .comments {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    .comments-title {
      font-size: 32px;
      color: #333333;
      margin-top: 30px;
      margin-bottom: 24px;
      font-weight: bold;
    }
    .comments-top {
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-top: 20px;
      .comments-left {
        align-items: center;
        .comments-img {
          width: 63px;
          height: 63px;
          overflow: hidden;
          border-radius: 31px;
          .comments-img2 {
            width: 100%;
            height: 100px;
          }
        }
        .comments-name {
          margin-left: 20px;
          font-size: 28px;
          color: #333333;
        }
      }
      .comments-right {
        font-size: 24px;
        color: #999999;
      }
    }
    .comments-txt {
      font-size: 28px;
      color: #666666;
    }
    .comments-line {
      margin-top: 35px;
      border-bottom: 1px solid #e6e6e6; /*no*/
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 110px;
    border-top: 1px solid #e6e6e6; /*no*/
    .bottom-box {
      width: 100%;
      height: 100%;
      align-items: center;
      // justify-content: space-between;
      box-sizing: border-box;
      background: #ffffff;
      // padding:
      .b-input {
        width: 470px;
        height: 70px;
        background: #f7f8fa;
        font-size: 28px;
        color: #cdcdcd;
        align-items: center;
        padding-left: 20px;
        margin-left: 30px;
      }
      .b-star {
        position: relative;
        width: 44px;
        height: 44px;
        margin-left: 26px;
        .b-img {
          width: 44px;
          height: 44px;
          position: absolute;
        }
        .b-num {
          position: absolute;
          top: -10px;
          right: -30px;
          background: #ff2525;
          height: 30px;
          line-height: 30px;
          border-radius: 15px;
          padding: 0 10px;
          font-size: 20px;
          color: #ffffff;

          // .b-num2 {
          //   font-size: 20px;
          //   line-height: 20px;
          //   color: #ffffff;
          //   width: 100%;
          //   height: 100%;
          //   white-space: nowrap;
          // }
        }
      }
    }
  }
  .c-box {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
    .c-com {
      width: 100%;
      height: 400px;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      left: 0;
      background: #ffffff;
      overflow: hidden;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      .c-top {
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6; /*no*/
        height: 80px;
        align-items: center;
        box-sizing: border-box;
        padding: 0 30px;
        .c-canvel {
          font-size: 28px;
          color: #999999;
        }
        .c-send {
          font-size: 28px;
          color: #4ccdfa;
        }
      }
      .c-textarea {
        width: 100%;
        box-sizing: border-box;
        outline: none;
        border: none;
        resize: none;
        padding: 20px 30px;
        font-size: 28px;
      }
    }
  }
  .box-c {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    .box-input {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 400px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background: #ffffff;
      .box-i-top {
        width: 100%;
        box-sizing: border-box;
        padding: 0 30px;
        height: 80px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f7f7f7;
        .box-i-left {
          font-size: 28px;
          color: #999999;
        }
        .box-i-right {
          font-size: 28px;
          color: #4ccdfa;
        }
      }
      .box-i-txt {
        width: 100%;
        height: 320px;
        box-sizing: border-box;
        .box-i-area {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 30px;
          font-size: 28px;
          outline: none;
          border-color: #fff;
        }
      }
    }
  }
  .yaoqing-box {
    height: 4.266667rem /* 320/75 */;
    .title {
      font-size: 0.426667rem /* 32/75 */;
      font-family: serif;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 0.64rem /* 48/75 */;
      text-align: center;
      // padding: 0.533333rem /* 40/75 */ 0 0.6rem /* 45/75 */ 0;
    }
    .img-box {
      display: flex;
      justify-content: space-around;
      p {
        width: 2rem /* 120/75 */;
        text-align: center;
        font-size: 0.373333rem /* 28/75 */;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      img {
        width: 1.6rem /* 120/75 */;
        height: 1.6rem /* 120/75 */;
      }
    }
  }
  .show-hidden{
    visibility: hidden!important;
  }
}
</style>
