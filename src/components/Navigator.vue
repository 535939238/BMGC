<!-- Navigator for BeiMingYouyu -->
<template>
  <div id="Navigator">
    <div id="Navigator-bar">
      <!-- <div class="menuico" @click="open=!open">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1582">
          <path d="M92.288 199.36m-60.672 0a0.948 0.948 0 1 0 121.344 0 0.948 0.948 0 1 0-121.344 0Z" p-id="1583"></path>
          <path d="M84.672 500.032m-60.736 0a0.949 0.949 0 1 0 121.472 0 0.949 0.949 0 1 0-121.472 0Z" p-id="1584"></path>
          <path d="M84.672 802.24m-60.736 0a0.949 0.949 0 1 0 121.472 0 0.949 0.949 0 1 0-121.472 0Z" p-id="1585"></path>
          <path d="M995.392 196.544c0 32-23.744 57.856-53.12 57.856L312.512 254.4c-29.376 0-53.184-25.92-53.184-57.856l0 0c0-31.936 23.744-57.856 53.184-57.856l629.696 0C971.648 138.688 995.392 164.608 995.392 196.544L995.392 196.544z" p-id="1586"></path>
          <path d="M995.392 497.28c0 31.936-23.744 57.856-53.12 57.856L312.512 555.136c-29.376 0-53.184-25.92-53.184-57.856l0 0c0-32 23.744-57.856 53.184-57.856l629.696 0C971.648 439.36 995.392 465.28 995.392 497.28L995.392 497.28z" p-id="1587"></path>
          <path d="M995.392 799.296c0 32-23.744 57.92-53.12 57.92L312.512 857.216c-29.376 0-53.184-25.92-53.184-57.92l0 0c0-31.872 23.744-57.792 53.184-57.792l629.696 0C971.648 741.504 995.392 767.424 995.392 799.296L995.392 799.296z" p-id="1588"></path>
        </svg>
      </div> -->
      <img class="logo" src="@/assets/logo2.png" @click="open=!open" alt="">
      <span class="title">北冥有鱼</span>
    </div>
    <transition name="fade">
      <div id="Navigator-mask" @click="open=false" v-if="open"></div>
    </transition>
    <transition name="menu">
      <div id="Navigator-menu" v-if="open">
        <div class="title">设置</div>
        <set-block title="机械臂" @active="onActive(1)" :active="focus==1">
          <set-slider v-for="(servo,index) in ServoValue" :key="index" :name="servo.name" v-model="$store.state.servo[index]" />
        </set-block>
        <set-block title="传输流" @active="onActive(2)" :active="focus==2">
          <div class="single-input">
            <input v-model="videoStreamAddress" class="msinput" placeholder="/5002" />
            <span>视频流</span>
          </div>
          <div class="single-input">
            <input v-model="mavlinkStreamAddress" class="msinput" placeholder="/5001">
            <span>mavlink</span>
          </div>
          <div class="single-input">
            <input v-model="commandStreamAddress" class="msinput" placeholder="/">
            <span>指令流</span>
          </div>
        </set-block>
        <set-block title="窗口" @active="onActive(3)" :active="focus==3">

        </set-block>
        <set-block title="高级" @active="onActive(4)" :active="focus==4">

        </set-block>
        <set-block title="关于" @active="onActive(5)" :active="focus==5">

        </set-block>
      </div>
    </transition>
  </div>
</template>

<script>
import setSlider from "./setSlider";
import setBlock from "./setBlock";
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
      focus: 2,
      videoStreamAddress: "",
      mavlinkStreamAddress: "",
      commandStreamAddress: "",
      open: false
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
    }
  },
  // mounted(){
  //   debugger;
  // }
};
</script>
<style lang='scss'>
#Navigator {
  $barheight: 50px;
  #Navigator-bar {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: $barheight;
    background: #1c2327ee;
    border-bottom: 1px solid #eeeeee50;
    .logo {
      height: $barheight * 0.6;
      width: auto;
      padding: $barheight * 0.2;
      margin-right: 1rem;
      transition: background-color 0.4s ease-in-out;
      &:hover {
        background: #00c1de;
      }
    }
    .title {
      color: white;
    }
  }
  #Navigator-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #000000a0;
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
    background: #1c2327ee;
    box-shadow: 0px 10px 30px #00000047;
    width: 250px;
    transition: all ease-in-out 0.4s;
    .title {
      background: #00000080;
      padding: 1rem;
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
        margin-left: 1.2rem;
        font-size: 0.8rem;
      }
    }
  }
}
</style>