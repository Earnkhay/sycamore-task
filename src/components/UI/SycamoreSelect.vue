<template>
  <div class="flex items-start">
    <label
      v-if="label"
      :for="id"
      class="block text-base lg:text-xl font-semibold text-wine"
      >{{ label }}</label
    >
    <div v-if="required && label">
      <span class="material-symbols-outlined text-red-500 text-sm">
        asterisk
      </span>
    </div>
  </div>
  <div class="relative w-full">
    <select
      v-model="selectedOption"
      class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      @change="emitSelection"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :class="optionColour"
        class="text-orange"
      >
        {{ option.name }}
      </option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
    >
      <span class="material-symbols-outlined"> arrow_drop_down </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  options: {
    type: Array as () => { name: string; value: string }[],
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
  optionColour: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const selectedOption = ref(props.modelValue);

// Emit the selected value back to the parent component
const emitSelection = () => {
  emit("update:modelValue", selectedOption.value);
};

// Watch for changes in modelValue from parent and update selectedOption
watch(
  () => props.modelValue,
  (newVal) => {
    selectedOption.value = newVal;
  }
);
</script>
