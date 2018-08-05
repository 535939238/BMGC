<!-- SensorPanel -->
<template>
  <div id="SensorPanel">
    <!-- <div class="xacc">{{raw.xacc}}</div>
    <div class="yacc">{{raw.yacc}}</div>
    <div class="zacc">{{raw.zacc}}</div>
    <div class="xgyro">{{raw.xgyro}}</div>
    <div class="ygyro">{{raw.ygyro}}</div>
    <div class="zgyro">{{raw.zgyro}}</div>
    <div class="xmag">{{raw.xmag}}</div>
    <div class="ymag">{{raw.ymag}}</div>
    <div class="zmag">{{raw.zmag}}</div> -->

    <div class="roll">{{att.roll}}</div>
    <div class="pitch">{{att.pitch}}</div>
    <div class="yaw">{{att.yaw}}</div>
    <div class="compass">
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1779">
        <path :style="`transform:rotate(${north}deg)`" d="M497.1439304791101 606.4796094132988L255.5892317483415 778.6976601236245 497.15641444933203 127.35263663629752 716.7515953065143 778.6976608307314z"></path>
      </svg>
      <h5>{{ compassDesc }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      raw: {
        xacc: 0,
        yacc: 0,
        zacc: 0,
        xgyro: 0,
        ygyro: 0,
        zgyro: 0,
        xmag: 0,
        ymag: 0,
        zmag: 0
      },
      att: {
        roll: 0,
        pitch: 0,
        yaw: 0
      },
      north: 0
    };
  },

  components: {},
  computed: {
    compassDesc() {
      
    }
  },

  methods: {
    HandleRawImu(dat) {
      return;
      [
        "xacc",
        "yacc",
        "zacc",
        // "xgyro",
        // "ygyro",
        // "zgyro",
        "xmag",
        "ymag",
        "zmag"
      ].forEach(key => {
        this.$set(this.raw, key, dat[key]);
      });
    },
    HandleAttitude(dat) {
      ["roll", "pitch", "yaw"].forEach(key => {
        this.$set(this.att, key, (dat[key] * 57.29577951308232).toFixed(0));
      });
    },
    HandleHud(dat) {
      this.north = dat.heading;
    }
  },
  mounted() {
    this.$mavlink.on("ATTITUDE", this.HandleAttitude);
    this.$mavlink.on("VFR_HUD", this.HandleHud);
  },
  beforeDestroy() {
    this.$mavlink.removeListener("ATTITUDE", this.HandleAttitude);
    this.$mavlink.removeListener("VFR_HUD", this.HandleHud);
  }
};
</script>
<style lang='scss'>
#SensorPanel {
  color: white;
  .compass {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #08be7d;
    box-shadow: 0px 0px 20px #00000080;
    position: relative;
    > svg {
      transform: scale(0.6);
      > path {
        transform-origin: 50% 50%;
        // transition: all 0.1s ease-in-out;
      }
    }
    > h5 {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin-bottom: 0.7rem;
      text-align: center;
      font-weight: lighter;
    }
  }
}
</style>