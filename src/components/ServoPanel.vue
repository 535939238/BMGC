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
        { name: "左B", value: 0 },
        { name: "左C", value: 0 }
        // { name: "右A", value: 0 },
        // { name: "右B", value: 0 },
        // { name: "右C", value: 0 }
      ]
    };
  },
  methods: {
    ValueWatcher(slider, index, value) {
      slider.value = value;
      let setval = this.$store.state.servo[index];
      let emitval = (setval[1] - setval[0]) * value / 10000 + setval[0] / 100;
      this.$socket.emit("servo", index, emitval);
      console.log(emitval);
    }
  }
};
</script>

<style lang='scss'>
#ServoPanel {
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
  align-self: stretch;
  padding: 4%;
}
</style>