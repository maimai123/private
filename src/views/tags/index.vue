
<template>
  <div class="tags">
    <grid title="标签列表">
      <!-- 搜索 -->
      <div class="tags-search">
        <div>
          <el-button type="primary" @click="handleCreate()">新建</el-button>
          <el-button type="primary" @click="handleDelete">删除</el-button>
        </div>
        <div class="operate">
          <el-select v-model="form.is_show" clearable placeholder="请选择状态" class="search-select">
            <el-option label="显示" :value="1"></el-option>
            <el-option label="隐藏" :value="0"></el-option>
          </el-select>
          <el-select v-model="form.category" clearable placeholder="请选择分类" class="search-select">
            <el-option
              v-for="(item, key) in category"
              :key="key"
              :label="item"
              :value="key">
            </el-option>
          </el-select>
          <el-input
            placeholder="标签名称"
            class="search-input"
            auto-complete="off"
            clearable
            @keyup.enter.native="fetch(1)"
            v-model="form.title"
          />
          <el-date-picker
            v-model="form.daterange"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 250px;"
          />
          <el-button type="primary" @click="fetch(1)">搜索</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="list" border :resizable="false" stripe @selection-change="onSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="title" label="标签名称"></el-table-column>
        <el-table-column prop="category" label="分类" width="100">
          <template slot-scope="scope">
            {{ scope.row.category.split(',').map(item => category[item]).join(',') }}
          </template>
        </el-table-column>
        <el-table-column prop="time_create" label="创建时间"></el-table-column>
        <el-table-column prop="is_show" label="状态">
          <template slot-scope="scope">
            {{ scope.row.is_show === 1 ? '显示' : '隐藏' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleToggle(scope.row.id, scope.row.is_show ? 0 : 1)" type="text">
              {{ scope.row.is_show === 1 ? '隐藏' : '显示' }}
            </el-button>
            <el-button size="small" @click="handleCreate(scope.row)" type="text">修改</el-button>
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
  name: tags => index.vue
  desc: 标签管理
  author: 麦麦
  version：v1.0.0
*/

import CreateTag from './create';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('tags');

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

    async handleToggle (id, is_show) {
      await this.CHANGE_SHOW({ id, is_show })
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
