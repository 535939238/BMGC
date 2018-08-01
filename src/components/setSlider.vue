<!-- setSlider  -->
<template>
    <div class="setSlider">
        <slider :value="value" @input="$emit('input',arguments[0])" v-bind="sliderStyle" />
        <div class="contains">
            <span>{{name}} :</span>
            <input type="number" class="msinput" v-model.number="value[0]" />
            <span> - </span>
            <input type="number" class="msinput" v-model.number="value[1]" />
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
    > .msinput {
      max-width: 50px;
      text-align: center;
      border-radius: 3px;
      -moz-appearance: textfield;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
    > span {
      margin: 0rem 0.3rem;
    }
  }
}
</style>