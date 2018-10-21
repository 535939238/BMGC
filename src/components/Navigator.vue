<!-- Navigator for BeiMingYouyu -->
<template>
  <div id="Navigator">
    <transition name="fadeDown">
      <div id="Navigator-bar" v-if="barShow">
        <div class="nav-left">
          <span class="title">北冥有鱼</span>
        </div>
        <div class="nav-right">
          <svg @click="barShow=false" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4703">
            <path d="M511.5 374.5c-8.2 0-16.4 3.1-22.6 9.4L273.4 599.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l192.9-192.9 192.9 192.9c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L534.1 383.9c-6.2-6.3-14.4-9.4-22.6-9.4z" p-id="4704"></path>
          </svg>
          <svg @click="onFullTiggle" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2465">
            <path v-if="isFullScreen" d="M892.2332 989.237563H134.437748C82.422427 989.237563 40.104334 946.91947 40.104334 894.904149V137.108697c0-52.015321 42.318093-94.333414 94.333414-94.333414h757.795452c52.015321 0 94.341435 42.318093 94.341436 94.333414v757.795452c-0.008021 52.015321-42.326114 94.333414-94.341436 94.333414z m-757.795452-882.295346A30.206584 30.206584 0 0 0 104.271268 137.108697v757.795452a30.214605 30.214605 0 0 0 30.16648 30.174501h757.795452a30.214605 30.214605 0 0 0 30.174501-30.174501V137.108697a30.206584 30.206584 0 0 0-30.174501-30.16648H134.437748zM603.040848 406.096485c0.128334 0.625628 0.232605 1.259276 0.417086 1.884904 0.176459 0.665732 0.401043 1.307401 0.64969 1.933029 0.128334 0.360939 0.200522 0.721878 0.344897 1.066775 0.080209 0.18448 0.18448 0.336876 0.248647 0.521357 0.288751 0.64969 0.625628 1.267297 0.962504 1.892924 0.272709 0.497294 0.521356 0.994587 0.850212 1.483861 0.344897 0.569482 0.770003 1.098859 1.171046 1.652298 0.336876 0.46521 0.665732 0.914379 1.026671 1.363547 0.473231 0.521356 0.938441 1.002608 1.451777 1.483861 0.401043 0.385002 0.778024 0.802087 1.171047 1.138963 0.561461 0.473231 1.138963 0.882295 1.708444 1.307401 0.417085 0.320835 0.842191 0.641669 1.315422 0.930421 0.577502 0.401043 1.20313 0.729899 1.836779 1.058754 0.505315 0.256668 0.978546 0.521356 1.491881 0.73792 0.232605 0.104271 0.449169 0.248647 0.657711 0.360939 0.449169 0.160417 0.874274 0.272709 1.315422 0.401043 0.529377 0.200522 1.066775 0.36896 1.612195 0.537398 0.673753 0.192501 1.379589 0.328856 2.053342 0.465211 0.561461 0.104271 1.1149 0.224584 1.660319 0.272709 0.73792 0.104271 1.475839 0.144376 2.205738 0.160417 0.336876 0.024063 0.673753 0.072188 1.01865 0.096251h170.274981a25.714899 25.714899 0 1 0 0-51.437819H690.275796l168.430181-168.430182a25.618649 25.618649 0 0 0 7.074405-23.092075 25.466252 25.466252 0 0 0-7.058363-13.298597 25.618649 25.618649 0 0 0-18.191326-7.515552 25.586565 25.586565 0 0 0-18.207367 7.523573l0.00802 0.016041-168.42216 168.438203V230.856588a25.730941 25.730941 0 0 0-51.461882 0l0.008021 170.283002c0 0.360939 0.080209 0.705836 0.080209 1.074796 0.032083 0.713857 0.080209 1.419693 0.168438 2.109488 0.08823 0.601565 0.200522 1.187088 0.336876 1.772611zM423.6301 625.924381c-0.120313-0.625628-0.232605-1.267297-0.417085-1.884903a17.084446 17.084446 0 0 0-0.64969-1.933029c-0.120313-0.360939-0.208543-0.721878-0.344897-1.066775-0.080209-0.18448-0.192501-0.336876-0.248647-0.521357-0.288751-0.64969-0.625628-1.259276-0.962504-1.884904-0.28073-0.505315-0.529377-1.002608-0.850212-1.491881-0.352918-0.561461-0.770003-1.098859-1.171047-1.652298a33.639515 33.639515 0 0 0-1.026671-1.363548 25.345939 25.345939 0 0 0-1.451777-1.48386c-0.393022-0.393022-0.770003-0.810108-1.171046-1.146984-0.55344-0.473231-1.130942-0.874274-1.700424-1.29938a19.755395 19.755395 0 0 0-3.1522-1.989175c-0.505315-0.264689-0.978546-0.521356-1.491882-0.745941-0.224584-0.104271-0.441148-0.240626-0.657711-0.360939-0.441148-0.168438-0.874274-0.272709-1.307401-0.401043a27.367197 27.367197 0 0 0-1.620215-0.537398c-0.673753-0.192501-1.379589-0.328856-2.053342-0.465211-0.561461-0.112292-1.10688-0.224584-1.660319-0.272709a18.431952 18.431952 0 0 0-2.205739-0.168438c-0.336876-0.016042-0.673753-0.064167-1.01865-0.096251H228.201681a25.706878 25.706878 0 0 0-25.714899 25.714899 25.706878 25.706878 0 0 0 25.714899 25.72292h108.201493L167.972992 825.026358a25.602607 25.602607 0 0 0-7.074404 23.092075 25.658753 25.658753 0 0 0 25.249688 20.82217 25.594586 25.594586 0 0 0 18.199347-7.523573l-0.008021-0.016041 168.41414-168.422161v108.193472a25.72292 25.72292 0 0 0 43.922267 18.199347c4.668144-4.668144 7.539615-11.084838 7.539614-18.199347l-0.00802-170.283002c0-0.360939-0.080209-0.705836-0.080209-1.074796a20.212584 20.212584 0 0 0-0.497294-3.890121z"></path>
            <path v-else d="M335.127273 335.127273v358.4h358.4V335.127273H335.127273z m0-32.581818h358.4c18.618182 0 27.927273 13.963636 27.927272 27.927272v358.4c0 18.618182-13.963636 27.927273-27.927272 27.927273H335.127273c-18.618182 0-27.927273-13.963636-27.927273-27.927273V335.127273c-4.654545-18.618182 9.309091-32.581818 27.927273-32.581818zM200.145455 344.436364c-9.309091 0-13.963636-4.654545-13.963637-13.963637V200.145455c0-9.309091 4.654545-13.963636 13.963637-13.963637h130.327272c9.309091 0 13.963636 9.309091 9.309091 18.618182 0 4.654545-4.654545 9.309091-9.309091 9.309091H214.109091v116.363636c0 9.309091-9.309091 13.963636-13.963636 13.963637zM330.472727 837.818182H200.145455c-9.309091 0-13.963636-4.654545-13.963637-13.963637v-130.327272c-4.654545-9.309091 4.654545-18.618182 9.309091-18.618182s18.618182 4.654545 18.618182 9.309091v125.672727h116.363636c9.309091 4.654545 13.963636 9.309091 9.309091 18.618182 0 4.654545-4.654545 4.654545-9.309091 9.309091z m493.381818 0h-130.327272c-9.309091 4.654545-18.618182-4.654545-18.618182-9.309091s4.654545-18.618182 9.309091-18.618182h125.672727v-116.363636c-4.654545-9.309091 4.654545-18.618182 9.309091-18.618182s18.618182 4.654545 18.618182 9.309091v139.636363c0 9.309091-9.309091 13.963636-13.963637 13.963637z m0-493.381818c-9.309091 0-13.963636-4.654545-13.963636-13.963637V214.109091h-116.363636c-9.309091 4.654545-18.618182-4.654545-18.618182-9.309091s0-18.618182 9.309091-18.618182h139.636363c9.309091 0 13.963636 4.654545 18.618182 13.963637v130.327272c-4.654545 9.309091-9.309091 13.963636-18.618182 13.963637z"></path>
          </svg>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div id="Navigator-mask" @click="open=false" v-if="open"></div>
    </transition>
    <transition name="menu" @after-enter="onAfterEnter">
      <div id="Navigator-menu" v-if="open">
        <div class="title">设置</div>
        <div class="menu-contains">
          <set-block title="机械臂" @active="onActive(1)" :active="focus==1">
            <set-slider v-for="(servo,index) in ServoValue" :key="index" :name="servo.name" v-model="$store.state.servo[index]" />
          </set-block>
          <set-block title="传输流" @active="onActive(2)" :active="focus==2">
            <div class="single-input">
              <span>视频流</span>
              <input v-model="$store.state.stream.video" class="msinput" placeholder="/5002" />
            </div>
            <div class="single-input">
              <span>mavlink</span>
              <input v-model="$store.state.stream.mavlink" class="msinput" placeholder="/5001">
            </div>
            <div class="single-input">
              <span>指令流</span>
              <input v-model="$store.state.stream.command" class="msinput" placeholder="/">
            </div>
          </set-block>
          <set-block title="窗口" @active="onActive(3)" :active="focus==3">
            <label class="viewbox" v-for="(item,index) in viewbox" :key="index">
              <div class="viewtitle">{{ item }}</div>
              <input type="checkbox" v-model="$store.state.viewbox[index]">
            </label>
          </set-block>
          <set-block title="保存" @active="onActive(4)" :active="focus==4">
            <div class="align-center">
              <h4>
                <small>确定要将设置保存到下位机？</small>
              </h4>
              <h6>(实时设置保存在localStorage)</h6>
              <div class="set-button" @click="onSave">{{ saveBtn }}</div>
            </div>
          </set-block>
          <set-block title="刷新设置" @active="onActive(5)" :active="focus==5">
            <div class="align-center">
              <h4>
                <small>获取来自下位机的设置</small>
              </h4>
              <div class="set-button" @click="onRefreshNode">{{ getFromNodeBtn }}</div>
              <h4>
                <small>重置到Storage设置</small>
              </h4>
              <div class="set-button" @click="onRefreshStorage">{{ getFromStorageBtn }}</div>
              <h4>
                <small>重置到Default设置</small>
              </h4>
              <div class="set-button" @click="onRefreshDefault">{{ getFromDefaultBtn }}</div>
            </div>
          </set-block>
          <set-block title="关于" @active="onActive(6)" :active="focus==6">
            <div class="align-center">
              <img src="@/assets/logo.png">
              <h3>BM Controller</h3>
              <h3>北冥Web控制系统</h3>
              <h3>
                <small>版本1.0.0</small>
              </h3>
            </div>
          </set-block>
        </div>
      </div>
    </transition>
    <img class="logo" :class="{barShow}" src="@/assets/logo2.png" @click="onIconClick" alt="">
  </div>
