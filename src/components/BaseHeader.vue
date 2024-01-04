<script setup>

</script>

<template>
  <el-menu :default-active="this.$route.path" router class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <el-sub-menu index="1">
      <template #title>微博</template>
      <el-menu-item index="/weibo/statistics">统计结果</el-menu-item>
      <el-menu-item index="/weibo/msg">详细数据</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>微信</template>
      <el-menu-item index="/wechat/statistics">统计结果</el-menu-item>
      <el-menu-item index="/wechat/msg">详细数据</el-menu-item>
    </el-sub-menu>
    </el-menu>
</template>

<style scoped>

</style>