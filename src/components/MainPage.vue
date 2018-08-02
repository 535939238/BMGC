<template>
  <div id='MainPage'>
    <div class="outputdiv">
      <canvas ref="canvas" width="1000" height="800" :style="canvasStyle"></canvas>
    </div>
    <div class="rightPanel">
      <ControlPanel name="机械臂控制">
        <ServoPanel />
      </ControlPanel>
      <ControlPanel name="履带控制">
        <PwmPanel />
      </ControlPanel>
    </div>
    <img ref="source" src="/static/defaultBg.jpg" style="display:none">
  </div>
</template>

<script>
import ServoPanel from "./ServoPanel";
import PwmPanel from "./PwmPanel";
import TrackerVideo from "@/classes/TrackerVideo";
import ControlPanel from "./ControlPanel";
import mavlink from "@/assets/mavlink";
import { DispatchHTMLEvent } from "@/classes/util";
export default {
  name: "",
  components: {
    ControlPanel,
    ServoPanel,
    PwmPanel
  },
  data() {
    return {
      canvasStyle: {}
    };
  },
  methods: {},
  mounted() {
    //disable select
    document.onselectstart = function() {
      return false;
    };

    //opencv init
    const canvas = this.$refs.canvas;
    const app = document.getElementById("app");

    const rsEvent = () => {
      var hscale = app.clientWidth / canvas.width;
      var vscale = app.clientHeight / canvas.height;
      this.canvasStyle = {
        transform: `scale(${Math.max(hscale, vscale)})`
      };
    };
    window.addEventListener("resize", rsEvent);

    // setTimeout(rsEvent, 200);
    new TrackerVideo({
      FPS: 0,
      inputElement: this.$refs.source,
      outputElement: canvas,
      init:
        window.VideoInitFunc ||
        async function() {
          return function(frame) {
            cv.cvtColor(frame, frame, cv.COLOR_RGB2GRAY, 0);
            return frame;
          };
        },
      nextTick() {
        DispatchHTMLEvent("resize", window);
      }
    });

    //ws
    let mavlinkParser = new mavlink.MAVLink(null, 1, 50);
    let request = new mavlink.messages.request_data_stream(
      1,
      1,
      mavlink.MAV_DATA_STREAM_ALL,
      1,
      1
    );
    request.pack(mavlinkParser);

    // const ws = new WebSocket(`ws://${location.host}:5001`);
    const ws = new WebSocket("ws://192.168.0.76:5001");
    ws.binaryType = "arraybuffer";
    ws.onopen = function() {
      setInterval(function() {
        let request = new mavlink.messages.request_data_stream(
          1,
          1,
          mavlink.MAV_DATA_STREAM_ALL,
          1,
          1
        );
        let p = new Buffer(request.pack(mavlinkParser));
        ws.send(p);
      });
    };

    ws.onmessage = function({ data }) {
      mavlinkParser.parseBuffer(Buffer.from(data));
    };

    mavlinkParser.on("HEARTBEAT", message => {
      console.log("Got a heartbeat message!");
      console.log(message); // message is a HEARTBEAT message
    });

    mavlinkParser.on("message", message => {
      console.log(message);
    });    
  }
};
</script>

<style lang='scss'>
#MainPage {
  .outputdiv {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(/static/HXbackground.png);
    background-size: cover;
    background-position: center;
  }
  .rightPanel {
    position: fixed;
    display: flex;
    flex-direction: column;
    right: 20px;
    width: 360px;
    > * {
      min-height: 240px;
    }
  }
}
</style>