<template>
  <el-dialog
    :visible.sync="visible"
    width="450px"
    title="新建"
    @close="handleCancel"
  >
    <el-form :model="form" :rules="rules" ref="$createForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标签名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="type">
        <el-checkbox-group v-model="form.type" class="item-content">
          <el-checkbox v-for="item in typeList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="操作" prop="state" class="item-content">
        <el-checkbox-group v-model="form.state" :max="1">
          <el-checkbox v-for="item in stateList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
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
      typeList: [
        { id: 1, name: '需求' },
        { id: 2, name: '资源' }
      ],
      stateList: [
        { id: 1, name: '显示' },
        { id: 2, name: '隐藏' }
      ],
      form: {
        name: '',
        type: [],
        state: []
      },
      rules: {
        name: [
          { required: true, message: '请输入标签名称' }
        ],
        type: [
          { required: true, message: '请选择分类' }
        ],
        state: [
          { required: true, message: '请选择操作' }
        ]
      }
    };
  },

  methods: {
    ...mapActions(['CREATE']),

    open () {
      this.visible = true;
      return new Promise(
        (resolve, reject) => { this._resolve = resolve; this._reject = reject; }
      );
    },

    handleSubmit () {
      this.$refs.$createForm.validate(async (valid) => {
        if (valid) {
          await this.CREATE(this.form);
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
