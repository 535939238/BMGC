<!-- setSlider  -->
<template>
  <div class="setSlider" v-if="value">
    <slider v-model="value.range" v-bind="sliderStyle" />
    <div class="contains">
      <div class="contains-line">
        <span>{{name}} :</span>
        <input type="number" class="msinput" v-model.number="value.range[0]" />
        <span> - </span>
        <input type="number" class="msinput" v-model.number="value.range[1]" />
      </div>
      <div class="contains-line">
        <span>初值：</span>
        <slider v-model="value.middle" v-bind="sliderStyle" />
        <input type="number" class="msinput sm" v-model.number="value.middle">
      </div>
    </div>
  </div>
</template>

<script>
import slider from "vue-slider-component";
export default {
  props: ["value", "name"],
  data() {
    return {
      sliderStyle: {
        tooltip: "none",
        processStyle: {
          backgroundColor: "#fff"
        },
        bgStyle: {
          backgroundColor: "#44444450"
        },
        height: 2,
        dotSize: 12
      }
    };
  },
  components: { slider },
  methods: {}
};
</script>
<style lang='scss'>
.setSlider {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  .contains {
    color: white;
    text-align: left;
    padding: 0.4rem 1rem 0rem 1rem;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    > .contains-line {
      & + .contains-line {
        margin-top: 5px;
      }
      display: flex;
      justify-content: space-around;
      > span:nth-child(1) {
        flex-basis: 25%;
      }
      > .msinput {
        max-width: 50px;
        text-align: center;
        border-radius: 3px;
        -moz-appearance: textfield;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        &.sm{
          min-width: 30px;
        }
      }
      > .vue-slider-component {
        flex-basis: 60%;
      }
    }
    > span {
      margin: 0rem 0.3rem;
    }
  }
}
</style>