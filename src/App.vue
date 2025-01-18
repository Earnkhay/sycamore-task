<script setup lang="ts">
import { RouterView } from "vue-router";
import SycamoreHeader from "./components/layout/SycamoreHeader.vue";
import SycamoreFooter from "./components/layout/SycamoreFooter.vue";
</script>

<template>
  <SycamoreHeader />

  <RouterView />

  <SycamoreFooter />
</template>
