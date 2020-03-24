<template>
  <el-dialog
    :visible.sync="visible"
    width="430px"
    title="会员价格"
    @close="handleCancel"
  >
    <el-form :model="form" :rules="rules" ref="$createForm" label-width="60px">
      <el-form-item label="天数" prop="days">
        <el-input v-model="form.days"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button
        type="primary"
        size="mini"
        @click="handleSubmit"
      >确定</el-button>
      <el-button
        size="mini"
        @click="handleCancel"
      >
        取消
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
/*
  name: order => editPriceModal
  desc: 会员价格
  author: 麦麦
  version：v1.0.0
*/
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('order');
export default {
  name: 'editPrice',
  data () {
    return {
      visible: false,
      form: {
        days: '',
        price: ''
      },
      rules: {
        days: [
          { required: true, message: '请输入天数' },
          { pattern: /^\+?[1-9][0-9]*$/, message: '必须输入数字且为大于0的正整数' }
        ],
        price: [
          { required: true, message: '请输入价格' },
          { pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '只能输入大于0的数字哦' }
        ]
      }
    };
  },

  methods: {
    ...mapActions(['FETCH_EQUITY_PRICE', 'EDIT_EQUITY_PRICE']),

    open () {
      this.fetchData();
      this.$refs.$createForm && this.$refs.$createForm.resetFields();
      this.visible = true;
      return new Promise(
        (resolve, reject) => { this._resolve = resolve; this._reject = reject; }
      );
    },

    async fetchData () {
      await this.FETCH_EQUITY_PRICE().then(({ data }) => {
        this.form = data.data;
        this.form.price = this.form.price / 100 || 0;
      })
    },

    handleSubmit () {
      this.$refs.$createForm.validate(async (valid) => {
        if (valid) {
          this.form.price *= 100;
          await this.EDIT_EQUITY_PRICE(this.form);
          this.$message.success('修改成功')
          this.visible = false;
          return this._resolve(true);
        }
      });
    },

    handleCancel () {
      this._reject();
      this.visible = false;
    }
  }
};
</script>
