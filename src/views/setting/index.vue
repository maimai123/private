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
        <el-form-item class="setting-operate">
          <el-button class="setting-submit" :loading="lock" native-type="handleSubmit" type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </grid>
  </div>
</template>
<script>
import { getSetting, setSetting } from '@/api/user';

export default {
  data () {
    return {
      lock: false,
      remind: 0,
      data: {
        pull: '',
        push: '',
        indirectPush: ''
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
        ]
      }
    };
  },
  mounted () {
    getSetting().then(({ data }) => {
      const result = data.data;
      Object.keys(data.data).length && Object.keys(data.data).forEach(item => {
        result[item] = result[item] ? +result[item] / 100 : 0;
      })
      this.data = result;
    })
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.lock = true;
          try {
            const data = {};
            Object.keys(this.data).forEach(item => {
              data[item] = +this.data[item] * 100
            })
            await setSetting(data);
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

<style lang="less" scoped>
.setting {
  background: #f0f2f5;

  &-submit {
    width: 100%;
  }

  &-operate {
    text-align: right;
  }

  footer {
    padding: 20px;
  }
}
</style>
