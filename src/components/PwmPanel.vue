<template>
  <div id='PwmPanel'>
    <JoyStickSingle @axis="onTankMove" :size="140" />
    <div class="speed">
      <RovSlider :slider="speedSlider" v-model="speedSlider.value" />
    </div>
  </div>
</template>

<script>
import JoyStickSingle from "./JoyStickSingle";
import RovSlider from "./RovSlider";
export default {
  name: "",
  components: {
    RovSlider,
    JoyStickSingle
  },
  data() {
    return {
      speedSlider: {
        name: "基准速度",
        value: 50,
        max: 100
      }
    };
  },
  methods: {
    onTankMove(x, y, angle) {
      let maxSpeed = this.speedSlider.value / 100;

      let yReal = y ** 2 * maxSpeed;
      let xReal = (1 - x ** 2) * yReal;
      console.log(xReal, yReal);
      // this.$socket.emit("tank", ls, rs);
    }
  }
};
</script>

<style lang='scss'>
#PwmPanel {
  display: flex;
  align-self: stretch;
  padding: 4%;
  flex-grow: 2;
}
</style>