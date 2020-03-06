<template>
  <el-container class="app">
    <header class="header">
      <div class="header__title">
        <span>系统后台</span>
      </div>
      <nav class="header-nav">
        <img class="header-nav__avatar" :src="user.avatar">
        <span class="header-nav__name">{{ user.name }}</span>
        <span class="header-nav-item" @click="onLogout">退出</span>
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
        { item: '首页', name: 'home', access: 'MENU_HOME' },
        { item: '用户管理', name: 'users', access: 'MENU_USERS' },
        {
          item: 'about',
          name: 'about',
          access: 'MENU_ABOUT',
          sub: [
            { item: '名字', name: 'about' }
          ]
        }
        // { item: '定时任务', name: 'cron', access: 'MENU_CRON' },
      ]
    };
  },

  mounted () {
    this.GET_ACCESS();
  },

  computed: {
    ...mapState(['user', 'access']),

    active () {
      let active = this.$route.name;
      // active = this.$route.matched.reduceRight((preValue, item, index, array) => {
      //   return item.meta.sidebar || preValue;
      // }, active);
      // if (active === this.$route.name) {
      //   active = Object.keys(this.alias).reduceRight((preValue, key) => {
      //     const item = this.alias[key];
      //     if (item.name === this.$route.name && item.params.alias === this.$route.params.alias) {
      //       return key;
      //     }
      //     return preValue;
      //   }, active);
      // }
      return active;
    }
  },

  methods: {
    ...mapActions(['GET_ACCESS', 'LOGIN_OUT']),

    onSelect (name) {
      this.$router.push({ name });
    },

    onLogout () {
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
