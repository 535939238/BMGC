window.VideoInitFunc = async function (obj) {
  console.log("InitFunc called")
  return function (frame) {
    cv.cvtColor(frame, frame, cv.COLOR_RGB2GRAY, 0);
    return frame;
  };
}
