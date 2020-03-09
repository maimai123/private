<template>
  <el-dialog
    :visible.sync="visible"
    width="450px"
    title="新建"
    @close="handleCancel"
  >
    <el-form :model="form" :rules="rules" ref="$createForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标签名称" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-checkbox-group v-model="form.category" class="item-content">
          <el-checkbox v-for="(item, key) in category" :label="key" :key="key">{{item}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="操作" prop="state" class="item-content">
        <el-radio-group v-model="form.is_show">
          <el-radio v-for="(item, key) in is_show" :label="key" :key="key">{{item}}</el-radio>
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

const { mapActions } = createNamespacedHelpers('tags');
export default {
  name: 'createTag',
  data () {
    return {
      visible: false,
      category: {
        needs: '需求',
        resource: '资源'
      },
      is_show: {
        0: '隐藏',
        1: '显示'
      },
      form: {
        title: '',
        category: [],
        is_show: []
      },
      rules: {
        title: [
          { required: true, message: '请输入标签名称' }
        ],
        category: [
          { required: true, message: '请选择分类' }
        ],
        is_show: [
          { required: true, message: '请选择操作' }
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
      const { category, is_show } = this.form;
      this.$refs.$createForm.validate(async (valid) => {
        if (valid) {
          await this.CREATE({ ...this.form, category: category.join(',') });
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
