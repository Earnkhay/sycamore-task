<template>
  <div>
    <div class="flex justify-between">
      <div class="flex items-start">
        <label
          v-if="label"
          :for="id"
          class="block text-base lg:text-xl font-semibold text-wine mb-4"
          >{{ label }}</label
        >
        <div v-if="required && label">
          <span class="material-symbols-outlined text-red-500 text-sm">
            asterisk
          </span>
        </div>
      </div>

      <small
        v-if="type === 'textarea'"
        class="flex justify-end text-blue-gray-100 py-2"
      >
        Maxlength (250)
      </small>
    </div>

    <div v-if="type === 'textarea'">
      <textarea
        :id="id"
        :value="modelValue"
        v-bind="$attrs"
        :cols="cols"
        :rows="rows"
        :placeholder="placeholder"
        class="input mt-1 block w-full"
        :required="required"
        @input="handleTextareaInput"
      ></textarea>
    </div>
    <div v-else>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        v-bind="$attrs"
        :placeholder="placeholder"
        class="input block w-full"
        :required="required"
        @input="(e: Event) => emits('update:modelValue', (e.target as HTMLInputElement).value)"
      />
    </div>
    <!-- Error message for title -->
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  error: {
    type: null,
    required: false,
  },
  cols: {
    type: Number,
    default: 30,
  },
  rows: {
    type: Number,
    default: 5,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:modelValue"]);

const handleTextareaInput = (event: Event) => {
  const input = event.target as HTMLTextAreaElement;
  const trimmedValue = input.value.slice(0, 250); // Trim the input value to 250 characters
  emits("update:modelValue", trimmedValue);
  if (input.value.length > 250) {
    input.value = trimmedValue; // Prevent further typing if the limit is reached
  }
};
</script>
