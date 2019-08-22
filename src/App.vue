<template>
  <div id="app">
    <!-- <transition :name="transitionName"></transition> -->
    <transition>
      <router-view v-if=" isRouterAlive "></router-view>
    </transition>

    <div class="loading-box" v-show="showLoading">
      <div id="Loading">
        <div class="loader-inner ball-beat">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Vue from "vue";

export default {
  name: "App",
  data() {
    return {
      transitionName: "slide-none",
      isRouterAlive: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  watch: {
    // $route(to, from) {
    //   let routersArr = Vue.ls.get('routers') && Vue.ls.get('routers').split(',') || [];
    //   if (routersArr.length == 0) {
    //     routersArr.push(to.path);
    //   } else {
    //     if (routersArr.indexOf(to.path) != -1) {
    //       this.transitionName = 'slide-right'
    //       routersArr.splice(routersArr.indexOf(to.path) + 1, 100)
    //     } else {
    //       this.transitionName = 'slide-left'
    //       routersArr.push(to.path)
    //     }
    //   }
    //   Vue.ls.set('routers', routersArr.join(','))
    // }
    // showLoading
  },
  beforeRouteLeave(to, from, next) {
    console.log("app--setLoading---", this.setLoading);
    next(vm => {
      vm.setLoading(true);
      console.log("app--vm--setLoading---", vm.setLoading);
    });
  },
  computed: {
    ...mapState({
      token: state => state.datas.token,
      showLoading: state => state.datas.showLoading
    })
  },
  methods: {
    ...mapActions(["setMobileHeight", "setLoading", "saveToken"]),
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  async created() {
    // let re = await this.native.saveToken({ token: '470421ec059443ac059f63e84eeec8b7' })

    this.setMobileHeight(window.document.body.clientHeight);

    // let token = await this.native.getToken({});
  },
  mounted() {
    let self = this; 
    self.setLoading(false);
  }
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
/*向左滑动*/
@keyframes slideInLeft {
  from {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(0, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideInRight {
  from {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
.slide-left-enter-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideInLeft 0.3s linear forwards;
}
.slide-left-leave-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideInRight 0.3s linear forwards;
}
/*向右滑动*/
@keyframes slideOutLeft {
  from {
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideOutRight {
  from {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
.van-button {
  height: 80px !important /* 100/75 */;
  .van-button__text {
    font-size: 28px !important;
  }
}
.van-picker__cancel,
.van-picker__confirm {
  font-size: 28px !important;
}
.van-toast--text {
  padding: 16px 24px !important;
  min-width: 200px !important;
  font-size: 28px !important;
}
.van-picker-column__item {
  font-size: 32px !important;
}
.van-picker__toolbar {
  height: 80px !important;
  line-height: 80px !important;
}
.van-dialog {
  font-size: 36px !important;
}
.van-dialog__message {
  padding: 40px !important;
  font-size: 32px !important;
}
</style>
