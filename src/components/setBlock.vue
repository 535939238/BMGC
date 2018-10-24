<!-- setBlock -->
<template>
  <div class="setBlock" :class="{active}">
    <div class="settitle" @click="$emit('active')">{{title}}</div>
    <transition name="mdown" v-on:enter="onEnter" v-on:leave="onLeave">
      <div class="setcontains" ref="trans" v-if="active" mode="out-in">
        <div>
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["title", "active"],
  data() {
    return {};
  },
  methods: {
    onEnter(el) {
      let h = el.clientHeight;
      let trans = el.style.transition;
      el.style.transition = "none";
      el.style.position = "static";
      el.style.maxHeight = "0px";
      el.style.transition = trans;
      setTimeout(() => {
        el.style.maxHeight = `${h}px`;
      }, 50);
    },
    onLeave(el) {
      let h = el.clientHeight;
      el.style.maxHeight = `${h}px`;
      setTimeout(() => {
        el.style.maxHeight = "0px";
      }, 50);
    }
  }
};
</script>
<style lang='scss'>
.setBlock {
  $trans: all ease-in-out 0.6s;
  text-align: left;
  $titlebg: #00c1de;
  transition: $trans;
  &.active {
    box-shadow: 0px 0px 20px rgb(0, 0, 0);
    margin-bottom: 1rem;
    > .settitle {
      background: $titlebg;
    }
  }
  .settitle {
    transition: background-color 0.4s ease-in-out;
    padding: 0.9rem 1.5rem;
    color: white;
    font-size: 0.8rem;
    &:hover {
      background: $titlebg;
    }
  }
  .setcontains {
    background: rgba(94, 99, 102, 0.8);
    overflow: hidden;
    transition: $trans;
    width: 100%;
    > div {
      padding: 0.7rem 0rem;
      transition: $trans;
    }
    &.mdown-enter {
      position: absolute;
    }
  }
}
</style>