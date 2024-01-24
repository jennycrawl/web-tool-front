<script setup>
import { RouterView } from 'vue-router'
import BaseHeader from "@/components/BaseHeader.vue";
</script>

<template>
  <main>
    <BaseHeader />
    <RouterView />
  </main>
</template>
