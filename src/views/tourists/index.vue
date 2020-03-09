
<template>
  <div class="tourists">
    <grid title="优质游客圈">
      <!-- 搜索 -->
      <div class="tourists-search">
        <el-button type="primary" @click="handleCreate">新建</el-button>
        <div class="operate">
          <el-select v-model="form.role_type" clearable placeholder="用户类型" class="search-select">
            <el-option
              v-for="(item, key) in role_type"
              :key="key"
              :label="item"
              :value="key">
            </el-option>
          </el-select>
          <el-input
            placeholder="请输入微信昵称"
            class="search-input"
            clearable
            auto-complete="off"
            @keyup.enter.native="fetch(1)"
            v-model="form.name"
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
        <el-table-column prop="name" label="微信昵称" width="100"></el-table-column>
        <el-table-column prop="time_join" label="进群时间"></el-table-column>
        <el-table-column prop="role_type" label="用户类型" width="100">
          <template slot-scope="scope">
            {{ role_type[scope.row.role_type] }}
          </template>
        </el-table-column>
        <el-table-column prop="be_recommend_times" label="被推荐次数"></el-table-column>
        <el-table-column prop="be_invite_times" label="被邀请合作次数"></el-table-column>
        <el-table-column prop="success_times" label="成功合作次数"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{ name: 'demand', query: { name: scope.row.name } }" class="operate-btn">
              <el-button size="small" type="text">
                查看需求
              </el-button>
            </router-link>
            <el-button size="small" @click="handeleOut(scope.row)" type="text">
              退群
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
      <CreateModal ref="$createModal" />
    </grid>
  </div>
</template>

<script>
/*
  name: tourists => index.vue
  desc: 优质游客圈管理
  author: 麦麦
  version：v1.0.0
*/

import CreateModal from './create';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('tourists');

export default {
  data () {
    return {
      form: {
        name: '',
        role_type: '',
        daterange: ''
      },
      role_type: {
        1: '群主',
        2: '成员'
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
    CreateModal
  },

  methods: {
    ...mapActions(['FETCH', 'OUT']),

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

    handeleOut (row) {
      this.$confirm('确定退群吗？退群之后将不属于优质游客', '退群', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.OUT(row.id);
        this.$message({ type: 'success', message: '退群成功!' });
      }).catch(() => {});
    }
  }
};
</script>
<style lang="less">
@import 'index';
</style>
