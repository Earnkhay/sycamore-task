<template>
  <span
    :class="['material-symbols-outlined', 'animate-spin', color, hoverColor]"
  >
    progress_activity
  </span>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: "text-white",
  },
  hoverColor: {
    type: String,
    default: "group-hover:text-orange",
  },
});
</script>
