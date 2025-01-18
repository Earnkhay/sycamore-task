<template>
  <button
    :type="type"
    :class="['btn', bgColor, textColor, size, borderColor]"
    @click="onClick"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String as () => "button" | "submit" | "reset",
    default: "button",
  },
  bgColor: {
    type: String,
    default: "bg-orange",
  },
  borderColor: {
    type: String,
    default: "outline-[#F59E0B]",
  },
  textColor: {
    type: String,
    default: "text-white",
  },
  size: {
    type: String,
    default: "px-12 py-2",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["click"]);

const onClick = (event: Event) => {
  emits("click", event);
};
</script>
