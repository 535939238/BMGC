<template>
  <div id='PwmPanel'>
    <JoyStickSingle @click="onHandTiggle" @active="HandleHand" @unactive="UnhandleHand" :size="100" slidername="基准幅度" name="机械臂" :slidervalue="$store.state.slider.armstep" @slidervalue="$store.commit('armstep',arguments[0])" />
    <JoyStickSingle @axis="onTankMove" :size="100" name="履带" slidername="基准速度" :slidervalue="$store.state.slider.tankspeed" @slidervalue="$store.commit('tankspeed',arguments[0])" />
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
    this.servoState = {
      x: 0.5,
      y: 0.5,
      hand: true
    };
    return {};
  },
  methods: {
    onHandTiggle() {
      let { servo } = this.$store.state;
      this.servoState.hand = !this.servoState.hand;
      this.$socket.emit("servo", [
        this.servoState.x,
        this.servoState.y,
        this.servoState.hand ? servo[2][1] : servo[2][0]
      ]);
    },
    onTankMove({ x, y, angle }) {
      let allzero = x === y && x === 0;
      if (this.sending && !allzero) return;
      if (!allzero) {
        this.sending = true;
        setTimeout(() => (this.sending = false), 30);
      }

      let maxSpeed = this.$store.state.slider.tankspeed;
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
    HandleHand(axis) {
      let step = this.$store.state.slider.armstep / 5;
      let { servo } = this.$store.state;
      let [storex, storey, storemx, storemy] = [
        (servo[0][1] - servo[0][0]) / 100,
        (servo[1][1] - servo[1][0]) / 100,
        servo[0][0] / 100,
        servo[1][0] / 100
      ];
      const caculate = function(sval, val) {
        let res = sval + val * step;
        if (res < 0) res = 0;
        else if (res > 1) res = 1;
        return res;
      };

      this.handTimerId = setInterval(() => {
        let { x, y, angle } = axis;
        this.servoState.x = caculate(this.servoState.x, x);
        this.servoState.y = caculate(this.servoState.y, y);

        this.$socket.emit("servo", [
          this.servoState.x * storex + storemx,
          this.servoState.y * storey + storemy
        ]);
      }, 50);
    },
    UnhandleHand() {
      clearInterval(this.handTimerId);
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