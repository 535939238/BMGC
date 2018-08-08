<!-- MavLinkCtrl -->
<template>
  <div id='MavLinkCtrl'>
    <div class="inner">
      <JoyStickSingle name="x平面" :size="100" slidername="基准速度" :slidervalue="baseSpeed" @slidervalue="baseSpeed=arguments[0]" ref="ljoy" />
      <div class="armbutton">
        <div class="circ" :class="{armed}" @click="armed = !armed">
          {{ armed ? "arming" : "disarmed" }}
        </div>
      </div>
      <JoyStickSingle name="深度与偏航" :size="100" slidername="云台" :slidervalue="cloudServo" @slidervalue="cloudServo=arguments[0]" ref="rjoy" />
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
  watch: {
    cloudServo(val) {
      val = val * 0.0175 + 0.1085;
      // console.log(val);
      this.$socket.emit("tilt", val);
    },
    armed(val) {
      this.$mavlink.go(
        new this.$mavlink.messages.command_long(
          this.$mavlink.target_system,
          this.$mavlink.target_component,
          this.$mavlink.mavlink.MAV_CMD_COMPONENT_ARM_DISARM,
          0,
          val ? 1 : 0,
          0,
          0,
          0,
          0,
          0,
          0
        )
      );
      if (val) {
        this.onHandleAxis();
      } else this.onUnhandleAxis();
      // setTimeout(() => {
      //   this.$mavlink.go(
      //     new this.$mavlink.messages.set_mode(
      //       this.$mavlink.target_system,
      //       this.$mavlink.mavlink.MAV_MODE_FLAG_MANUAL_INPUT_ENABLED,
      //       0
      //     )
      //   );
      // }, 200);

      // master.mav.command_long_send(
      //   master.target_system,
      //   master.target_component,
      //   mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM,
      //   0,
      //   1, 0, 0, 0, 0, 0, 0)
    }
  },
  methods: {
    onHandleAxis() {
      let { ljoy: { axis: laxis }, rjoy: { axis: raxis } } = this.$refs;
      this.handTimerId = setInterval(() => {
        let command = {
          type: "manual_control",
          args: [
            this.$mavlink.target_system,
            Math.round(laxis.x * 1000),
            Math.round(laxis.y * 1000),
            Math.round(raxis.y * 500 + 500),
            Math.round(raxis.x * 1000),
            0
          ]
        };
        this.$mavlink.go(command);
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
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    > .armbutton {
      align-self: flex-end;
      margin-bottom: 1rem;
      .circ {
        &.armed {
          background: #2ac88f;
        }
        background: #fc5857;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(0.3);
        margin: 10px;
        transition: all ease-in-out 0.4s;
        font-size: 0.2rem;
        &:hover {
          transform: scale(1.1);
          margin: 20px;
        }
      }
    }
  }
  @media (max-width: 900px) {
    > .inner {
      width: 60%;
    }
    .circ {
      transform: scale(1.1) !important;
      margin: 0px !important;
      margin-bottom: -20px !important;
    }
  }
}
</style>