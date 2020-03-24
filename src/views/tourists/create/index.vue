<template>
  <el-dialog
    :visible.sync="visible"
    width="450px"
    title="新建"
    @close="handleCancel"
  >
    <el-form :model="form" :rules="rules" ref="$createForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="微信昵称" prop="name">
        <el-input v-model="form.name"></el-input>
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

const { mapActions } = createNamespacedHelpers('tourists');
export default {
  name: 'createTourist',
  data () {
    return {
      visible: false,
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入微信昵称' }
        ]
      }
    };
  },

  methods: {
    ...mapActions(['CREATE']),

    open () {
      this.$refs.$createForm && this.$refs.$createForm.resetFields();
      this.visible = true;
      return new Promise(
        (resolve, reject) => { this._resolve = resolve; this._reject = reject; }
      );
    },

    handleSubmit () {
      this.$refs.$createForm.validate(async (valid) => {
        if (valid) {
          await this.CREATE(this.form);
          this.$message.success('创建成功');
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
<style lang="less" scoped>
.item-content {
  text-align: left;
}
</style>
