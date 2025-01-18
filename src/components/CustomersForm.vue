<template>
  <main class="container" style="max-width: 800px">
    <section class="flex flex-col gap-6 mb-8">
      <div class="grid sm:grid-cols-2 gap-4">
        <SycamoreInput
          v-model="customerForm.firstName"
          label="First Name"
          type="text"
          :error="v$.customerForm.firstName.$errors[0]?.$message"
          @focus="v$.customerForm.firstName.$touch"
          required
        />

        <SycamoreInput
          v-model="customerForm.lastName"
          label="Last Name"
          type="text"
          :error="v$.customerForm.lastName.$errors[0]?.$message"
          @focus="v$.customerForm.lastName.$touch"
          required
        />
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        <SycamoreInput
          v-model="customerForm.email"
          label="Email"
          type="text"
          :error="v$.customerForm.email.$errors[0]?.$message"
          @focus="v$.customerForm.email.$touch"
          required
        />
        <SycamoreInput
          v-model="customerForm.number"
          label="Phone Number"
          type="number"
          :error="v$.customerForm.number.$errors[0]?.$message"
          @focus="v$.customerForm.number.$touch"
          required
        />
      </div>

      <SycamoreSelect
        v-model="customerForm.state"
        label="State (Nigeria)"
        :options="states"
        required
      />

      <!-- Active Checkbox -->
      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          v-model="customerForm.active"
          id="active"
          class="checkbox"
        />
        <label for="active">Set to Active</label>
      </div>

      <SycamoreInputEditor label="Customer's details" />
      <div>
        <SycamoreButton
          class="flex items-center gap-1 group btn-disabled"
          :disabled="
            (!customerForm.id && !v$.customerForm.$anyDirty) ||
            !!v$.customerForm.$invalid
          "
          @click="emit('save')"
        >
          <Spinner v-if="isSaving" />
          Submit
        </SycamoreButton>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useCustomerStore } from "@/stores/customers";
import { storeToRefs } from "pinia";
import Spinner from "./UI/Spinner.vue";
import SycamoreButton from "./UI/SycamoreButton.vue";
import SycamoreInput from "./UI/SycamoreInput.vue";
import SycamoreSelect from "./UI/SycamoreSelect.vue";
import SycamoreInputEditor from "./UI/SycamoreInputEditor.vue";
import states from "@/states.json";
import { useCustomerValidations } from "@/composables/useValidation";

const { v$ } = useCustomerValidations();

const emit = defineEmits(["save"]);
const customerStore = useCustomerStore();
const { customerForm, isSaving } = storeToRefs(customerStore);
</script>
