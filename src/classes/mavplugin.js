import mavlink from "../assets/mavlink";

class MAVLinkSuper extends mavlink.MAVLink {

  /**
   * Creates an instance of MAVLink.
   * @param { {logger?:Console, srcSystem?:number, srcComponent?:number, websocket:WebSocket} } options   
   * @memberof MAVLinkSuper
   * @constructor
   */
  constructor({
    logger = null,
    srcSystem = 1,
    srcComponent = 50,
    websocket
  }) {
    super(logger, srcSystem, srcComponent);
    if (websocket === undefined)
      console.error("websocket is undefined!");

    websocket.binaryType = "arraybuffer";
    websocket.onopen = () => {
      setTimeout(() => {
        this.go(new mavlink.messages.request_data_stream(
          1,
          1,
          mavlink.MAV_DATA_STREAM_ALL,
          1,
          1
        ));
      }, 200);

      this._heartBeatId = setInterval(() => {
        console.log('heatbeat is undefined');
      }, 1000);
    };

    websocket.onclose = () => {
      clearInterval(this._heartBeatId);
    }

    websocket.onmessage = (mes) => {
      this.parseBuffer(Buffer.from(mes.data));
    }

    this.ws = websocket;
  }

  /**
   * go on request
   *
   * @param {*} request
   * @memberof MAVLinkSuper
   */
  go(request) {
    let p = new Buffer(request.pack(this));
    this.ws.send(p);
    // console.log(p)
  }
}

MAVLinkSuper.prototype.messages = mavlink.messages;
MAVLinkSuper.prototype.target_system = 1;

// plugin for extract mavlink control
var install = function (Vue, {
  url,
  logger = null,
  srcSystem = 1,
  srcComponent = 50
}) {
  Vue.prototype.$mavlink = new MAVLinkSuper({
    logger,
    srcSystem,
    srcComponent,
    websocket: new WebSocket(url)
  });
}

export default {
  install,
  MAVLinkSuper
}
