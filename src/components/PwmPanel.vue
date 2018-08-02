<template>
  <div id='PwmPanel'>
    <JoyStickSingle @axis="onHandMove" :slider="stepSlider" :size="100" name="机械臂" />
    <JoyStickSingle @axis="onTankMove" :slider="speedSlider" :size="100" name="履带" />
  </div>
</template>

<script>
import JoyStickSingle from "./JoyStickSingle";
export default {
  name: "",
  components: {
    JoyStickSingle
  },
  data() {
    return {      

      speedSlider: {
        name: "基准速度",
        value: 0.4
      },
      stepSlider:{
        name: "基准幅度",
        value: 0.5
      },
      handVal:{
        
      }
    };
  },
  methods: {
    onTankMove(x, y, angle) {
      let allzero = x === y && x === 0;
      if (this.sending && !allzero) return;
      if (!allzero) {
        this.sending = true;
        setTimeout(() => (this.sending = false), 30);
      }

      let maxSpeed = this.speedSlider.value;
      let yReal = y ** 2 * maxSpeed;
      let xReal = (1 - x ** 2) * yReal;
      if (y < 0) {
        yReal = -yReal;
        xReal = -xReal;
      }

      // console.log(xReal, yReal);
      this.$socket.emit("tank", xReal, yReal);

      /*let [lspeed, rspeed] = [xReal, yReal];
      let speedlist = lspeed < 0 ? [-lspeed, 0] : [0, lspeed];
      speedlist.push.apply(speedlist, rspeed < 0 ? [-rspeed, 0] : [0, rspeed]);
      console.log(speedlist);*/
    },
    onHandMove(x, y, angle) {

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