
<template>
  <div class="tags">
    <grid title="标签列表">
      <!-- 搜索 -->
      <div class="tags-search">
        <el-button type="primary" @click="handleCreate">新建</el-button>
        <div class="operate">
          <el-select v-model="form.type" placeholder="请选择分类" class="search-select">
            <el-option
              v-for="item in searchList.type"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input
            placeholder="标签名称"
            class="search-input"
            auto-complete="off"
            @keyup.enter.native="fetch(1)"
            v-model="form.q"
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
      <el-table :data="list" border :resizable="false" stripe>
        <el-table-column prop="id" label="用户ID" width="100"></el-table-column>
        <el-table-column prop="name" label="标签名称" width="100"></el-table-column>
        <el-table-column prop="name" label="分类" width="100"></el-table-column>
        <el-table-column prop="name" label="创建时间"></el-table-column>
        <el-table-column prop="name" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handeleToggle(scope.row)" type="text">显示</el-button>
            <el-button size="small" @click="handeleToggle(scope.row)" type="text">隐藏</el-button>
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
        q: '',
        type: '',
        daterange: ''
      },
      current: 1
    };
  },

  created () {
    this.FETCH_SEARCH();
    this.fetch(1);
  },

  computed: {
    ...mapState(['list', 'count', 'searchList'])
  },

  components: {
    CreateTag
  },

  methods: {
    ...mapActions(['FETCH_SEARCH', 'FETCH', 'AUDIT']),

    fetch (page) {
      this.current = page;
      const params = {
        limit: 20,
        page,
        ...this.form
      };
      this.FETCH(params);
    },

    handleCreate () {
      this.$refs.$createModal.open().then(() => {
        this.fetch(this.current);
      });
    },

    handeleToggle (row) {
      console.log(row);
    }
  }
};
</script>
<style lang="less">
@import 'index';
</style>
