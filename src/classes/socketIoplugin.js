const io = require('socket.io-client');

function install(Vue) {

  function connect(...args) {
    let _socket = Vue.prototype.$socket;
    if (_socket.connected || _socket.disconnected) {
      _socket.close();
    }
    let socket = io(...args)
    socket.connect = connect;
    socket._callbacks = _socket._callbacks;
    _socket.removeAllListeners();
    Vue.prototype.$socket = socket;
  }

  Vue.prototype.$socket = {
    removeAllListeners() {}
  };
  connect();
}

export default {
  install
}
