<template>
  <div
    class="bg-white empty-state flex flex-col items-center justify-center gap-8 my-3"
  >
    <img src="@/assets/svgs/empty.svg" alt="" />
    <div class="text-center flex flex-col gap-6">
      <slot>
        <p class="text-gray-500 font-bold">
          You do not have any customers at the moment
        </p>
        <div class="px-9">
          <Sycamore-button @click="emit('action')">
            Create customer
          </Sycamore-button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import SycamoreButton from "./UI/SycamoreButton.vue";

const emit = defineEmits(["action"]);
</script>

<style scoped>
.empty-state {
  min-height: 50vh;
}
</style>
