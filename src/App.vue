<template>
  <div id="app">
<<<<<<< HEAD
    <router-view style="margin-top: 53px;" />
=======
    <router-view style="margin-top: 52px;" />
>>>>>>> 009fa4ffa93329cad99780c32fd6521c02ed6c4f
    <Navigator/>
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";
import store from "@/store/index";
export default {
  name: "App",
  components: {
    Navigator
  },
  store
};
</script>

<style lang="scss">
#app {
  font-family: Microsoft YaHei;
  transition: all ease-in-out 0.4s;
  /* background-image: url(/video_feed); */
  /* background-size: cover; */
  /* background-position: center; */
  /* background-repeat: no-repeat; */
  position: fixed;
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
.msinput {
  background: #eeeeee80;
  border: 0;
  color: white;
  &:focus {
    outline: none;
  }
}
.fade-enter-active {
  animation-duration: 0.4s;
  animation-name: fadeIn;
}
.fade-leave-active {
  animation-duration: 0.4s;
  animation-name: fadeOut;
}
.icon {
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
