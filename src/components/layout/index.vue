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
        default-active="2"
        class="layout-menu"
        @open="handleOpen"
        @close="handleClose"
        @select="onSelect"
        text-color="#fff"
      >
        <template v-for="item of sidebar">
          <template v-if="item.sub">
            <el-submenu :index="item.name" :key="item.name">
              <span slot="title">{{ item.item }}</span>
              <el-menu-item
                :key="sub.name"
                v-for="sub of item.sub"
                :index="sub.name"
              >
                {{ sub.item }}
              </el-menu-item>
            </el-submenu>
          </template>
          <el-menu-item v-else-if="access[item.access] || item.name == 'home'" :key="item.name" :class="{ line: item.line }" :index="item.name">{{ item.item }}</el-menu-item>
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
  asyncData ({ store, route }) {
    return store.dispatch('user/GET_ACCESS')
  },

  data () {
    return {
      sidebar: [
        { item: '首页', name: 'home' },
        {
          item: 'about',
          name: 'about',
          sub: [
            { item: '名字', name: 'about' }
          ]
        }
        // { item: '定时任务', name: 'cron', access: 'MENU_CRON' },
      ]
    };
  },

  computed: {
    ...mapState(['user', 'access'])
  },

  methods: {
    ...mapActions(['LOGIN_OUT']),
    /**
     * 检查是否需要显示:
     * @param { Object } item 父级的菜单信息
     * @param { Object } sub 当前的子菜单
     * @return { Boolean }
     */
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },

    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },

    onSelect (name) {
      console.log(this.$router);
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
