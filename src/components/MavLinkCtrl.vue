<!-- MavLinkCtrl -->
<template>
    <div id='MavLinkCtrl'>
        <JoyStickSingle :size="100" />
        <JoyStickSingle :size="100" />
    </div>
</template>

<script>
import JoyStickSingle from "./JoyStickSingle";
export default {
  name: "",
  components: {
      JoyStickSingle
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='scss'>
#MavLinkCtrl {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>