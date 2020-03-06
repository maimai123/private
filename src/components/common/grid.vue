<template>
  <div class="grid">
    <div v-if="title" class="grid-head" @click="toggle">
        <strong class="grid__title">{{ title }}</strong>
        <slot name="right"></slot>
    </div>
    <transition name="fade">
      <div class="grid__body" v-if="collapse">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'grid',
  props: {
    title: String,
    collapse: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggle () {
      this.$emit('toggle');
    }
  }
};
</script>
<style lang="less" scoped>
.grid {
  margin: 10px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);

  &-head {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  &__title {
    position: relative;
    padding-left: 10px;
    font-size: 16px;

    &::before {
      position: absolute;
      top: 2px; // 故意的
      left: 0;
      width: 100%;
      height: 20px;
      content: "";
      border-left: 2px solid #88b7e0;
    }
  }

  &__body {
    padding: 10px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>
