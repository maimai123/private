
<template>
  <div class="order">
    <grid title="订单管理">
      <!-- 搜索 -->
      <div class="order-search">
        <div>
          <el-button type="primary" @click="handleDelete">删除</el-button>
          <el-button type="primary" @click="handleEditPrice">会员价格</el-button>
          <el-button type="primary" @click="handleEditEquity">会员权益</el-button>
        </div>
        <div class="operate">
          <el-input
            placeholder="请输入微信昵称 / 订单号"
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
      <el-table :data="list" border :resizable="false" stripe @selection-change="onSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="订单号" width="150"></el-table-column>
        <el-table-column prop="name" label="微信昵称"></el-table-column>
        <el-table-column prop="name" label="支付方式" width="100"></el-table-column>
        <el-table-column prop="name" label="充值金额"></el-table-column>
        <el-table-column prop="name" label="充值时间"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="total, prev, pager, next"
        :current-page.sync="current"
        @current-change="fetch"
        :page-size="20"
        :total="count">
      </el-pagination>
      <EditPrice ref="$editPriceModal" />
      <EditEquity ref="$editEquityModal" />
    </grid>
  </div>
</template>

<script>
/*
  name: order => index.vue
  desc: 订单管理
  author: 麦麦
  version：v1.0.0
*/

import EditPrice from './EditPriceModal';
import EditEquity from './EditEquityModal';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('order');

export default {
  data () {
    return {
      form: {
        q: '',
        daterange: ''
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
    EditPrice,
    EditEquity
  },

  methods: {
    ...mapActions(['FETCH', 'DELETE']),

    fetch (page) {
      this.current = page;
      const params = {
        limit: 20,
        page,
        ...this.form
      };
      this.FETCH(params);
    },

    onSelectionChange (selection) {
      this.selection = selection.map(ele => ele.id);
    },

    async handleDelete () {
      if (this.selection) {
        await this.DELETE(this.selection);
      } else {
        this.$message.info('请选择要删除的订单');
      }
    },

    handleEditPrice () {
      this.$refs.$editPriceModal.open().then(() => {
        this.fetch(this.current);
      });
    },

    handleEditEquity () {
      this.$refs.$editEquityModal.open().then(() => {
        this.fetch(this.current);
      });
    }
  }
};
</script>
<style lang="less">
@import 'index';
</style>
