<template>
  <div class="fm-panel">
    <div class="header" :class="{'header-reverse': headerReverse}">
      <div class="icon">
        <slot></slot>
      </div>
      <div class="title">{{ title }}</div>
      <div class="toolbar">
        <slot></slot>
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="footer">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FmPanel',
  props: {
    title: String,
    headerReverse: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.header-reverse {
  flex-direction: row-reverse;
}
</style>
