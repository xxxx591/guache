<template>
  <div
    class="PublishCar2"
    :class="{'over-hide': isShowSelectColorBox || isShowSelectYearBox || isShowCarWeightBox || isShowSelectCarCardTimeBox || isShowAddrBox || isShowGuoHuBox ||isShowDismissBox ||isShowSelectedColorBox ||isShowSelectBrand1Box ||isShowSelectBrand2Box}"
  >
    <div class="top">
      <img src="../../assets/back-arrow.png" @click.stop="topBack" class="top-back">
      <div class="top-txt">发布车辆</div>
    </div>
    <div class="box flex-h">
      <div class="left flex-h">
        <div class="txt">车辆名称：</div>
        <input type="text" placeholder="请输入" v-model="form.carName" class="value">
      </div>
      <!-- <div class="arrow">
        <img src="../../assets/right-arrow.png" class="arrow-img">
      </div>-->
    </div>
    <div class="box flex-h">
      <div class="left flex-h">
        <div class="txt">车辆描述：</div>
        <input type="text" placeholder="请输入" v-model="form.des" class="value">
      </div>
    </div>
    <div class="box flex-h">
      <div class="left flex-h" @click.stop="isShowSelectedColorBox = !isShowSelectedColorBox">
        <div class="txt">车辆颜色：</div>
        <input
          type="text"
          placeholder="请选择车辆颜色"
          readonly
          disabled
          class="value"
          v-model="selectedColor"
        >
      </div>
      <div class="arrow">
        <img src="../../assets/right-arrow.png" class="arrow-img">
      </div>
    </div>
    <div class="box flex-h">
      <div class="left flex-h">
        <div class="txt">车辆价格：</div>
        <input type="number" placeholder="请输入车辆价格" v-model="form.price" class="value">
        <div class="txt">万</div>
      </div>
    </div>
    <div class="box flex-h" @click.stop="isShowSelectYearBox = !isShowSelectYearBox">
      <div class="left flex-h">
        <div class="txt">车辆年限：</div>
        <input
          type="text"
          placeholder="请选择车辆年限"
          readonly
          disabled
          class="value"
          v-model="selectedYear"
        >
      </div>
      <div class="arrow">
        <img src="../../assets/right-arrow.png" class="arrow-img">
      </div>
    </div>
    <div class="box flex-h" @click.stop="isShowCarWeightBox = !isShowCarWeightBox">
      <div class="left flex-h">
        <div class="txt">车辆载重：</div>
        <input
          type="text"
          placeholder="请选择车辆载重"
          readonly
          disabled
          class="value"
          v-model="selectedCarWeight"
        >
      </div>
      <div class="arrow">
        <img src="../../assets/right-arrow.png" class="arrow-img">
      </div>
    </div>
    <div class="box flex-h">
      <div class="left flex-h" @click.stop="isShowcarDistance = !isShowcarDistance">
        <div class="txt">车辆成色：</div>
        <input type="text" placeholder="成色" readonly disabled class="value" v-model="carDistance">
      </div>
      <div class="arrow">
        <img src="../../assets/right-arrow.png" class="arrow-img">
      </div>
    </div>
    <div class="box flex-h" @click.stop="isShowSelectCarCardTimeBox = !isShowSelectCarCardTimeBox">
      <div class="left flex-h">
        <div class="txt">首次上牌时间：</div>
        <input type="text" placeholder="请选择" readonly disabled class="value" v-model="carCardTime">
      </div>
      <div class="arrow">
        <img src="../../assets/right-arrow.png" class="arrow-img">
      </div>
    </div>
    <div class="box flex-h" @click="areaFlag = true">
      <div class="left flex-h">
        <div class="txt">所在地：</div>
        <input type="text" placeholder="请选择" readonly disabled class="value" v-model="selectedAddr">
      </div>
      <div class="arrow">
        <img src="../../assets/right-arrow.png" class="arrow-img">
      </div>
    </div>
    <div class="box flex-h">
      <div class="left flex-h">
        <div class="txt">过户次数：</div>
        <input type="tel" placeholder="请选择" class="value" v-model="selectedGuoHuNum">
      </div>
    </div>
    <div class="box flex-h" v-if="hideFlag" @click.stop="isShowDismissBox = !isShowDismissBox">
      <div class="left flex-h">
        <div class="txt">排放标准：</div>
        <input type="text" placeholder="请选择" readonly disabled class="value" v-model="selectedDismiss">
      </div>
       <div class="arrow">
        <img src="../../assets/right-arrow.png" class="arrow-img">
      </div>
    </div>

    <div class="box flex-h" v-if="hideFlag">
      <div class="left flex-h">
        <div class="txt">发动机参数：</div>
        <input type="text" placeholder="请输入内容" class="value" v-model="engineData">
      </div>
    </div>

    <div class="box flex-h">
      <div class="left flex-h">
        <div class="txt">联系人姓名：</div>
        <input type="text" placeholder="请输入内容" class="value" v-model="userName">
      </div>
    </div>

    <div class="box flex-h">
      <div class="left flex-h">
        <div class="txt">联系人电话：</div>
        <input type="number" placeholder="请输入内容" maxlength="11" class="value" v-model="phone">
      </div>
    </div>

    <!-- 品牌1 -->
    <!-- <div class="box flex-h" @click.stop="isShowSelectBrand1Box = !isShowSelectBrand1Box">
      <div class="left flex-h">
        <div class="txt">品牌1：</div>
        <input
          type="text"
          placeholder="一级品牌"
          readonly
          disabled
          class="value"
          v-model="selectedBrand1"
        >
      </div>
      <div class="arrow">
        <img src="../../assets/right-arrow.png" class="arrow-img">
      </div>
    </div> -->

    <!-- 品牌12-->
    <!-- <div class="box flex-h" @click.stop="isShowSelectBrand2Box = !isShowSelectBrand2Box">
      <div class="left flex-h">
        <div class="txt">品牌2：</div>
        <input
          type="text"
          placeholder="二级品牌"
          readonly
          disabled
          class="value"
          v-model="selectedBrand2"
        >
      </div>
      <div class="arrow">
        <img src="../../assets/right-arrow.png" class="arrow-img">
      </div>
    </div> -->

    <div class="b-bottom">
      <div class="b-b-box flex-h flex-cc" @click.stop="nextStep">
        <div class="b-btn flex-h flex-cc">下一步</div>
      </div>
    </div>

    <!-- 选择品牌1弹框 -->
    <div
      class="select-box1"
      v-show="isShowSelectBrand1Box"
      @click.stop="isShowSelectBrand1Box = !isShowSelectBrand1Box"
    >
      <div class="select-box s-year" @click.stop="tempClick">
        <!-- <mt-picker :slots="yearSlots" @change="selectYear"></mt-picker> -->
        <van-picker
          :columns="brand1Slots"
          show-toolbar
          @cancel="onCancelPinpai1"
          @confirm="onConfirmPinpai1"
        />
      </div>
    </div>
    <!-- 选择品牌2弹框 -->
    <div
      class="select-box1"
      v-show="isShowSelectBrand2Box"
      @click.stop="isShowSelectBrand2Box = !isShowSelectBrand2Box"
    >
      <div class="select-box s-year" @click.stop="tempClick">
        <!-- <mt-picker :slots="yearSlots" @change="selectYear"></mt-picker> -->
        <van-picker
          :columns="brand2Slots"
          show-toolbar
          @cancel="onCancelPinpai2"
          @confirm="onConfirmPinpai2"
        />
      </div>
    </div>
   

    

    <!-- 车辆年限弹框 -->
    <div
      class="select-box1"
      v-show="isShowSelectYearBox"
      @click.stop="isShowSelectYearBox = !isShowSelectYearBox"
    >
      <div class="select-box s-year" @click.stop="tempClick">
        <!-- <mt-picker :slots="yearSlots" @change="selectYear"></mt-picker> -->
        <van-picker
          :columns="yearSlots"
          show-toolbar
          @cancel="onCancelYearBox"
          @confirm="onConfirmYearBox"
        />
      </div>
    </div>

    <!-- 选择车辆载重弹框 -->
    <div
      class="select-box1"
      v-show="isShowCarWeightBox"
      @click.stop="isShowCarWeightBox = !isShowCarWeightBox"
    >
      <div class="select-box s-year" @click.stop="tempClick">
        <mt-picker :slots="weightSlots" @change="selectCarWeight"></mt-picker>
        <van-picker
          :columns="weightSlots"
          show-toolbar
          @cancel="onCancelGuoHuNum"
          @confirm="onConfirmGuoHuNum"
        />
      </div>
    </div>
    <!-- 选择车辆里程弹框 -->
    <div
      class="select-box1"
      v-show="isShowcarDistance"
      @click.stop="isShowcarDistance = !isShowcarDistance"
    >
      <div class="select-box s-year" @click.stop="tempClick">
        <!-- <mt-picker :slots="GongliSlots" @change="selectCarWeight"></mt-picker> -->
        <van-picker
          :columns="GongliSlots"
          show-toolbar
          @cancel="onCancelGongli"
          @confirm="onConfirmGongli"
        />
      </div>
    </div>

    <!-- 选择年份弹框 -->
    <div
      class="select-box1"
      v-show="isShowSelectCarCardTimeBox"
      @click.stop="isShowSelectCarCardTimeBox = !isShowSelectCarCardTimeBox"
    >
      <div class="select-box s-year" @click.stop="tempClick">
        <!-- <mt-picker :slots="yearSlots" @change="selectCarCardTime"></mt-picker> -->
        <van-picker
          :columns="yearSlots2"
          show-toolbar
          @cancel="onCanceltempClick"
          @confirm="onConfirmtempClick"
        />
      </div>
    </div>

    <van-popup v-model="areaFlag" position="bottom">
      <van-area
        :area-list="arrayList"
        @confirm="getCity"
        @cancel="areaFlag = false"
        :columns-num="3"
      />
    </van-popup>

    <!-- 选择过户次数弹框 -->
    <div class="select-box1" v-show="isShowGuoHuBox" @click.stop="isShowGuoHuBox = !isShowGuoHuBox">
      <div class="select-box s-year" @click.stop="tempClick">
        <van-picker
          :columns="weightSlots"
          show-toolbar
          @cancel="onCancelGuoHuNum"
          @confirm="onConfirmGuoHuNum"
        />
      </div>
    </div>

    <!-- 选择排放标准弹框 -->
    <div
      class="select-box1"
      v-show="isShowDismissBox"
      @click.stop="isShowDismissBox = !isShowDismissBox"
    >
      <div class="select-box s-year" @click.stop="tempClick">
        <!-- <mt-picker :slots="DismissSlots" @change="selectDismiss"></mt-picker> -->
        <van-picker
          :columns="DismissSlots"
          show-toolbar
          @cancel="onCancelDismiss"
          @confirm="onConfirmDismiss"
        />
      </div>
    </div>
    <!-- 选择颜色 -->
    <div
      class="select-box1"
      v-show="isShowSelectedColorBox"
      @click.stop="isShowSelectedColorBox = !isShowSelectedColorBox"
    >
      <div class="select-box s-year" @click.stop="tempClick">
        <van-picker :columns="colorList" show-toolbar @cancel="onCancel" @confirm="onConfirm"/>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState } from "vuex";
