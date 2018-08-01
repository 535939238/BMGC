<template>
  <div class='ControlPanel'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='scss'>
.ControlPanel {
  // position: fixed;
  box-shadow: 0px 0px 20px #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  // height: 240px;
  // width: 380px;
  // right: 20px;
  $radius: 5px;
  border-radius: $radius;
  // opacity: 0.3;
  // background: rgba(0, 0, 0, 0.05);
  opacity: 1;
  background: rgba(0, 0, 0, 0.5);
  transition: all ease-in-out 0.4s;
  margin-bottom: 15px;
}
</style>