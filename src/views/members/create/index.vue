<template>
  <el-dialog
    :visible.sync="visible"
    width="450px"
    :title="edit ? '修改' : '新建'"
    @close="handleCancel"
  >
    <el-form :model="form" :rules="rules" ref="$createForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="天数" prop="days">
        <el-input v-model="form.days"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status" class="item-content">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">默认上线</el-radio>
          <el-radio :label="0">默认下线</el-radio>
        </el-radio-group>
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
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('members');
export default {
  name: 'createTag',
  data () {
    return {
      visible: false,
      edit: false,
      form: {
        title: '',
        price: '',
        days: '',
        status: 1
      },
      rules: {
        title: [
          { required: true, message: '请输入标签名称' }
        ],
        price: [
          { required: true, message: '请输入价格' },
          { pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '只能输入大于0的数字哦' }
        ],
        days: [
          { required: true, message: '请输入天数' },
          { pattern: /^\+?[1-9][0-9]*$/, message: '必须输入数字且为大于0的正整数' }
        ],
        status: [
          { required: true, message: '请选择状态' }
        ]
      }
    };
  },

  methods: {
    ...mapActions(['CREATE', 'EDIT']),

    open (row) {
      this.$refs.$createForm && this.$refs.$createForm.resetFields();
      this.visible = true;
      if (row) {
        this.edit = true;
        this.form = row;
        this.form.price = row.price ? row.price / 100 : 0;
      }
      return new Promise(
        (resolve, reject) => { this._resolve = resolve; this._reject = reject; }
      );
    },

    handleSubmit () {
      this.$refs.$createForm.validate(async (valid) => {
        if (valid) {
          const { id = null, price } = this.form;
          if (this.edit) {
            await this.EDIT({ id, data: { ...this.form, price: price * 100 } });
          } else {
            await this.CREATE({ ...this.form, price: price * 100 });
          }
          this.visible = false;
          this.edit = false;
          this.form = { title: '', price: '', days: '', status: 1 };
          return this._resolve(true);
        }
      });
    },

    handleCancel () {
      this._reject();
      this.visible = false;
      this.edit = false;
      this.form = { title: '', price: '', days: '', status: 1 };
    }
  }
};
</script>
<style lang="less" scoped>
.item-content {
  text-align: left;
}
</style>
