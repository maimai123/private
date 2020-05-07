<template>
  <div class="withdraw">
    <grid title="提现审核">
      <!-- 搜索 -->
      <div class="withdraw-search">
        <div>
          <el-button type="primary" @click="handleCreate">提现说明</el-button>
          <!-- <el-button type="primary" @click="handleDelete">删除</el-button> -->
        </div>
        <div class="operate">
          <el-input
            placeholder="微信昵称 | 流水号"
            class="search-input"
            auto-complete="off"
            clearable
            @keyup.enter.native="fetch(1)"
            v-model="form.keywords"
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
          <el-select v-model="form.status" clearable placeholder="状态" class="search-select">
            <el-option v-for="(item, key) in status" :key="item" :label="status[key]" :value="key"></el-option>
          </el-select>
          <el-button type="primary" @click="fetch(1)">搜索</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="list" border :resizable="false" stripe>
        <el-table-column prop="trade_no" label="流水号"></el-table-column>
        <el-table-column prop="name" label="微信昵称" width="100"></el-table-column>
        <el-table-column prop="time_create" label="申请时间"></el-table-column>
        <el-table-column prop="money" label="提现金额">
          <template slot-scope="scope">
            {{ scope.row.money / 100 }}
          </template>
        </el-table-column>
        <el-table-column prop="money" label="审核状态">
          <template slot-scope="scope">
            {{ status[scope.row.status] || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <template v-if="scope.row.status === 0">
              <el-button size="small" @click="handleVerity(1, scope.row)" type="text">
                通过
              </el-button>
              <el-button size="small" @click="handleVerity(2, scope.row)" type="text">
                拒绝
              </el-button>
            </template>
            <el-button v-else size="small" @click="handleVerity(3, scope.row)" type="text">详情</el-button>
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
  name: withdraw => index.vue
  desc: 提现审核管理
  author: 麦麦
  version：v1.0.0
*/

import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('withdraw');

const STATUS_FORMAT = {
  PASS: 1,
  REFUSE: 2,
  DETAIL: 3
}

export default {
  data () {
    return {
      form: {
        keywords: '',
        status: '',
        daterange: ''
      },
      status: {
        0: '待审核',
        1: '已通过',
        2: '已拒绝'
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

  methods: {
    ...mapActions(['FETCH', 'GET_INTRO', 'SET_INTRO', 'CHANGE', 'DELETE']),

    fetch (page) {
      this.current = page || 1;
      const params = {
        limit: 20,
        page,
        ...this.form
      };
      this.FETCH(params);
    },

    async handleCreate () {
      const { data } = await this.GET_INTRO();
      this.$prompt('请输入说明', '提现说明', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{0,300}$/,
        inputType: 'textarea',
        inputValue: data?.data?.withdraw_setting || '',
        inputErrorMessage: '提现说明最多300个'
      }).then(async ({ value }) => {
        await this.SET_INTRO({ withdraw_setting: value });
        this.$message.success('操作成功');
      });
    },

    async handleVerity (type, row) {
      /* eslint-disable */
      const { id, status, name = '-', time_create = '-', money = '0', time_finish = '-', fail_reason = '-' } = row;
      switch (type) {
        case STATUS_FORMAT.PASS:
          this.$confirm('您确定要通过吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            await this.CHANGE({ id, status: type });
            this.$message.success('操作成功');
            this.fetch(this.current);
          });
          break;
        case STATUS_FORMAT.REFUSE:
          this.$prompt('请输入拒绝理由', '拒绝', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputType: 'textarea',
            inputPattern: /^.{3,100}$/,
            inputErrorMessage: '拒绝理由最少3个字最多100个'
          }).then(async ({ value }) => {
            await this.CHANGE({ id, status: type, fail_reason: value });
            this.$message.success('操作成功');
            this.fetch(this.current);
          });
          break;
        default:
          console.log(`详情（${status === 1 ? '已通过' : '已拒绝'}）`);
          this.$alert(`<div class="withdraw-info">
              <div><span>用户昵称：${name}</span><span>申请时间：${time_create}</span></div>
              <div><span>提现金额：${money ? money / 100 : 0}</span><span>审核时间：${time_finish}</span></div>
              ${
                status === 2 ? `<div>拒绝理由：</div>
              <div>${fail_reason || '--'}</div>` : ''
              }
            </div>
          `, `详情（${status === 1 ? '已通过' : '已拒绝'}）`, {
            dangerouslyUseHTMLString: true
          });
      }
    },

    async handleDelete () {
      if (this.selection) {
        await this.DELETE(this.selection);
        this.$message.success('删除成功！');
        await this.fetch(1);
      } else {
        this.$message.info('请选择要删除的行');
      }
    }
  }
};
</script>
<style lang="less">
@import 'index';
</style>
