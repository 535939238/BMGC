<template>
  <div id='ServoPanel'>
    <RovSlider v-for="(slider,index) in sliders" :key="index" :slider="slider" @input="ValueWatcher(slider,index,arguments[0])" />
  </div>
</template>

<script>
import RovSlider from "./RovSlider";
export default {
  name: "",
  components: {
    RovSlider
  },
  data() {
    return {
      sliders: [
        { name: "左A", value: 0 },
        { name: "左B", value: 396, min: 100, max: 700 },
        { name: "左C", value: 0, min: 100, max: 500 },
        { name: "右A", value: 0 },
        { name: "右B", value: 0 },
        { name: "右C", value: 0 }
      ]
    };
  },
  methods: {
    ValueWatcher(slider, index, value) {
      slider.value = value;
      this.$socket.emit("servo", index, value / 100);
    }
  }
};
</script>

<style lang='scss'>
#ServoPanel {
  display: flex;
  justify-content: space-around;
}
</style>