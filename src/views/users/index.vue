
<template>
  <div class="users">
    <grid title="用户管理">
      <!-- 搜索 -->
      <div class="users-search">
        <el-select v-model="form.type" clearable placeholder="用户类型" @change="fetch(1)">
          <el-option
            v-for="item in TYPE_LIST"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input
          placeholder="请输入微信昵称"
          class="search__input"
          auto-complete="off"
          @keyup.enter.native="fetch(1)"
          clearable
          v-model="form.name">
        </el-input>
        <el-button type="primary" @click="fetch(1)">搜索</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="list" border :resizable="false" stripe>
        <el-table-column prop="name" label="微信昵称"></el-table-column>
        <el-table-column prop="type" label="类型" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.type === 1 ? '会员' : '游客' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="recommend_times" label="推荐次数"></el-table-column>
        <el-table-column prop="rest_recommend_times" label="剩余推荐次数"></el-table-column>
        <el-table-column prop="be_invite_times" label="被邀请合作次数"></el-table-column>
        <el-table-column prop="invite_times" label="主动邀请合作次数"></el-table-column>
        <el-table-column prop="success_times" label="成功合作次数"></el-table-column>
        <el-table-column prop="type" label="操作">
          <template slot-scope="scope">
            <router-link :to="{ name: 'demand', query: { name: scope.row.name } }">
              <el-button size="small" type="text">
                查看需求
              </el-button>
            </router-link>
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
import { TYPE_LIST } from './constants';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('users');

export default {
  data () {
    return {
      form: {
        name: '',
        type: ''
      },
      current: 1,
      TYPE_LIST
    };
  },

  mounted () {
    this.fetch(1);
  },

  computed: {
    ...mapState(['list', 'count'])
  },

  methods: {
    ...mapActions(['FETCH']),

    fetch (page) {
      this.current = page;
      const params = {
        limit: 20,
        page,
        ...this.form
      };
      this.FETCH(params);
    }
  }
};
</script>
<style lang="less">
@import 'index';
</style>
