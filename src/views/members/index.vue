
<template>
  <div class="members">
    <grid title="会员套餐管理">
      <!-- 搜索 -->
      <div class="members-search">
        <div>
          <el-button type="primary" @click="handleCreate()">新建</el-button>
          <el-button type="primary" @click="handleDelete">删除</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="list" border :resizable="false" stripe @selection-change="onSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="title" label="名称"></el-table-column>
        <el-table-column prop="price" label="价格" width="100">
          <template slot-scope="scope">
            {{ scope.row.price / 100 }}
          </template>
        </el-table-column>
        <el-table-column prop="days" label="天数"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? '上线' : '下线' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleToggle(scope.row.id)" type="text">
              {{ scope.row.status === 1 ? '下线' : '上线' }}
            </el-button>
            <el-button size="small" @click="handleCreate(scope.row)" type="text">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="total, prev, pager, next"
        :current-page.sync="current"
        @current-change="fetch"
        :page-size="20"
        :total="count">
      </el-pagination>
      <CreateTag ref="$createModal" />
    </grid>
  </div>
</template>

<script>
/*
  name: members => index.vue
  desc: 标签管理
  author: 麦麦
  version：v1.0.0
*/

import CreateTag from './create';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('members');

export default {
  data () {
    return {
      form: {
        title: '',
        is_show: '',
        daterange: '',
        category: ''
      },
      category: {
        needs: '需求',
        resource: '资源'
      },
      current: 1
    };
  },

  created () {
    this.fetch(1);
  },

  computed: {
    ...mapState(['list', 'count'])
  },

  components: {
    CreateTag
  },

  methods: {
    ...mapActions(['FETCH', 'CHANGE_SHOW', 'DELETE']),

    fetch (page) {
      this.current = page;
      const params = {
        limit: 20,
        page,
        ...this.form
      };
      this.FETCH(params);
    },

    handleCreate (row) {
      this.$refs.$createModal.open(row).then(() => {
        this.fetch(this.current);
      });
    },

    async handleToggle (id) {
      await this.CHANGE_SHOW({ id })
      this.$message.success('操作成功');
      this.fetch(this.current);
    },

    onSelectionChange (selection) {
      this.selection = selection.map(ele => ele.id);
    },

    async handleDelete () {
      if (this.selection) {
        await this.DELETE(this.selection);
        this.$message.success('删除成功！');
        await this.fetch(1);
      } else {
        this.$message.info('请选择要删除的标签');
      }
    }
  }
};
</script>
<style lang="less">
@import 'index';
</style>
