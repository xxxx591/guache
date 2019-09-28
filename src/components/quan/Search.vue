<template>
  <div class="search-box">
    <form action="/" class="search-box1">
      <van-search
        v-model="mustStr"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="nolist" v-if="hasList()">
      <img src="./nolist.png" alt class="img-no" />
    </div>
    <div v-else>
      <div class="product-box" v-for="(item, index) in productList" :key="index">
        <div
          class="product flex-h"
          @click.stop="$router.push({name: 'QuanDetail', query: {id: item.id,token:token}})"
        >
          <!-- :style="' background-image: url('+item.thumb+');'" -->
          <div class="p-left">
            <img :src="item.thumb" class="p-left-img" />
            <div class="p-time">{{item.created_at}}</div>
          </div>
          <div class="p-right flex-v">
            <div class="p-top">
              <div class="p-title">{{item.title}}</div>
            </div>
            <div class="p-bottom flex-h">
              <div class="p-txt">
                <img :src="item.get_user.nickname" alt class="p-user-photo" />
                <p>{{item.get_user.nickname}}</p>
              </div>
              <div class="p-dianzan">
                <p v-if="item.is_like != 0">
                  <img src="../../assets/dianzan.png" alt @click.stop="dianzan(item)" />
                  {{item.like_count}}
                </p>
                <p v-else>
                  <img src="../../assets/undianzan.png" @click.stop="dianzan(item)" alt />
                  {{item.like_count}}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="p-read">{{item.view}}次阅读·{{item.share}}分享</div>
        <div class="p-line"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
      msg: "搜索页面",
      productList: [],
      token: "",
      mustStr: ""
    };
  },
  mounted() {
    this.token = this.$route.query.token;
  },
  methods: {
    async dianzan(item) {
      console.log(item);
      let data = await this.api.quanDianzan({
        token: this.token,
        note_id: item.id
      });
      console.log(data);
      if (data.error_code == 0) {
        if (item.is_like == 1) {
          item.is_like = 0;
          item.like_count--;
        } else {
          item.is_like = 1;
          item.like_count++;
        }
      }
    },
    hasList() {
      if (this.productList.length == 0) {
        return true;
      } else {
        return false;
      }
    },
    onSearch() {
      this.getProductList(this.mustStr);
    },
    onCancel() {
      this.native.back_btn({});
    },
    async getProductList(str) {
      this.productList = [];
      let list = await this.api.quanProductList({
        token: this.token,
        page: 1,
        pagesize: 10000,
        keyword: str
      });
      list.data.data.forEach((item, index) => {
        item.created_at = item.created_at.substr(0, 10);
      });
      this.productList = list.data.data;
    }
  }
};
</script>
<style lang="less" scoped>
.search-box1 {
  height: 1rem;
  padding: 0.1rem;
  border-bottom: 1px solid #e5e5e5;
}
.van-search__content {
  height: 1rem;
}
.van-search .van-cell {
  line-height: 1rem;
}
.van-search {
  height: 100% !important;
  height: 1rem !important;
  line-height: 1rem !important;
}
.van-icon.van-icon-search {
  display: block;
  min-width: 1em;
  font-size: 0.613333rem;
  line-height: inherit;
}
.van-field__body {
  font-size: 1rem !important;
}
.product-box {
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  .product {
    width: 100%;
    margin-top: 30px;
    .p-left {
      min-width: 240px;
      max-width: 240px;
      height: 140px;
      position: relative;
      overflow: hidden;
      border-radius: 15px;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      .p-left-img {
        width: 100%;
      }
      .p-time {
        // width: 120px;
        height: 30px;
        line-height: 30px;
        border-top-left-radius: 10px;
        border-bottom-right-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        white-space: nowrap;
        color: #ffffff;
        font-size: 18px;
        padding: 0 15px;
        text-align: center;
      }
    }
    .p-right {
      margin-left: 30px;
      flex-grow: 1;
      justify-content: space-between;
      .p-top {
        .p-title {
          font-size: 32px;
          font-weight: bold;
          color: #333333;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .p-bottom {
        justify-content: space-between;
        .p-txt {
          display: flex;
          font-size: 24px;
          color: #999999;
          align-items: center;
          p {
            margin: 0;
          }
          .p-user-photo {
            height: 0.5rem;
            width: 0.5rem;
            background: #ccc;
            border-radius: 50%;
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
  .p-read {
    font-size: 0.32rem;
    margin-top: 0.2rem;
    color: #999999;
  }
  .p-line {
    margin-top: 30px;
    border-bottom: 1px solid #e5e5e5; /*no*/
  }
}
.nolist {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -2.5rem;
  margin-top: -2.5rem;
  .img-no {
    width: 5rem;
    height: 5rem;
  }
}
.p-dianzan {
  p {
    margin: 0;
    font-size: 0.42rem;
    color: #999;
    img {
      height: 0.4rem;
    }
  }
}
</style>