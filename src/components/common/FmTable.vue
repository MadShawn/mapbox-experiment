<template>
  <div class="fm-table">
    <v-table
      is-horizontal-resize
      is-vertical-resize
      :vertical-resize-offset="50"
      style="width: 100%;height: 100%;"
      :title-row-height="30"
      :row-height="30"
      even-bg-color="#f3f3f3"
      row-hover-color="#eaf5ff"
      row-click-color="#eaffff"
      :columns="columns"
      :table-data="dataList"
      :column-width-drag="columnWidthDrag"
      :multiple-sort="multipleSort"
      :row-click="rowClick"
      :row-dblclick="rowDblclick"
      @sort-change="sortChange"
    ></v-table>
    <div class="table-pager">
      <v-pagination
        size="small"
        :total="dataTotal"
        :page-size="pageSize"
        :page-index="pageIndex"
        @page-change="pageChange"
        @page-size-change="pageSizeChange"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FmTable',
  props: {
    columns: Array,
    dataList: Array,
    dataTotal: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageIndex: {
      type: Number,
      default: 0
    },
    columnWidthDrag: {
      type: Boolean,
      default: false
    },
    multipleSort: {
      type: Boolean,
      default: false
    },
    rowClick: Function,
    rowDblclick: Function
  },
  methods: {
    pageChange(pageIndex) {
      this.$emit('page-change', pageIndex);
    },
    pageSizeChange(pageSize) {
      this.$emit('page-size-change', pageSize);
    },
    sortChange(params) {
      this.$emit('sort-change', params);
    }
  }
};
</script>

<style scoped>
.fm-table {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  background-color: #fff;
}
.fm-table >>> .v-table-class {
  border-top: 1px solid #636ef5;
  border-bottom: 1px solid #636ef5;
}
.fm-table >>> .v-table-title-cell {
  color: #636ef5;
  font-weight: bold;
  border-right: 1px solid;
  border-color: #bdceec;
  background: rgba(99, 110, 245, 0.1);
}
.fm-table >>> .v-table-body-cell {
  border-color: #bdceec;
  white-space: normal;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fm-table > .table-pager {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
