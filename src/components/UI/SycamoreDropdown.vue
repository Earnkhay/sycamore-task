<template>
  <div class="relative inline-block text-left" ref="dropdown">
    <sycamore-button
      bg-color="bg-transparent"
      text-color="text-wine"
      border-color="text-wine"
      class="px-4 py-2 flex"
      @click="toggleDropdown"
    >
      {{ placeholder }}
      <span class="material-symbols-outlined"> arrow_drop_down </span>
    </sycamore-button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50"
    >
      <ul class="py-1">
        <slot>
          <li v-for="option in options" :key="option.value">
            <span
              @click="selectOption(option)"
              class="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {{ option.label }}
            </span>
          </li>
        </slot>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import SycamoreButton from "./SycamoreButton.vue";

const props = defineProps({
  options: {
    type: Array,
    required: false,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "Select",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const dropdown = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  emit("update:modelValue", option.value);
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
