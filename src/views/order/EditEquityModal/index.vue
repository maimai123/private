<template>
  <el-dialog
    :visible.sync="visible"
    width="430px"
    title="会员权益"
    @close="handleCancel"
  >
    <el-form :model="form" :rules="rules" ref="$createForm" label-width="0">
      <el-form-item label="" prop="customer_rights">
        <div class="content-left">
          <textarea v-show="false" ref="$textarea" />
        </div>
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
  name: order => editEquityModal
  desc: 会员权益
  author: 麦麦
  version：v1.0.0
*/

import { getMultimediaUri } from '@/api/common';
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('order');
export default {
  name: 'editEquity',
  data () {
    return {
      visible: false,
      form: {
        customer_rights: ''
      },
      rules: {
        customer_rights: [
          { required: true, message: '请输入会员权益' }
        ]
      }
    };
  },

  methods: {
    ...mapActions(['FETCH_EQUITY_PRICE', 'EDIT_EQUITY_PRICE']),

    async open () {
      await this.fetchData();
      this.getSimditor(this.form.customer_rights);
      this.$refs.$createForm && this.$refs.$createForm.resetFields();
      this.visible = true;
      return new Promise(
        (resolve, reject) => { this._resolve = resolve; this._reject = reject; }
      );
    },

    async fetchData () {
      await this.FETCH_EQUITY_PRICE().then(({ data }) => {
        this.form = data.data;
      });
    },

    getSimditor (text) {
      import('simditor').then(({ default: Simditor }) => {
        this.simditor = new Simditor({
          textarea: this.$refs.$textarea,
          toolbar: [
            'title', 'bold', 'italic', 'underline', 'strikethrough', 'color', 'alignment',
            '|', 'indent', 'outdent', '|', 'ol', 'ul', '|', 'blockquote', 'code', 'table',
            'link', 'image', 'hr'
          ],
          toolbarFloat: true,
          toolbarFloatOffset: 50,
          pasteImage: true,
          tabIndent: true,
          indentWidth: 10,
          upload: {
            url: getMultimediaUri(10001),
            params: { simditor: 1 },
            fileKey: 'file',
            leaveConfirm: '正在上传文件，如果离开上传会自动取消'
          }
        });
        this.simditor.setValue(text || this.form.customer_rights);
      });
    },

    handleSubmit () {
      this.form.customer_rights = this.simditor.getValue();
      this.$refs.$createForm.validate(async (valid) => {
        if (valid) {
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
<style lang="less">
@import 'simditor.css';

.content-left {
  text-align: left;
}
</style>
