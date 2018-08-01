<!-- JoyStickSingle -->
<template>
  <div class="JoyStickSingle">
    <div class="bg" :style="bgStyle" @touchmove="onTouchMove($event)" @mousemove="onMouseMove($event)" @touchend="onMouseUp" ref="bg">
      <div class="bar" :style="barStyle" @mousedown="onMouseDown($event)" @touchstart="onTouchStart($event)"></div>
      <div class="mask" @mouseleave="onMouseUp" @mouseup="onMouseUp"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: Number
  },
  data() {
    return {
      barOffset: {
        x: 0,
        y: 0
      }
    };
  },
  computed: {
    barStyle() {
      let style = {
        transform: `translate(${this.barOffset.x}px,${this.barOffset.y}px)`
      };
      if (this.barOffset.x != 0 && this.barOffset.y != 0) {
        style.transition = "none";
      }
      return style;
    },
    bgStyle() {
      return {
        width: this.size + 'px',
        height: this.size + 'px'
      };
    }
  },
  methods: {
    onMouseDown({ clientX, clientY }) {
      this.barStart = {
        x: clientX,
        y: clientY
      };
      this.bgSize = this.$refs.bg.clientHeight / 2;
      this.bgSize2 = this.bgSize ** 2;
    },
    onMouseUp() {
      this.barOffset.x = 0;
      this.barOffset.y = 0;
      this.onBaseMove({ clientX: this.barStart.x, clientY: this.barStart.y });
    },
    onMouseMove(e) {
      if (e.buttons == 1) this.onBaseMove(e);
    },
    onTouchStart({ touches: [touch] }) {
      this.onMouseDown(touch);
    },
    onTouchMove({ touches: [touch] }) {
      this.onBaseMove(touch);
    },
    onBaseMove({ clientX, clientY }) {
      let x = clientX - this.barStart.x;
      let y = clientY - this.barStart.y;
      let abx, aby;

      if (x * x + y * y < this.bgSize * this.bgSize) {
        this.barOffset.x = x;
        this.barOffset.y = y;
        abx = x / this.bgSize;
        aby = y / this.bgSize;
      } else {
        let angle = Math.atan(x / y);
        if (y < 0) angle += Math.PI;
        abx = Math.sin(angle);
        aby = Math.cos(angle);
        this.barOffset.x = abx * this.bgSize;
        this.barOffset.y = aby * this.bgSize;
      }
      this.$emit("axis", -abx, -aby);

      //以上为UI部分，以下为socket部分
      /*let maxSpeed = this.speedSlider.value / 100;
      let yReal = this.barOffset.y ** 2 / this.bgSize2 * maxSpeed;
      let xReal = yReal * (1 - this.barOffset.x ** 2 / this.bgSize2);
      if (this.barOffset.y > 0) {
        yReal = -yReal;
        xReal = -xReal;
      }
      this.$socket.emit("tank", xReal, yReal);*/
    }
  }
};
</script>
<style lang='scss'>
.JoyStickSingle {
  flex-grow: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  > .bg {
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    &:active > .mask {
      // background: red;
      z-index: 10000;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    > .bar {
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);
      transition: all ease-in-out 0.4s;
      &:active {
        background: gray;
        transition: none;
      }
    }
  }
}
</style>