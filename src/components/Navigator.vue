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
          <set-slider v-for="servo in ServoValue" :key="servo.name" :name="servo.name" v-model="servo.value" />
        </set-block>
        <set-block title="视频流" @active="onActive(2)" :active="focus==2">
          <div class="streamsetting">
            <input class="msinput" v-model="videoStreamAddress" />
          </div>
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
        { name: "左手", value: [0, 100] },
        { name: "左关", value: [0, 100] },
        { name: "左臂", value: [0, 100] },
        { name: "右手", value: [0, 100] },
        { name: "右关", value: [0, 100] },
        { name: "右臂", value: [0, 100] }
      ],
      value: [10, 20],
      focus: 2,
      videoStreamAddress: "/5002",
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
  }
};
</script>
<style lang='scss'>
#Navigator {
  #Navigator-bar {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: 50px;
    background: #1c2327ee;
    border-bottom: 1px solid #eeeeeeee;
    .menuico {
      width: 50px;
      height: 50px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all ease-in-out 0.4s;
      &:hover {
        background: #00c1de;
      }
      > .icon {
        width: 25px;
        height: 25px;
      }
    }
    .logo {
      height: 60%;
      width: auto;
      margin-left: 2rem;
      margin-right: 1rem;
    }
    .title {
      color: white;
    }
  }
  .menu-enter-to,
  .menu-leave {
    transform: translate(0, 0);
    .mask {
      opacity: 0.3;
    }
  }
  .menu-leave-to,
  .menu-enter {
    transform: translate(-100%, 0);
    .mask {
      opacity: 0 !important;
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
    .streamsetting {
      display: flex;
      flex-direction: column;
      align-items: center;
      > input {
        width: 80%;
        padding: 5px 10px;
      }
    }
  }
}
</style>