import { Photoshop, Material, chrome, Slider } from "vue-color";
import VDistpicker from "v-distpicker";
import areaListArr from "../../service/area.js";
export default {
  // 发布二手车 参数
  name: "PublishCar2",
  data() {
    return {
      areaFlag: false,
      arrayList: areaListArr, //地址列表
      colors: {
        hex: "#194d33",
        hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
        hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
        rgba: { r: 25, g: 77, b: 51, a: 1 },
        a: 1
      },
      yearSlots: [],
      yearSlots2: [],
      weightSlots: [],
      GongliSlots: [
        "全新",
        "9.5",
        "9.0",
        "8.5",
        "8.0",
        "7.5",
        "7.0",
        "6.5",
        "6.0"
      ],
      DismissSlots: [ "国Ⅵ", "国Ⅴ", "国Ⅳ","国Ⅲ"],
      brand1Slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      brand2Slots: [
        {
          flex: 1,
          values: [""],
          className: "slot1",
          textAlign: "center"
        }
      ],
      selectedColor: "",
      selectedYear: "",
      selectedCarWeight: "", // 车辆载重
      carDistance: "", // 车辆里程
      carCardTime: "", // 车辆首次上牌时间
      selectedAddr: "", // 地址
      selectedGuoHuNum: "", // 过户次数
      selectedDismiss: "", // 排放标准
      engineData: "",
      userName: "",
      phone: "",
      isShowSelectColorBox: false,
      isShowSelectYearBox: false,
      isShowCarWeightBox: false,
      isShowSelectCarCardTimeBox: false, // 首次上牌时间弹框
      isShowcarDistance: false, //承重
      isShowAddrBox: false,
      isShowGuoHuBox: false, // 过户
      isShowDismissBox: false, // 排放标准,
      colorList: [],
      selectedColorId: "",
      selectedColor: "",
      isShowSelectedColorBox: false,
      selectedBrand1: "",
      isShowSelectBrand1Box: false,
      selectedBrand2: "",
      isShowSelectBrand2Box: false,
      brandData1: {},
      brandData2: {},
      selectedBrand1Obj: {},
      selectedBrand2Obj: {},
      form: {
        carName: "",
        des: "",
        price: "",
        selectedYear: "",
        selectedCarWeight: "",
        carDistance: "",
        carCardTime: "",
        selectedAddr: "",
        selectedGuoHuNum: "",
        selectedDismiss: "",
        engineData: "",
        userName: "",
        phone: ""
      },
      brandData1Id:[],
      brandData2Id:[],
      hideFlag:true
    };
  },
  created() {
    this.createYear();
    this.createWeight();
    this.getColorList();
    this.getBrand();
    this.createGongli();
    this.createYear2();
    console.log(this.$route.query.type);
    if (this.$route.query.type ==1 ) {
      this.hideFlag = false
    }
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
      mobileHeight: state => state.datas.mobileHeight
    })
  },
  methods: {
    async getBrand() {
      let list = await this.api.carCategory({ pid: 0 });
      let values = [];
      this.brandData1Id=[]
      this.brandData1 = list.data;
      list.data.forEach((item, index) => {
        values.push(item.title);
        this.brandData1Id.push(item.id)
      });
      this.brand1Slots = [
        {
          flex: 1,
          values: values,
          className: "slot1",
          textAlign: "center"
        }
      ];
      console.log("this.brand1Slots--", this.brand1Slots);
    },
    async getColorList() {
      let list = await this.api.getAllColors({});
      // this.colorList = list.data;
      list.data.forEach(item => {
        this.colorList.push(item.name);
      });
    },
    createYear() {
      let year = new Date();
      let nowYear = year.getFullYear();
      // this.yearSlots[0].values.push('')
      // this.yearSlots.push(nowYear + "年");
      for (let i = 1; i < 11; i++) {
        this.yearSlots.push(i + "年");
      }
    },
    createYear2() {
      let year = new Date();
      let nowYear = year.getFullYear();
      // this.yearSlots[0].values.push('')
      this.yearSlots2.push(nowYear + "年");
      for (let i = 1; i < 11; i++) {
        this.yearSlots2.push(--nowYear + "年");
      }
    },
    createWeight() {
      for (let i = 1; i < 50; i++) {
        this.weightSlots.push(i + "吨");
      }
    },
    createGongli() {
      // for (let i = 1; i < 99; i++) {
      //   this.GongliSlots.push(i + "万公里");
      // }
    },
    tempClick() {},
    // ...mapActions(["saveToken"]),
    inputBlur() {
      window.scrollTo(0, 0);
    },
    // selectColor(e) {
    //   console.log('selectColor---e', e.hex)
    //   this.selectedColor = e.hex
    // },
    selectYear(e, year) {
      // this.createYear()
      this.selectedYear = year[0];
    },

    selectCarCardTime(e, year) {
      this.carCardTime = year[0];
    },
    selectCarWeight(e, weight) {
      // this.createWeight()
      this.selectedCarWeight = weight[0];
    },
    selectAddr(addr) {
      this.selectedAddr =
        addr.province.value + "-" + addr.city.value + "-" + addr.area.value;
      this.isShowAddrBox = !this.isShowAddrBox;
    },
    selectGuoHuNum(e, weight) {
      this.selectedGuoHuNum = weight[0];
    },
    selectDismiss(e, dismiss) {
      this.selectedDismiss = dismiss[0];
    },
    topBack() {
      // this.native.back_btn({})
      this.$router.back(-1);
    },
    selectColor(e, color) {
      console.log(color);
      // this.selectedColorId = item.id;
      // this.selectedColor = item.name;
      // this.isShowSelectedColorBox = !this.isShowSelectedColorBox;
    },
    nextStep() {
      if (this.checkValues() === false) return;
      this.$router.push({ name: "PublishCar", query: this.form });
    },
    checkValues() {
      // return true
      // if (this.selectedGuoHuNum > 10) {
      //   this.$toast("过户次数不得超过10!");
      //   return false;
      // }
      if (this.form.carName === "") {
        this.$toast("车辆名称不能为空!");
        return false;
      }
      if (this.form.des === "") {
        this.$toast("车辆描述不能为空!");
        return false;
      }
      if (this.selectedColorId === "") {
        this.$toast("车辆颜色不能为空!");
        return false;
      }
      if (!this.form.price) {
        this.$toast("车辆价格不能为空!");
        return false;
      }
      if (!this.selectedYear) {
        this.$toast("车辆年限不能为空!");
        return false;
      }
      if (!this.selectedCarWeight) {
        this.$toast("车辆载重不能为空!");
        return false;
      }
      if (!this.carDistance) {
        this.$toast("车辆成色不能为空!");
        return false;
      }
      if (!this.carCardTime) {
        this.$toast("首次上牌时间不能为空!");
        return false;
      }
      if (!this.selectedAddr) {
        this.$toast("所在地不能为空!");
        return false;
      }
      // if (!this.hideFlag) {
      //   if (!this.selectedDismiss) {
      //     this.$toast("排放标准不能为空!");
      //     return false;
      //   }
      //   if (!this.engineData) {
      //     this.$toast("发动机参数不能为空!");
      //     return false;
      //   }
      // }
      if (!this.userName) {
        this.$toast("联系人姓名不能为空!");
        return false;
      }
      if (this.tool.checkPhoneNum(this.phone) === false) {
        return false;
      }
      // if (!this.selectedBrand1) {
      //   this.$toast("一级品牌不能为空!");
      //   return false;
      // }
      // if (!this.selectedBrand2) {
      //   this.$toast("二级品牌不能为空!");
      //   return false;
      // }

      this.form.type = this.$route.query.type;
      this.form.selectedColorId = this.selectedColorId;
      this.form.selectedBrand2Id = this.selectedBrand2Id;
      this.form.selectedBrand1Id = this.selectedBrand1Id;
      this.form.price = this.form.price;
      this.form.selectedYear = this.selectedYear;
      this.form.selectedCarWeight = parseInt(this.selectedCarWeight);
      this.form.carDistance = this.carDistance;
      this.form.carCardTime = this.carCardTime;
      this.form.selectedAddr = this.selectedAddr;
      this.form.selectedGuoHuNum = this.selectedGuoHuNum;
      this.form.selectedDismiss = this.selectedDismiss;
      this.form.engineData = this.engineData;
      this.form.userName = this.userName;
      this.form.phone = this.phone;

      return true;
    },

    selectBrand2(e, brand2) {
      this.selectedBrand2 = brand2[0];
      // console.log('this.brandData2---', this.brandData2)
      if (!this.brandData2.length) return;
      this.brandData2.forEach(async (item, index) => {
        if (item.title === brand2[0]) {
          this.selectedBrand2Obj = item;
        }
      });
    },
    // 颜色选择
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.selectedColorId = index + 1;
      this.selectedColor = value;
      this.isShowSelectedColorBox = !this.isShowSelectedColorBox;
    },
    onCancel() {
      this.isShowSelectedColorBox = !this.isShowSelectedColorBox;
    },
    // 排放标准
    onConfirmDismiss(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.selectedDismiss = value;
      this.isShowDismissBox = !this.isShowDismissBox;
    },
    onCancelDismiss() {
      this.isShowDismissBox = !this.isShowDismissBox;
    },
    // 车载重
    onConfirmGuoHuNum(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.selectedCarWeight = value;
      this.isShowCarWeightBox = !this.isShowCarWeightBox;
    },
    onCancelGuoHuNum() {
      this.isShowCarWeightBox = !this.isShowCarWeightBox;
    },
    // 车里程
    onConfirmGongli(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.carDistance = value;
      this.isShowcarDistance = !this.isShowcarDistance;
    },
    onCancelGongli() {
      this.isShowcarDistance = !this.isShowcarDistance;
    },
    // 上牌车辆年份
    onConfirmtempClick(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.carCardTime = value;
      this.isShowSelectCarCardTimeBox = !this.isShowSelectCarCardTimeBox;
    },
    onCanceltempClick() {
      this.isShowSelectCarCardTimeBox = !this.isShowSelectCarCardTimeBox;
    },
    // 车辆年份
    onConfirmYearBox(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.selectedYear = value;
      this.isShowSelectYearBox = !this.isShowSelectYearBox;
    },
    onCancelYearBox() {
      this.isShowSelectYearBox = !this.isShowSelectYearBox;
    },
    async onConfirmPinpai1(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.selectedBrand1 = value;
      this.selectedBrand1Id = this.brandData1Id[index]
      let list = await this.api.carCategory({ pid: parseInt(this.brandData1Id[index]) });
      console.log("list", list);
      let values = [];
      this.brandData2 = list.data;
      list.data.forEach((item, index) => {
        values.push(item.title);
      this.brandData2Id.push(item.id)
      });
      this.brand2Slots = [
        {
          flex: 1,
          values: values,
          className: "slot1",
          textAlign: "center"
        }
      ];
      this.isShowSelectBrand1Box = !this.isShowSelectBrand1Box;
    },
    onCancelPinpai1() {
      this.isShowSelectBrand1Box = !this.isShowSelectBrand1Box;
    },
    async onConfirmPinpai2(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.selectedBrand2 = value;
       this.selectedBrand2Id = this.brandData2Id[index] 
      
      this.isShowSelectBrand2Box = !this.isShowSelectBrand2Box;
    },
    onCancelPinpai2() {
      this.isShowSelectBrand2Box = !this.isShowSelectBrand2Box;
    },
    //  所在地
    getCity(arr) {
      console.log(arr);
      this.areaFlag = false;
      let str = "";
      arr.forEach(item => {
        str = str + item.name + " ";
      });
      this.selectedAddr = str;
    }
  },
  components: {
    // PhotoShop: Photoshop,
    // 'material-picker': Material,
    "slider-picker": Slider,
    VDistpicker
    // 'ChromePicker': chrome,
    // 'photoshop-picker': Photoshop
  }
};
</script>

