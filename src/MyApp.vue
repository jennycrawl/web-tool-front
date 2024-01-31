<script setup>
import { RouterView } from 'vue-router'
import BaseHeader from "@/components/BaseHeader.vue";
</script>

<template>
  <el-container>
    <el-header>
      <BaseHeader />
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
  grid-template-columns:auto;
}
</style>