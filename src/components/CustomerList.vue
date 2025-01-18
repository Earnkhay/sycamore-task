<template>
  <main class="px-8 sm:px-24 py-10">
    <section v-if="customers.length">
      <div class="flex justify-between my-8">
        <div class="text-wine text-2xl sm:text-medium sm:text-nowrap">
          <h1 class="font-bold">All customers</h1>
        </div>
        <div class="w-28">
          <SycamoreSelect v-model="selectedState" :options="selectOptions" />
        </div>
      </div>
      <div>
        <div class="bg-white p-3 border container flex items-center">
          <SycamoreInput
            v-model="searchQuery"
            placeholder="Search by name, number, state, or status"
            type="text"
          />
        </div>
        <SycamoreTable :headers="tableHeaders" style="min-height: 100vh">
          <template v-if="filteredCustomers.length">
            <tr v-for="(customer, id) in filteredCustomers" :key="id">
              <td>
                <span
                  class="table-data hover:text-orange-dark cursor-pointer hover:underline"
                >
                  <router-link :to="`/customer/${customer.id}`">
                    {{ capitalizeFirstLetter(customer.firstName) }}
                    {{ capitalizeFirstLetter(customer.lastName) }}
                  </router-link>
                </span>
              </td>
              <td>
                <span class="table-data">
                  {{ customer.email }}
                </span>
              </td>
              <td>
                <span class="table-data">
                  {{ formatDate(customer.createdAt) }}
                </span>
              </td>
              <td>
                <span class="table-data">
                  {{ customer.number }}
                </span>
              </td>
              <td>
                <span class="table-data">
                  {{ customer.state }}
                </span>
              </td>
              <td>
                <span
                  :class="getStatusColor(customer.active)"
                  class="px-4 py-2 text-base lg:text-xl font-medium whitespace-nowrap"
                >
                  {{ customer.active ? "Active" : "Inactive" }}
                </span>
              </td>
              <td>
                <span class="px-6 py-2">
                  <SycamoreDropdown v-model="selected" class="cursor-pointer">
                    <li
                      @click="navigateToCustomerDetail(customer.id)"
                      class="drop-list text-gray-700"
                    >
                      <span> View </span>
                    </li>
                    <li
                      @click="customerStore.createNew(false, customer)"
                      class="drop-list text-gray-700"
                    >
                      <span> Edit </span>
                    </li>

                    <li
                      @click="customerStore.deleteCustomer(customer)"
                      class="drop-list text-red-500"
                    >
                      <span> Delete </span>
                    </li>
                  </SycamoreDropdown>
                </span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="8">
                <EmptyState
                  ><h2 class="text-xl text-wine font-semibold">
                    No customer found with that filter. Please try again
                  </h2>
                </EmptyState>
              </td>
            </tr>
          </template>
        </SycamoreTable>
      </div>
    </section>

    <!-- Empty State for No customers Found -->
    <EmptyState @action="customerStore.createNew(true)" v-else />
  </main>
</template>

<script setup lang="ts">
import { useFormatDate } from "@/composables/useFormatDate";
import { useTextFormat } from "@/composables/useTextFormat";
import { useCustomerStore } from "@/stores/customers";
import type { ICustomer } from "@/types";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import EmptyState from "./EmptyState.vue";
import SycamoreInput from "./UI/SycamoreInput.vue";
import SycamoreTable from "./UI/SycamoreTable.vue";
import SycamoreDropdown from "./UI/SycamoreDropdown.vue";
import SycamoreSelect from "./UI/SycamoreSelect.vue";

const customerStore = useCustomerStore();
const { customers } = storeToRefs(customerStore);

const { formatDate } = useFormatDate();
const { capitalizeFirstLetter, getStatusColor } = useTextFormat();

const router = useRouter();
const selectedState = ref("");
const selected = ref();
const searchQuery = ref("");
const tableHeaders = ref([
  "Name",
  "Email",
  "Date",
  "Phone",
  "State",
  "Status",
  "Actions",
]);

// Filter customers based on search query using title
const filteredCustomers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const state = selectedState.value;

  return customers.value.filter((customer: ICustomer) => {
    const matchesQuery =
      customer.email.toLowerCase().includes(query) ||
      customer.firstName.toLowerCase().includes(query) ||
      customer.lastName.toLowerCase().includes(query) ||
      customer.number?.toString().includes(query) ||
      customer.state?.toLowerCase().includes(query);

    const matchesState = !state || customer.active.toString() === state; // Match only if a state is selected

    return matchesQuery && matchesState;
  });
});

const navigateToCustomerDetail = (customerId: number | null) => {
  router.push(`/customer/${customerId}`);
};

const selectOptions = [
  { name: "All", value: "" },
  { name: "Active", value: "true" },
  { name: "Inactive", value: "false" },
];
</script>

<style scoped>
td {
  padding: 10px 0;
}
</style>
