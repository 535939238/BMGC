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
            <path d="M335.127273 335.127273v358.4h358.4V335.127273H335.127273z m0-32.581818h358.4c18.618182 0 27.927273 13.963636 27.927272 27.927272v358.4c0 18.618182-13.963636 27.927273-27.927272 27.927273H335.127273c-18.618182 0-27.927273-13.963636-27.927273-27.927273V335.127273c-4.654545-18.618182 9.309091-32.581818 27.927273-32.581818zM200.145455 344.436364c-9.309091 0-13.963636-4.654545-13.963637-13.963637V200.145455c0-9.309091 4.654545-13.963636 13.963637-13.963637h130.327272c9.309091 0 13.963636 9.309091 9.309091 18.618182 0 4.654545-4.654545 9.309091-9.309091 9.309091H214.109091v116.363636c0 9.309091-9.309091 13.963636-13.963636 13.963637zM330.472727 837.818182H200.145455c-9.309091 0-13.963636-4.654545-13.963637-13.963637v-130.327272c-4.654545-9.309091 4.654545-18.618182 9.309091-18.618182s18.618182 4.654545 18.618182 9.309091v125.672727h116.363636c9.309091 4.654545 13.963636 9.309091 9.309091 18.618182 0 4.654545-4.654545 4.654545-9.309091 9.309091z m493.381818 0h-130.327272c-9.309091 4.654545-18.618182-4.654545-18.618182-9.309091s4.654545-18.618182 9.309091-18.618182h125.672727v-116.363636c-4.654545-9.309091 4.654545-18.618182 9.309091-18.618182s18.618182 4.654545 18.618182 9.309091v139.636363c0 9.309091-9.309091 13.963636-13.963637 13.963637z m0-493.381818c-9.309091 0-13.963636-4.654545-13.963636-13.963637V214.109091h-116.363636c-9.309091 4.654545-18.618182-4.654545-18.618182-9.309091s0-18.618182 9.309091-18.618182h139.636363c9.309091 0 13.963636 4.654545 18.618182 13.963637v130.327272c-4.654545 9.309091-9.309091 13.963636-18.618182 13.963637z" p-id="2466"></path>
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

          </set-block>
          <set-block title="高级" @active="onActive(4)" :active="focus==4">

          </set-block>
          <set-block title="关于" @active="onActive(5)" :active="focus==5">

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
export default {
  data() {
    return {
      ServoValue: [
        { name: "左手" },
        { name: "左关" },
        { name: "左臂" },
        { name: "右手" },
        { name: "右关" },
        { name: "右臂" }
      ],
      value: [10, 20],
      focus: 0,
      open: false,
      barShow: true
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
    },
    onIconClick() {
      this.open = !this.open;
      this.barShow = true;
    }
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
    .menu-contains {
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 0px;
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
    transition: background-color 0.4s ease-in-out;
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