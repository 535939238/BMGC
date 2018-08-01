<template>
  <div id='ControlPanel'>
    <div id="ToolPanel">
      <div class="tool" v-for="(item,index) in tools" :key="index">
        <div class="item" :class="{active:toolat==index}" @click="toolat=index">
          {{item.name}}
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <component :is="tools[toolat].comp"></component>
    </transition>
  </div>
</template>

<script>
import ServoPanel from "./ServoPanel";
import PwmPanel from "./PwmPanel";
export default {
  name: "",
  data() {
    return {
      tools: [
        { name: "机械臂", comp: ServoPanel },
        { name: "履带", comp: PwmPanel },
        { name: "传感器" }
      ],
      toolat: 0
    };
  },
  methods: {}
};
</script>

<style lang='scss'>
#ControlPanel {
  display: flex;
  position: fixed;
  height: 240px;
  width: 420px;
  right: 20px;
  bottom: 20px;
  $radius: 15px;
  border-radius: $radius;
  background: rgba(0, 0, 0, 0.05);
  opacity: 0.3;
  transition: all ease-in-out 0.4s;
  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.5);
  }
  > *:last-child {
    flex-grow: 2;
    background: rgba(0, 0, 0, 0.3);
    border-radius: $radius;
    padding: 20px;
  }
  #ToolPanel {
    padding-top: 25px;
    > .tool {
      > .item {
        font-size: 13px;
        padding: 10px 13px;
        color: white;
        transition: all ease-in-out 0.4s;
        &.active {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          background: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}
</style>