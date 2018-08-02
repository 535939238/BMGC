<!-- JoyStickSingle -->
<template>
  <div class="JoyStickSingle">
    <div class="bg" :style="bgStyle" ref="bg">
      <CircleSlider v-if="slidername" @input="$emit('slidervalue',arguments[0])" :value="slidervalue" :name="slidername" />
      <div class="bar" :style="barStyle" @mousedown="onMouseDown" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onMouseUp"></div>
    </div>
    <div v-once class="name">{{name}}</div>
  </div>
</template>

<script>
import CircleSlider from "./CircleSlider";
export default {
  props: {
    slidername: null,
    slidervalue: null,
    size: Number,
    name: String
  },
  data() {
    return {
      barOffset: {
        x: 0,
        y: 0
      }
    };
  },
  components: {
    CircleSlider
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
        width: this.size + "px",
        height: this.size + "px"
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
      this.$emit("active");
      window.addEventListener("mousemove", this.onBaseMove);
      window.addEventListener("mouseup", this.onMouseUp);
    },
    onMouseUp() {
      this.barOffset.x = 0;
      this.barOffset.y = 0;
      this.onBaseMove({ clientX: this.barStart.x, clientY: this.barStart.y });
      this.$emit("unactive");
      window.removeEventListener("mousemove", this.onBaseMove);
      window.removeEventListener("mouseup", this.onMouseUp);
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
      let angle = Math.atan(x / y);
      if (y < 0) angle += Math.PI;

      if (x * x + y * y < this.bgSize * this.bgSize) {
        this.barOffset.x = x;
        this.barOffset.y = y;
        abx = x / this.bgSize;
        aby = y / this.bgSize;
      } else {
        abx = Math.sin(angle);
        aby = Math.cos(angle);
        this.barOffset.x = abx * this.bgSize;
        this.barOffset.y = aby * this.bgSize;
      }
      this.axis = {
        x: -abx,
        y: -aby,
        angle
      };
      this.$emit("axis", this.axis);
    }
  }
};
</script>
<style lang='scss'>
.JoyStickSingle {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > .bg {
    position: relative;
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
    > .CircleSlider {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
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
  .name {
    color: white;
    padding: 3px 10px;
    min-width: 50px;
    border-radius: 3px;
    background: #00000080;
    font-size: 0.7rem;
    text-align: center;
    margin-top: 5px;
  }
}
</style>