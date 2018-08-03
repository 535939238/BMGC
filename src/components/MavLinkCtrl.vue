<!-- MavLinkCtrl -->
<template>
  <div id='MavLinkCtrl'>
    <div class="inner">
      <JoyStickSingle name="x平面" :size="100" @active="onHandleAxis" @unactive="onUnhandleAxis" slidername="基准速度" :slidervalue="baseSpeed" @slidervalue="baseSpeed=arguments[0]" ref="ljoy" />
      <div class="armbutton">
        <div class="circ">
          {{ armed ? "arming" : "disarmed" }}
        </div>
      </div>
      <JoyStickSingle name="深度与偏航" :size="100" @active="onHandleAxis" @unactive="onUnhandleAxis" slidername="云台" :slidervalue="cloudServo" @slidervalue="cloudServo=arguments[0]" ref="rjoy" />
    </div>
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
      baseSpeed: 0.5,
      cloudServo: 0.5,
      armed: false
    };
  },
  methods: {
    onHandleAxis() {
      let { ljoy: { axis: laxis }, rjoy: { axis: raxis } } = this.$refs;
      this.handTimerId = setInterval(() => {
        // console.log(
        //   Math.round(laxis.x * 1000),
        //   Math.round(laxis.y * 1000),
        //   Math.round(raxis.y * 500 + 500),
        //   Math.round(raxis.x * 1000)
        // );
        this.$mavlink.go(
          new this.$mavlink.messages.manual_control(
            this.$mavlink.target_system,
            Math.round(laxis.x * 1000),
            Math.round(laxis.y * 1000),
            Math.round(raxis.y * 500 + 500),
            Math.round(raxis.x * 1000),
            0
          )
        );
      }, 50);
    },
    onUnhandleAxis() {
      clearInterval(this.handTimerId);
    }
  }
};
</script>

<style lang='scss'>
#MavLinkCtrl {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  > .inner {
    min-width: 250px;
    $radius: 70px;
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;
    padding: 20px;
    background: #00000080;
    display: flex;
    justify-content: center;
    > .armbutton {
      align-self: flex-end;
      margin-bottom: 1rem;
      .circ {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: gray;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(0.3);
        margin: 10px;
        transition: all ease-in-out 0.4s;
        font-size: .2rem;
        &:hover {
          transform: scale(1.1);
          margin: 20px;
        }
      }
    }
  }
}
</style>