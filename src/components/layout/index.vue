<template>
  <el-container class="app">
    <header class="header">
      <div class="header__title">
        <span>人脉圈后台管理系统</span>
      </div>
      <nav class="header-nav">
        <el-dropdown>
          <span class="el-dropdown-link">
            <!-- <img class="header-nav__avatar" :src="user.avatar"> -->
            <span class="header-nav__name">{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link :to="{ name: 'reset' }"><el-dropdown-item>修改密码</el-dropdown-item></router-link>
            <div @click="handleLogout"><el-dropdown-item>退出</el-dropdown-item></div>
          </el-dropdown-menu>
        </el-dropdown>
      </nav>
    </header>
    <section class="layout">
      <el-menu
        class="layout-menu"
        @select="onSelect"
        text-color="#fff"
        :default-active="active"
      >
        <template v-for="item of sidebar">
          <template v-if="item.sub && access[item.access]">
            <el-submenu :index="item.name" :key="item.name">
              <span slot="title">{{ item.item }}</span>
              <el-menu-item
                :key="`${sub.name}-${index}`"
                v-for="(sub, index) of item.sub"
                :index="sub.name"
              >
                {{ sub.item }}
              </el-menu-item>
            </el-submenu>
          </template>
          <el-menu-item v-else-if="access[item.access]" :key="item.name" :class="{ line: item.line }" :index="item.name">{{ item.item }}</el-menu-item>
        </template>
      </el-menu>
      <router-view id="main" class="layout-main"></router-view>
    </section>
  </el-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('user')

export default {
  data () {
    return {
      sidebar: [
        // { item: '首页', name: 'home', access: 'MENU_HOME' },
        { item: '用户管理', name: 'users', access: 'MENU_USERS' },
        { item: '需求管理', name: 'demand', access: 'MENU_DEMAND' },
        { item: '订单管理', name: 'order', access: 'MENU_ORDER' },
        { item: '标签管理', name: 'tags', access: 'MENU_TAGS' },
        { item: '优质游客圈', name: 'tourists', access: 'MENU_TOURISTS' },
        { item: '会员套餐', name: 'members', access: 'MENU_MEMBERS' },
        { item: '提现审核', name: 'withdraw', access: 'MENU_WITHDRAW' },
        { item: '设置', name: 'setting', access: 'MENU_SETTING' }
      ]
    };
  },

  mounted () {
    this.GET_USER();
  },

  computed: {
    ...mapState(['user', 'access']),

    active () {
      const { name, meta } = this.$route;
      const { sidebar = '' } = meta;
      let active = name;
      active = this.$route.matched.reduceRight((preValue, item, index, array) => {
        return sidebar || preValue;
      }, active);
      return active;
    }
  },

  methods: {
    ...mapActions(['GET_USER', 'GET_ACCESS', 'LOGIN_OUT']),

    onSelect (name) {
      // eslint-disable-next-line handle-callback-err
      this.$router.push({ name }).catch(err => {});
    },

    handleLogout () {
      this.$confirm('退出系统？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '退出中';
            try {
              await this.LOGIN_OUT();
              done();
              instance.confirmButtonLoading = false;
              this.$router.push({ name: 'login' });
            } catch (error) {
              instance.confirmButtonLoading = false;
              instance.confirmButtonText = '确定';
            }
          } else {
            done();
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
@import 'index.less';
</style>
