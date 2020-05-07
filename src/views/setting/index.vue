<template>
  <div class="setting">
    <grid title="设置">
      <el-form
        @submit.native.prevent="handleSubmit"
        :model="data"
        :rules="rules"
        ref="form"
        label-width="110px"
      >
        <el-form-item label="拉新返现" prop="pull">
          <el-input v-model="data.pull" placeholder="请输入拉新返现">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="直推返现" prop="push">
          <el-input v-model="data.push" placeholder="请输入直推返现">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="间推返现" prop="indirectPush">
          <el-input v-model="data.indirectPush" placeholder="请输入间推返现">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="系统奖励" prop="system">
          <el-input v-model="data.system" placeholder="请输入系统奖励">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="邀请好友" prop="invite">
          <div class="content-left">
            <textarea v-show="false" ref="$textarea" />
          </div>
        </el-form-item>
        <el-form-item label="用户协议" prop="agreement">
          <div class="content-left">
            <textarea v-show="false" ref="$textarea2" />
          </div>
        </el-form-item>
        <el-form-item class="setting-operate">
          <el-button class="setting-submit" :loading="lock" native-type="handleSubmit" type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </grid>
  </div>
</template>
<script>
import { getMultimediaUri } from '@/api/common';
import { getSetting, setSetting } from '@/api/user';

const params = ['pull', 'indirectPush', 'push', 'system'];

export default {
  data () {
    return {
      lock: false,
      remind: 0,
      data: {
        pull: '',
        push: '',
        indirectPush: '',
        system: '',
        invite: '',
        agreement: ''
      },
      rules: {
        pull: [
          {
            required: true,
            message: '请输入拉新返现'
          },
          {
            pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '只能输入大于0的数字哦'
          }
        ],
        push: [
          {
            required: true,
            message: '请输入直推返现'
          },
          {
            pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '只能输入大于0的数字哦'
          }
        ],
        indirectPush: [
          {
            required: true,
            message: '请输入间推返现'
          },
          {
            pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '只能输入大于0的数字哦'
          }
        ],
        system: [
          {
            required: true,
            message: '请输入系统奖励'
          },
          {
            pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '只能输入大于0的数字哦'
          }
        ],
        invite: [
          {
            required: true,
            message: '请输入邀请好友文案'
          }
        ],
        agreement: [
          {
            required: true,
            message: '请输入用户协议文案'
          }
        ]
      }
    };
  },
  mounted () {
    getSetting().then(({ data }) => {
      const result = data.data || {};
      Object.keys(result).length && params.forEach(item => {
        result[item] = result[item] ? +result[item] / 100 : 0;
      })
      this.data = result;
      this.getSimditor(this.data?.invite || '');
      this.getSimditor2(this.data?.agreement || '');
    })
  },
  methods: {
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
            url: getMultimediaUri(),
            params: null,
            fileKey: 'file',
            leaveConfirm: '正在上传文件，如果离开上传会自动取消'
          }
        });
        this.simditor.setValue(text);
      });
    },
    getSimditor2 (text) {
      import('simditor').then(({ default: Simditor }) => {
        this.simditor2 = new Simditor({
          textarea: this.$refs.$textarea2,
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
            url: getMultimediaUri(),
            params: null,
            fileKey: 'file',
            leaveConfirm: '正在上传文件，如果离开上传会自动取消'
          }
        });
        this.simditor2.setValue(text);
      });
    },
    handleSubmit () {
      this.data.invite = this.simditor.getValue();
      this.data.agreement = this.simditor2.getValue();
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.lock = true;
          try {
            const data = {};
            params.forEach(item => {
              data[item] = +this.data[item] * 100
            });
            await setSetting({ ...this.data, ...data });
            this.$message.success('保存成功');
            this.lock = false;
          } catch (err) {
            this.lock = false;
          }
          return true;
        }
        return false;
      });
    }
  }
};
</script>

<style lang="less">
  .setting .el-form {
    width: 600px
  }
  .simditor img{
    max-width: 100%;
  }
</style>

<style lang="less" scoped>
@import 'simditor.css';

.setting {
  background: #f0f2f5;

  &-submit {
    width: 100%;
  }

  &-operate {
    text-align: right;
  }

  .content-left {
    text-align: left;
  }

  footer {
    padding: 20px;
  }
}
</style>
