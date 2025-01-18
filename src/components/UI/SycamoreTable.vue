<template>
  <div class="overflow-x-auto container">
    <table class="min-w-full border border-gray-300 table-auto rounded-md">
      <thead>
        <tr class="bg-grey">
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="px-4 py-2 text-left text-wine"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps({
  headers: {
    type: Array,
    required: true,
  },
});
</script>
