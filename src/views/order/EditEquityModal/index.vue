<template>
  <el-dialog
    :visible.sync="visible"
    width="430px"
    title="会员权益"
    @close="handleCancel"
  >
    <el-form :model="form" :rules="rules" ref="$createForm" label-width="0">
      <el-form-item label="" prop="text">
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
        text: ''
      },
      rules: {
        text: [
          { required: true, message: '请输入会员权益' }
        ]
      }
    };
  },

  methods: {
    ...mapActions(['CREATE']),

    open () {
      this.$refs.$createForm && this.$refs.$createForm.resetFields();
      this.getSimditor();
      this.visible = true;
      return new Promise(
        (resolve, reject) => { this._resolve = resolve; this._reject = reject; }
      );
    },

    getSimditor () {
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
        this.simditor.setValue(this.form.text);
      });
    },

    handleSubmit () {
      this.form.text = this.simditor.getValue();
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
<style lang="less">
@import 'simditor.css';

.content-left {
  text-align: left;
}
</style>
