<template>
  <div class="fm-layout col">
    <div class="data-list-header">
      <div class="title">道路日编工单</div>
      <div class="searchbar">
        <input class="fm-control" placeholder="搜索工单名称或ID">
      </div>
    </div>
    <div class="data-list">
      <fm-table
        :columns="columns"
        :data-list="tableData"
        :data-total="data.length"
        :page-size="pageSize"
        :page-index="pageIndex"
        :row-dblclick="rowDblclick"
        @page-change="pageChange"
        @page-size-change="pageSizeChange"
      ></fm-table>
    </div>
  </div>
</template>

<script>
import DSManage from '@/services/DSManage';
import FmTable from '@/components/common/FmTable.vue';

export default {
  name: 'DailyRoadList',
  data() {
    return {
      data: [
        {
          name: '赵伟',
          tel: '156*****1987',
          hobby: '钢琴、书法、唱歌',
          address: '上海市黄浦区金陵东路569号17楼'
        },
        {
          name: '李伟',
          tel: '182*****1538182*****1538182*****1538182*****1538',
          hobby: '钢琴、书法、唱歌',
          address: '上海市奉贤区南桥镇立新路12号2楼'
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: '钢琴、书法、唱歌',
          address: '上海市崇明县城桥镇八一路739号'
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: '钢琴、书法、唱歌',
          address: '上海市'
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: '钢琴、书法、唱歌',
          address: '上海市松江区乐都西路867-871号'
        },
        {
          name: '赵伟',
          tel: '156*****1987',
          hobby: '钢琴、书法、唱歌',
          address: '上海市黄浦区金陵东路569号17楼'
        },
        {
          name: '李伟',
          tel: '182*****1538182*****1538182*****1538182*****1538',
          hobby: '钢琴、书法、唱歌',
          address: '上海市奉贤区南桥镇立新路12号2楼'
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: '钢琴、书法、唱歌',
          address: '上海市崇明县城桥镇八一路739号'
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: '钢琴、书法、唱歌',
          address: '上海市'
        },
        {
          name: '赵伟',
          tel: '156*****1987',
          hobby: '钢琴、书法、唱歌',
          address: '上海市黄浦区金陵东路569号17楼'
        },
        {
          name: '李伟',
          tel: '182*****1538182*****1538182*****1538182*****1538',
          hobby: '钢琴、书法、唱歌',
          address: '上海市奉贤区南桥镇立新路12号2楼'
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: '钢琴、书法、唱歌',
          address: '上海市崇明县城桥镇八一路739号'
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: '钢琴、书法、唱歌',
          address: '上海市'
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: '钢琴、书法、唱歌',
          address: '上海市松江区乐都西路867-871号'
        },
        {
          name: '赵伟',
          tel: '156*****1987',
          hobby: '钢琴、书法、唱歌',
          address: '上海市黄浦区金陵东路569号17楼'
        },
        {
          name: '李伟',
          tel: '182*****1538182*****1538182*****1538182*****1538',
          hobby: '钢琴、书法、唱歌',
          address: '上海市奉贤区南桥镇立新路12号2楼'
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: '钢琴、书法、唱歌',
          address: '上海市崇明县城桥镇八一路739号'
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: '钢琴、书法、唱歌',
          address: '上海市'
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: '钢琴、书法、唱歌',
          address: '上海市松江区乐都西路867-871号'
        },
        {
          name: '赵伟',
          tel: '156*****1987',
          hobby: '钢琴、书法、唱歌',
          address: '上海市黄浦区金陵东路569号17楼'
        },
        {
          name: '李伟',
          tel: '182*****1538182*****1538182*****1538182*****1538',
          hobby: '钢琴、书法、唱歌',
          address: '上海市奉贤区南桥镇立新路12号2楼'
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: '钢琴、书法、唱歌',
          address: '上海市崇明县城桥镇八一路739号'
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: '钢琴、书法、唱歌',
          address: '上海市'
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: '钢琴、书法、唱歌',
          address: '上海市松江区乐都西路867-871号'
        },
        {
          name: '赵伟',
          tel: '156*****1987',
          hobby: '钢琴、书法、唱歌',
          address: '上海市黄浦区金陵东路569号17楼'
        },
        {
          name: '李伟',
          tel: '182*****1538182*****1538182*****1538182*****1538',
          hobby: '钢琴、书法、唱歌',
          address: '上海市奉贤区南桥镇立新路12号2楼'
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: '钢琴、书法、唱歌',
          address: '上海市崇明县城桥镇八一路739号'
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: '钢琴、书法、唱歌',
          address: '上海市'
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: '钢琴、书法、唱歌',
          address: '上海市松江区乐都西路867-871号'
        },
        {
          name: '赵伟',
          tel: '156*****1987',
          hobby: '钢琴、书法、唱歌',
          address: '上海市黄浦区金陵东路569号17楼'
        },
        {
          name: '李伟',
          tel: '182*****1538182*****1538182*****1538182*****1538',
          hobby: '钢琴、书法、唱歌',
          address: '上海市奉贤区南桥镇立新路12号2楼'
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: '钢琴、书法、唱歌',
          address: '上海市崇明县城桥镇八一路739号'
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: '钢琴、书法、唱歌',
          address: '上海市'
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: '钢琴、书法、唱歌',
          address: '上海市松江区乐都西路867-871号'
        },
        {
          name: '赵伟',
          tel: '156*****1987',
          hobby: '钢琴、书法、唱歌',
          address: '上海市黄浦区金陵东路569号17楼'
        },
        {
          name: '李伟',
          tel: '182*****1538182*****1538182*****1538182*****1538',
          hobby: '钢琴、书法、唱歌',
          address: '上海市奉贤区南桥镇立新路12号2楼'
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: '钢琴、书法、唱歌',
          address: '上海市崇明县城桥镇八一路739号'
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: '钢琴、书法、唱歌',
          address: '上海市'
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: '钢琴、书法、唱歌',
          address: '上海市松江区乐都西路867-871号'
        },
        {
          name: '赵伟',
          tel: '156*****1987',
          hobby: '钢琴、书法、唱歌',
          address: '上海市黄浦区金陵东路569号17楼'
        },
        {
          name: '李伟',
          tel: '182*****1538182*****1538182*****1538182*****1538',
          hobby: '钢琴、书法、唱歌',
          address: '上海市奉贤区南桥镇立新路12号2楼'
        }
      ],
      columns: [
        {
          field: 'name',
          title: '姓名',
          width: 100,
          // isResize: true,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'tel',
          title: '手机号码',
          width: 120,
          // isResize: true,
          titleAlign: 'center',
          columnAlign: 'left'
        },
        {
          field: 'hobby',
          title: '爱好',
          width: 330,
          // isResize: true,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'address',
          title: '地址',
          width: 200,
          isResize: true,
          titleAlign: 'center',
          columnAlign: 'left'
        }
      ],
      tableData: [],
      pageSize: 20,
      pageIndex: 2
    };
  },
  methods: {
    getTableData() {
      this.tableData = this.data.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    },
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getTableData();
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getTableData();
    },
    rowDblclick(params) {
      this.$emit('row-dblclick', params);
    }
  },
  created() {
    this.getTableData();
  },
  components: {
    FmTable
  }
};
</script>

<style scoped>
.data-list-header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}
.data-list-header > .title {
    color: #636ef5;
    font-size: 16px;
    font-weight: bold;
}
.data-list {
  flex: 1;
}
</style>
