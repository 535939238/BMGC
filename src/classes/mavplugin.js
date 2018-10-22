import mavlink from "../assets/mavlink";

class MAVLinkSuper extends mavlink.MAVLink {

  /**
   * Creates an instance of MAVLink.
   * @param { {logger?:Console, srcSystem?:number, srcComponent?:number} } options   
   * @memberof MAVLinkSuper
   * @constructor
   */
  constructor({
    logger = null,
    srcSystem = 1,
    srcComponent = 50,
  }) {
    super(logger, srcSystem, srcComponent);
  }


  /**
   * connect websocket to url
   *
   * @param {*} url
   * @memberof MAVLinkSuper
   */
  connect(url) {
    if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
      this.ws.close(3000, "old WebSocket closed ");
    }

    try {
      this.ws = new WebSocket(url);
    } catch (e) {
      console.warn(e);
      return;
    }

    let websocket = this.ws;
    websocket.binaryType = "arraybuffer";
    this.emit('reconnect', this.ws);

    let _heartBeatId;
    websocket.addEventListener('open', () => {
      setTimeout(() => {
        this.go(new mavlink.messages.request_data_stream(
          1,
          1,
          mavlink.MAV_DATA_STREAM_ALL,
          5,
          1
        ));
      }, 1000);

      _heartBeatId = setInterval(() => {
        // this.go(new mavlink.messages.heartbeat(
        //   mavlink.MAV_TYPE_GCS,
        //   mavlink.MAV_AUTOPILOT_INVALID,
        //   0,
        //   0,
        //   0
        // ));
        let command = {
          type: "heatbeat",
          args: [
            mavlink.MAV_TYPE_GCS,
            mavlink.MAV_AUTOPILOT_INVALID,
            0,
            0,
            0
          ]
        };
        this.go(command);
      }, 1000);
    });

    websocket.addEventListener('close', () => {
      clearInterval(_heartBeatId);
    });

    websocket.onmessage = (mes) => {
      this.parseBuffer(Buffer.from(mes.data));
    }

    this.file = this.ws;
    this.ws.write = this.ws.send;
  }

  /**
   * go on request
   *
   * @param {*} request
   * @memberof MAVLinkSuper
   */
  go(request) {
    if (request.type) {
      this.ws.send(Buffer.from(JSON.stringify(request)));
      return;
    }
    let p = new Buffer(request.pack(this));
    this.ws.send(p);
    // console.log(p)
  }
}

MAVLinkSuper.prototype.messages = mavlink.messages;
MAVLinkSuper.prototype.mavlink = mavlink;
MAVLinkSuper.prototype.target_system = 1;
// MAVLinkSuper.prototype.target_component = 50;
MAVLinkSuper.prototype.target_component = 1;

// plugin for extract mavlink control
function install(Vue, {
  logger = null,
  srcSystem = 1,
  srcComponent = 50
} = {
  logger: null,
  srcSystem: 1,
  srcComponent: 50
}) {

  Vue.prototype.$mavlink = new MAVLinkSuper({
    logger,
    srcSystem,
    srcComponent
  });
}

export default {
  install,
  MAVLinkSuper
}
