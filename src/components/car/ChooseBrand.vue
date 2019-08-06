<template>
  <div class="ChooseBrand">
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">选择品牌</div>
    </div>
    <div class="box flex-h">
      <div class="box-category">
        <div
          class="box-item flex-h flex-cc"
          :class="{'box-item-active': currentBrand2.id == item.id}"
          v-for="(item, index) in brand2List"
          @click.stop="selectBrand2(item)"
        >{{item.title}}</div>
      </div>
      <div class="box-product flex-h">
        <div
          class="box-pro"
          v-for="(item,index) in productList"
          @click.stop="$router.push({name: 'SetCar', query: {id: item.id}})"
        >
          <div class="b-top">
            <img :src="item.cover" class="b-top-img">
          </div>
          <div class="b-title">{{item.name}}</div>
          <div class="b-price">{{item.price_range}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";

export default {
  // 选择品牌
  name: 'ChooseBrand',
  data() {
    return {
      brand2List: [],
      currentBrand2: {},
      productList: []
    }
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
    })
  },
  created() {
    console.log('query---', this.$route.query.id)
    this.getBrand2(this.$route.query.id)
  },
  methods: {
    // ...mapActions(["setTab"]),
    inputBlur() {
      window.scrollTo(0, 0)
    },
    topBack() {
      this.native.back_btn({})
      this.$router.back(-1)
    },
    async getBrand2(id) {
      let list = await this.api.carCategory({ pid: id })
      this.brand2List = list.data
      this.currentBrand2 = list.data[0]
      this.getBrandProduct(list.data[0].id)
    },
    async getBrandProduct(id) {
      let token = await this.native.getToken({})
      let list = await this.api.getBrandProducts({ token: token.token, page: 1, pagesize: 10000, vehicle_id: id })
      this.productList = list.data.data
      console.log('getBrandProduct---', list.data.data)

    },
    selectBrand2(item) {
      this.currentBrand2 = item
      this.getBrandProduct(item.id)
    },
  }
}
</script>

<style lang='less' scoped>
.ChooseBrand {
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
    width: 100%;
    height: calc(100vh - 85px);
    box-sizing: border-box;
    .box-category {
      min-width: 240px;
      max-width: 240px;
      height: 100%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      background: #f7f8fa;
      .box-item {
        width: 100%;
        height: 110px;
        background: #f7f8fa;
        font-size: 28px;
        color: #666666;
      }
      .box-item-active {
        background: #ffffff;
        color: #4ccdfa;
      }
    }
    .box-product {
      flex-grow: 1;
      box-sizing: border-box;
      height: 100%;
      padding: 30px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      flex-wrap: wrap;
      .box-pro {
        width: 210px;
        margin-bottom: 30px;
        .b-top {
          width: 210px;
          height: 210px;
          border: 1px solid #e6e6e6; /*no*/
          border-radius: 10px;
          .b-top-img {
            width: 100%;
            height: 100%;
          }
        }
        .b-title {
          font-size: 24px;
          color: #333333;
          margin-top: 20px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .b-price {
          font-size: 24px;
          color: #ff5d25;
          font-weight: bold;
          margin-top: 10px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .box-pro:nth-child(2n) {
        margin-left: 20px;
      }
    }
  }
}
</style>
