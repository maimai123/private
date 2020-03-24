<template>
  <div class="forget">
    <div class="forget-form">
      <div class="forget-form__title">忘记密码</div>
      <el-form
        @submit.native.prevent="handleSubmit"
        :model="data"
        :rules="rules"
        ref="form"
        label-width="110px"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="data.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row type="flex" align="middle">
            <el-input class="code-input" autocomplete="off" v-model="data.code" placeholder="请输入验证码"></el-input>
            <el-button
              @click="onCaptcha"
              :disabled="remind > 0"
              type="primary"
              size="small"
              class="forget-code__btn"
            >
              {{ remind > 0 ? `重新发送${remind}s` : '发送验证码' }}
            </el-button>
          </el-row>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" autocomplete="off" v-model="data.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="rePassword">
          <el-input type="password" autocomplete="off" v-model="data.rePassword" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item class="forget-operate">
          <el-button class="forget-submit" :loading="lock" native-type="handleSubmit" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import * as api from '@/api/user';

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
        phone: '',
        code: '',
        password: '',
        rePassword: ''
      },
      rules: {
        phone: [
          {
            required: true,
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的手机号'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码'
          }
        ],
        password: [
          {
            required: true,
            min: 6,
            max: 15,
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
          const { phone, code, password } = this.data;
          this.lock = true;
          try {
            await api.validateCaptcha({ phone, code });
            await this.PUT_PASSWORD({ phone, password });
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
.forget {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
  background-image: url('~@/assets/bg.svg');

  &-form {
    position: absolute;
    top: 200px;
    width: 500px;
    padding: 16px;
    border: 1px solid #a7b5c1;

    &__title {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px 20px 20px;
      font-size: 30px;
      text-align: center;
    }
  }

  &-code {
    &__btn {
      padding: 11px 15px;
      margin-left: 10px;
    }
  }

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
