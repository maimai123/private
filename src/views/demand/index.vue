
<template>
  <div class="demand">
    <grid title="需求管理">
      <!-- 搜索 -->
      <div class="demand-search">
        <router-link :to="{ name: 'demand/create' }">
          <el-button type="primary">发布需求</el-button>
        </router-link>
        <div class="operate">
          <el-input
            placeholder="请输入微信昵称"
            class="search-input"
            clearable
            auto-complete="off"
            @keyup.enter.native="fetch(1)"
            v-model="form.name"
          />
          <el-select v-model="form.is_show" placeholder="请选择状态" clearable class="search-select">
            <el-option
              v-for="(item, key) in TYPE_LIST"
              :key="key"
              :label="item"
              :value="key">
            </el-option>
          </el-select>
          <el-select v-model="form.status" placeholder="请选择审核状态" clearable class="search-select">
            <el-option
              v-for="(item, key) in STATUS_LIST"
              :key="key"
              :label="item"
              :value="key">
            </el-option>
          </el-select>
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
        <el-table-column prop="name" label="微信昵称" width="100"></el-table-column>
        <el-table-column prop="time_create" label="创建时间" width="170"></el-table-column>
        <el-table-column prop="be_invite_times" label="被邀请合作次数"></el-table-column>
        <el-table-column prop="success_times" label="达成合作意向次数"></el-table-column>
        <el-table-column prop="status" label="审核状态">
          <template slot-scope="scope">
            <span>{{ STATUS_LIST[scope.row.status] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="is_show" label="状态">
          <template slot-scope="scope">
            <span>{{ TYPE_LIST[scope.row.is_show] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 0" @click="handleJump(scope.row.id)" type="text">审核</el-button>
            <el-button v-else @click="handleJump(scope.row.id)" type="text">查看详情</el-button>
            <el-button @click="handleToggle(scope.row.id, scope.row.is_show ? 0 : 1 )" type="text">
              {{ scope.row.is_show ? '隐藏' : '显示' }}产品图
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
    </grid>
  </div>
</template>

<script>
/*
  name: demand => index.vue
  desc: 需求管理
  author: 麦麦
  version：v1.0.0
*/

import { createNamespacedHelpers } from 'vuex';
import { TYPE_LIST, STATUS_LIST } from './constants';

const { mapState, mapActions } = createNamespacedHelpers('demand');

export default {
  data () {
    return {
      form: {
        name: '',
        is_show: '',
        status: '',
        daterange: ''
      },
      current: 1,
      TYPE_LIST,
      STATUS_LIST
    };
  },

  created () {
    const { name } = this.$route.query;
    if (name) this.form.name = name;
    this.fetch(1);
  },

  computed: {
    ...mapState(['list', 'count'])
  },

  methods: {
    ...mapActions(['FETCH', 'CHANGE_SHOW']),

    fetch (page) {
      this.current = page;
      const params = {
        limit: 20,
        page,
        ...this.form
      };
      this.FETCH(params);
    },

    async handleToggle (id, is_show) {
      await this.CHANGE_SHOW({ id, is_show })
      this.$message.success('操作成功');
      this.fetch(this.current);
    },

    handleJump (id) {
      this.$router.push({ name: 'demand/create', params: { id } });
    }
  }
};
</script>
<style lang="less">
@import 'index';
</style>
