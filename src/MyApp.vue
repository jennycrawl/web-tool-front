<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BaseHeader from "@/components/BaseHeader.vue";
</script>

<template>
  <header>

    <div class="wrapper">
      <BaseHeader />
    </div>
  </header>

  <RouterView />
</template>
