<template>
  <div class="page">
    <div class="top">
      <div class="img"></div>
      <div class="text">
        <h1>页面未找到</h1>
        <h2>抱歉，你访问的页面不存在</h2>
        <router-link :to="{ name: 'home' }">
          <el-button @click="leave" class="btn" size="small" type="primary">返回首页</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.page {
  background: #f0f2f5;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 100px;
  flex-direction: column;
}
</style>
