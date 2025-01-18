<template>
  <main class="px-4 md:px-8 lg:px-60 py-8 md:py-16">
    <h1
      class="text-wine text-lg md:text-xl lg:text-semi-medium xl:text-large font-bold mb-4 md:mb-6"
    >
      Customer Details
    </h1>
    <SycamoreCard v-if="!edit" class="max-w-screen-2xl">
      <section
        v-if="customer?.id"
        class="flex flex-col gap-4 md:gap-8 px-4 md:px-8 py-4 md:py-8"
      >
        <!-- Name Section -->
        <div>
          <h2 class="text-lg md:text-xl font-semibold">Name:</h2>
          <p class="text-base md:text-lg text-gray-600">
            {{ capitalizeFirstLetter(customer.firstName) }}
            {{ capitalizeFirstLetter(customer.lastName) }}
          </p>
        </div>
        <div>
          <h2 class="text-lg md:text-xl font-semibold">Email:</h2>
          <p class="text-base md:text-lg text-gray-600">
            {{ capitalizeFirstLetter(customer.email) }}
          </p>
        </div>
        <div>
          <h2 class="text-lg md:text-xl font-semibold">Phone Number:</h2>
          <p class="text-base md:text-lg text-gray-600">
            {{ capitalizeFirstLetter(customer.number) }}
          </p>
        </div>
        <div>
          <h2 class="text-lg md:text-xl font-semibold">State:</h2>
          <p class="text-base md:text-lg text-gray-600">
            {{ capitalizeFirstLetter(customer.state) }}
          </p>
        </div>

        <!-- Details Section -->
        <div>
          <h2 class="text-lg md:text-xl font-semibold">Details:</h2>
          <div v-html="customer.details"></div>
        </div>

        <!-- Status Section -->
        <div>
          <h2 class="text-lg md:text-xl font-semibold">Status:</h2>
          <span
            :class="getStatusColor(customer.active)"
            class="px-3 py-2 rounded-full text-sm md:text-base"
          >
            {{ customer.active ? "Active" : "Inactive" }}
          </span>
        </div>

        <!-- Edit Button -->
        <SycamoreButton
          class="flex justify-center gap-2 w-full md:w-1/4"
          @click="editCustomer"
        >
          <span class="material-symbols-outlined">edit</span> Edit
        </SycamoreButton>
      </section>

      <!-- Loading Spinner -->
      <div v-else class="text-center">
        <Spinner color="text-orange" class="text-3xl md:text-5xl" />
        <p class="mt-2">Loading...</p>
      </div>
    </SycamoreCard>

    <!-- Form for editing the customer -->
    <CustomersForm @save="saveCustomer" v-else />
  </main>
</template>

<script setup lang="ts">
import CustomersForm from "@/components/CustomersForm.vue";
import Spinner from "@/components/UI/Spinner.vue";
import SycamoreButton from "@/components/UI/SycamoreButton.vue";
import SycamoreCard from "@/components/UI/SycamoreCard.vue";
import { useTextFormat } from "@/composables/useTextFormat";
import { useCustomerStore } from "@/stores/customers";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const { capitalizeFirstLetter, getStatusColor } = useTextFormat();

const route = useRoute();
const router = useRouter();
const store = useCustomerStore();
const { customers } = storeToRefs(store);

const edit = ref(false);

const customerId = ref(route.params.id);

// Fetch customer data from the store based on customerId
const customer = computed(() =>
  customers.value.find((p: { id: number }) => p.id === Number(customerId.value))
);

const editCustomer = () => {
  store.createNew(false, customer.value);
  edit.value = true;
};

const saveCustomer = () => {
  store.saveCustomer(true);
  edit.value = false;
};

onMounted(() => {
  setTimeout(() => {
    if (!customers.value) {
      router.push("/404");
    }
  }, 1000);
});
</script>
