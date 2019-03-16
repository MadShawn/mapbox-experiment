<template>
  <div class="fm-table-pager">
    <div class="fm-pager-total"></div>
    <ul class="fm-pager-ul">
      <li></li>
      <li></li>
    </ul>
    <div class="fm-pager-size"></div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    total: Number
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 10
    };
  }
};
</script>

<style scoped>
.fm-table-pager {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
