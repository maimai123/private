<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form__title">人脉圈后台管理系统</div>
      <el-form
        @submit.native.prevent="submit"
        :model="data"
        :rules="rules"
        ref="login"
        label-width="70px"
      >
        <el-form-item label="账号" prop="phone">
          <el-input v-model="data.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="data.password"></el-input>
        </el-form-item>
        <el-form-item class="login-operate">
          <div class="login-forget">
            <router-link :to="{ name: 'forget' }">忘记密码？</router-link>
          </div>
          <el-button :loading="lock" native-type="submit" type="primary">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      lock: false,
      data: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          {
            required: true,
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的手机号'
            // trigger: 'blur',
          }
        ],
        password: [
          {
            required: true,
            min: 6,
            max: 30,
            message: '请输入6-30位密码'
            // trigger: 'blur',
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions('user', ['LOGIN']),
    submit () {
      const redirect = this.$route.query.redirect_uri;
      this.$refs.login.validate(async (valid) => {
        if (valid) {
          this.lock = true;
          try {
            await this.LOGIN(this.data);
            if (redirect) {
              window.location.href = redirect;
            } else {
              this.$router.push({ path: 'home' });
            }
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
.login {
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
    width: 450px;
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

  &-forget {
    text-align: right;

    span {
      color: #3f9eff;
      cursor: pointer;
    }
  }

  &-operate {
    text-align: right;
  }

  footer {
    padding: 20px;
  }
}
</style>
