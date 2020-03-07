
<template>
  <div class="users">
    <grid title="用户管理">
      <!-- 搜索 -->
      <div class="users__search">
        <el-input
          placeholder="请输入用户名或ID"
          class="search__input"
          auto-complete="off"
          @keyup.enter.native="fetch(1)"
          v-model="searchInput">
          <el-button slot="append" @click="fetch(1)">
            <i class="el-icon-search"></i>
          </el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <el-table :data="list" border :resizable="false" stripe>
        <el-table-column prop="id" label="用户ID" width="100"></el-table-column>
        <el-table-column prop="nick" label="微信昵称" width="100"></el-table-column>
        <el-table-column prop="type" label="类型" width="100"></el-table-column>
        <el-table-column prop="avatar" label="用户" width="300">
          <template slot-scope="scope">
            <router-link tag="div" :to="{ name: 'admin-manage-detail', params: { id: scope.row.user.id } }" class="prize-item__user">
              <img :src="scope.row.user.avatar" alt="">
              <div>
                <span>{{ scope.row.user.name }}</span>
              </div>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="user" label="手机号">
          <template slot-scope="scope">
            <span>{{ scope.row.user.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user" label="最后登录时间 ">
          <template slot-scope="scope">
            <span>{{ scope.row.user.timeActive }}</span>
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
  name: user => index.vue
  desc: 用户管理
  author: 麦麦
  version：v1.0.0
*/

import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('users');

export default {
  data () {
    return {
      searchInput: '',
      current: 1
    };
  },

  mounted () {
    // this.fetch(1);
  },

  computed: {
    ...mapState(['list', 'count'])
  },

  methods: {
    ...mapActions(['FETCH']),

    fetch (page) {
      this.current = page;
      const param = {
        limit: 20,
        page,
        q: this.searchInput
      };
      this.FETCH(param);
    },

    changeFilter (flag) {
      this.fetch(1);
    }
  }
};
</script>
<style lang="less">
@import 'index';
</style>