</template>

<script>
import setSlider from "./setSlider";
import setBlock from "./setBlock";
import { DispatchHTMLEvent } from "@/classes/util";

const settingConfig = {
  saveBtn: {
    default: "保存",
    ing: "保存中……",
    success: "保存成功！",
    failed: "保存出错"
  },
  getFromNodeBtn: {
    default: "从下位机获取",
    ing: "获取中",
    success: "获取成功",
    failed: "获取出错！"
  },
  getFromStorageBtn: {
    default: "从Storage获取",
    success: "获取成功",
    failed: "获取出错！"
  },
  getFromDefaultBtn: {
    default: "重置到默认",
    success: "重置成功",
    failed: "重置出错！"
  },
  delay: 3000
};

const fullScreenChangedEvent = [
  "fullscreenchange",
  "mozfullscreenchange",
  "webkitfullscreenchange",
  "msfullscreenchange"
];

export default {
  data() {
    return {
      ServoValue: [{ name: "左手" }, { name: "左关" }, { name: "左臂" }],
      value: [10, 20],
      focus: 0,
      open: false,
      barShow: true,
      viewbox: [
        "陀螺仪/罗盘",
        "机械臂/履带",
        "温深震传感器",
        "主控板",
        "视频流"
      ],
      isFullScreen: false,
      saveBtn: settingConfig.saveBtn.default,
      getFromNodeBtn: settingConfig.getFromNodeBtn.default,
      getFromStorageBtn: settingConfig.getFromStorageBtn.default,
      getFromDefaultBtn: settingConfig.getFromDefaultBtn.default
    };
  },
  components: {
    setSlider,
    setBlock
  },
  methods: {
    onActive(index) {
      if (this.focus == index) this.focus = 0;
      else this.focus = index;
    },
    onAfterEnter() {
      DispatchHTMLEvent("resize", window);
    },
    onFullTiggle() {
      if (this.isFullScreen) {
        let apilist = [
          "exitFullscreen",
          "msCancelFullscreen",
          "webkitExitFullscreen",
          "mozCancelFullscreen"
        ];
        for (let i in apilist) {
          if (document[apilist[i]] instanceof Function) document[apilist[i]]();
        }
      } else {
        let apilist = [
          "requestFullscreen",
          "msRequestFullscreen",
          "webkitRequestFullScreen",
          "mozRequestFullScreen"
        ];
        for (let i in apilist) {
          if (document.body[apilist[i]] instanceof Function)
            document.body[apilist[i]]();
        }
      }
    },
    onIconClick() {
      this.open = !this.open;
      this.barShow = true;
    },
    onFullScreen(e) {
      this.isFullScreen = !this.isFullScreen;
    },
    async onSave() {
      if (this.saveBtn !== settingConfig.saveBtn.default) return;
      this.saveBtn = settingConfig.saveBtn.ing;
      try {
        let success = await this.$store.dispatch("saveConfig");
        if (success) {
          this.saveBtn = settingConfig.saveBtn.success;
        }
      } catch (e) {
        console.log(e);
        this.saveBtn = settingConfig.saveBtn.failed;
      }
      setTimeout(() => {
        this.saveBtn = settingConfig.saveBtn.default;
      }, settingConfig.delay);
    },
    async onRefreshNode() {
      if (this.getFromNodeBtn !== settingConfig.getFromNodeBtn.default) return;
      this.getFromNodeBtn = settingConfig.getFromNodeBtn.ing;
      try {
        let success = await this.$store.dispatch("refreshStore");
        if (success) {
          this.getFromNodeBtn = settingConfig.getFromNodeBtn.success;
        }
      } catch (e) {
        console.log(e);
        this.getFromNodeBtn = settingConfig.getFromNodeBtn.failed;
      }
      setTimeout(() => {
        this.getFromNodeBtn = settingConfig.getFromNodeBtn.default;
      }, settingConfig.delay);
    },
    async onRefreshStorage() {
      if (this.getFromStorageBtn !== settingConfig.getFromStorageBtn.default)
        return;
      if (this.$store.dispatch("initFromStorage")) {
        this.getFromStorageBtn = settingConfig.getFromStorageBtn.success;
      } else {
        this.getFromStorageBtn = settingConfig.getFromStorageBtn.failed;
      }
      setTimeout(() => {
        this.getFromStorageBtn = settingConfig.getFromStorageBtn.default;
      }, settingConfig.delay);
    },
    async onRefreshDefault() {
      if (this.getFromDefaultBtn !== settingConfig.getFromDefaultBtn.default)
        return;
      if (this.$store.dispatch("initFromStorage", true)) {
        this.getFromDefaultBtn = settingConfig.getFromDefaultBtn.success;
      } else {
        this.getFromDefaultBtn = settingConfig.getFromDefaultBtn.failed;
      }
      setTimeout(() => {
        this.getFromDefaultBtn = settingConfig.getFromDefaultBtn.default;
      }, settingConfig.delay);
    }
  },
  mounted() {
    fullScreenChangedEvent.forEach(name => {
      document.addEventListener(name, this.onFullScreen);
    });
  },
  destroyed() {
    fullScreenChangedEvent.forEach(name => {
      document.removeEventListener(name, this.onFullScreen);
    });
  }
};
</script>
<style lang='scss'>
#Navigator {
  $barheight: 50px;
  z-index: 10001;
  #Navigator-bar {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: $barheight;
    background: rgba(28, 25, 39, 0.95);
    border-bottom: 1px solid rgba(238, 238, 238, 0.4);
    .nav-left {
      flex-grow: 2;
    }
    .nav-right {
      margin-right: 20px;
      .icon {
        color: white;
        width: $barheight * 0.8;
        height: $barheight * 0.8;
        padding: $barheight * 0.1;
        transition: background-color 0.4s ease-in-out;
        &:hover {
          background: #00c1de;
        }
      }
    }
    .title {
      color: white;
      padding-left: 70px;
    }
  }
  #Navigator-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.63);
    transition: opacity 0.4s ease-in-out;
  }
  #Navigator-menu {
    &.menu-enter-to,
    &.menu-leave {
      transform: translate(0, 0);
    }
    &.menu-leave-to,
    &.menu-enter {
      transform: translate(-100%, 0);
    }
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background: rgba(28, 25, 39, 0.93);
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.28);
    width: 250px;
    transition: all ease-in-out 0.4s;
    .title {
      background: rgba(0, 0, 0, 0.5);
      padding: 1rem;
      padding-left: 70px;
      color: white;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    .single-input {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      > input {
        width: 80%;
        padding: 5px 10px;
      }
      > span {
        color: white;
        align-self: flex-start;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 1.2rem;
        font-size: 0.8rem;
      }
    }
    .set-button {
      color: white;
      padding: 0.5rem;
      background: #8f8f8f;
      margin: 1.2rem;
      font-size: 0.8rem;
      text-align: center;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      transition: background-color ease-in-out 0.4s, transform ease-in-out 0.1s;
      &:hover,
      &:active {
        background: #afafaf;
      }
      &:active {
        transform: scale(0.95);
      }
    }
    .menu-contains {
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 0px;
      }
      .viewbox {
        display: flex;
        justify-content: space-between;
        padding: 0.6rem 1.2rem;
        color: white;
        font-size: 0.8rem;
        transition: background-color 0.4s ease-in-out;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
      .align-center {
        text-align: center;
        color: white;
        h3,
        h4,
        h5,
        h6 {
          font-weight: lighter;
          margin: 0.6rem 0;
          small {
            color: #c2c2c2;
          }
        }
        .table {
          color: gray;
        }
      }
    }
  }
  .logo {
    position: fixed;
    left: 0;
    top: 0;
    height: $barheight * 0.6;
    width: auto;
    padding: $barheight * 0.2;
    margin-right: 1rem;
    transition: all 0.4s ease-in-out;
    z-index: 1000000;
    background: gray;
    border-radius: $barheight / 2;
    &.barShow {
      background: transparent;
      border-radius: 0;
    }
    &:hover {
      background: #00c1de;
    }
  }
}
</style>