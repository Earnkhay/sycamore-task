<template>
  <div>
    <label
      v-if="label"
      class="block text-base lg:text-xl font-semibold text-wine mb-4"
      >{{ label }}</label
    >
    <QuillEditor
      v-model:content="customerForm.details"
      contentType="html"
      theme="snow"
      style="height: 250px"
    />
  </div>
</template>

<script setup lang="ts">
import { useCustomerStore } from "@/stores/customers";
import { storeToRefs } from "pinia";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

defineProps({
  label: {
    type: String,
    required: false,
  },
});
const customerstore = useCustomerStore();

const { customerForm } = storeToRefs(customerstore);
</script>