<style lang='less' scoped>
.PublishCar2 {
  // padding-bottom: 300px
  background: #ffffff;
  box-sizing: border-box;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 95px;
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
  }
  .box {
    justify-content: space-between;
    width: 690px;
    box-sizing: border-box;
    // padding: 0 30px;
    align-items: center;
    height: 110px;
    margin: 0 auto;
    border-bottom: 1px solid #e6e6e6; /*no*/
    .left {
      flex-grow: 1;
      align-items: center;
      overflow: hidden;
      .txt {
        font-size: 32px;
        color: #333333;
        white-space: nowrap;
      }
      .value {
        font-size: 32px;
        outline: none;
        border: none;
        padding-left: 20px;
        flex-grow: 1;
        background: #fff;
        &:disabled {
          color: #000;
          opacity: 1;
        }
      }
    }
    .arrow {
      .arrow-img {
        min-width: 16px;
        height: 29px;
      }
    }
  }
  .select-box1 {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    .select-box {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 160px;
      background: #ffffff;
      box-sizing: border-box;
      padding: 30px;
    }
    .s-year {
      height: 400px;
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
  .b-bottom {
    // position: fixed;
    // bottom: 0;
    // left: 0;
    width: 100%;
    height: 110px;
    background: #ffffff;
    // border-top: 1px solid #e6e6e6; /*no*/
    .b-b-box {
      width: 100%;
      height: 100%;
      .b-btn {
        width: 640px;
        height: 70px;
        border-radius: 35px;
        background: #4ccdfa;
        font-size: 30px;
        color: #ffffff;
        margin: 0 auto;
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
        .sc-color {
          font-size: 30px;
          padding: 10px 0;
        }
      }
    }
  }
}
</style>
