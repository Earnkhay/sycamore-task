<template>
  <main class="container mx-auto px-6 py-8 max-w-screen-sm">
    <div
      class="text-wine text-2xl sm:text-3xl xl:text-medium my-4 sm:my-8 sm:text-nowrap flex items-center gap-2"
    >
      <span class="material-symbols-outlined text-4xl"> person_add </span>
      <h1 class="font-bold">Edit customer</h1>
    </div>

    <CustomersForm @save="customerStore.saveCustomer" />
  </main>
</template>

<script setup lang="ts">
import CustomersForm from "@/components/CustomersForm.vue";
import { useCustomerStore } from "@/stores/customers";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
const route = useRoute();
const customerId = route.params.id;

const customerStore = useCustomerStore();
const { customerForm, isSaving } = storeToRefs(customerStore);

onMounted(() => {
  const customers = JSON.parse(localStorage.getItem("customers") || "[]");
  const customer = customers.find((c: any) => c.id == customerId);

  if (customer) {
    customerForm.value = { ...customer };
  }
});
</script>
