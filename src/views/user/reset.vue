<template>
  <div class="reset">
    <grid title="修改密码">
      <el-form
        @submit.native.prevent="handleSubmit"
        :model="data"
        :rules="rules"
        ref="form"
        label-width="110px"
      >
        <el-form-item label="旧密码" prop="password">
          <el-input v-model="data.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="data.newPassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="rePassword">
          <el-input type="password" v-model="data.rePassword" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item class="reset-operate">
          <el-button class="reset-submit" :loading="lock" native-type="handleSubmit" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </grid>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '' && this.data.password) {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.data.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      lock: false,
      remind: 0,
      data: {
        password: '',
        newPassword: '',
        rePassword: ''
      },
      rules: {
        password: [
          {
            required: true,
            min: 6,
            max: 15,
            pattern: /^[a-z0-9]{6,15}$/,
            message: '密码由6-15位数字和字母组成'
          }
        ],
        newPassword: [
          {
            required: true,
            pattern: /^[a-z0-9]{6,15}$/,
            message: '密码由6-15位数字和字母组成'
          }
        ],
        rePassword: [
          {
            validator: validatePass
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions('user', ['PUT_PASSWORD', 'GET_CAPTCHA']),

    onCaptcha () {
      this.$refs.form.validateField('phone', async (err) => {
        if (!err) {
          await this.GET_CAPTCHA(this.data.phone);
          this.remind = 60;
          this.$message.success('发送成功');
          this.timer = setInterval(() => {
            this.remind -= 1;
            if (this.remind === 0) clearInterval(this.timer);
          }, 1000);
        }
      });
    },

    handleSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.lock = true;
          try {
            // await this.PUT_PASSWORD(this.data);
            this.$alert('去登陆？', '修改成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push({ path: 'login' });
              }
            });
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
.reset {
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
