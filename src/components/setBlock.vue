<!-- setBlock -->
<template>
  <div class="setBlock" :class="{active}">
    <div class="settitle" @click="$emit('active')">{{title}}</div>
    <div class="setcontains" v-if="active">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "active"],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang='scss'>
.setBlock {
  text-align: left;
  $titlebg: #00c1de;
  &.active {
    box-shadow: 0px 0px 20px #000000ff;
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
    padding: 0.7rem 0rem;
    background: #5e6366cc;
  }
}
</style>