import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "@/composables/useToast";

import type { ICustomer } from "@/types";

export const useCustomerStore = defineStore("customer", () => {
  const showModal = ref(false);
  const router = useRouter();
  const customers = ref<ICustomer[]>([]);
  const customerForm = ref<ICustomer>({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    state: "",
    active: false,
    details: "",
  });

  const { showAlert, showConfirmation } = useToast();

  const isSaving = ref(false);

  function savecustomersToLocalStorage() {
    localStorage.setItem("customers", JSON.stringify(customers.value));
  }

  const createNew = (addcustomer?: boolean, customer?: ICustomer) => {
    addcustomer
      ? router.push(`/customer`)
      : router.push(`/customer/edit/${customer.id}`);
    if (customer) {
      customerForm.value = customer;
    } else {
      resetcustomerForm();
    }
  };

  const resetcustomerForm = () => {
    customerForm.value = {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      state: "",
      active: false,
      details: "",
    };
  };

  const saveCustomer = (isEditing?: boolean) => {
    isSaving.value = true;

    if (customerForm.value.id) {
      const customerIndex = customers.value.findIndex(
        (customer) => customer.id === customerForm.value.id
      );
      if (customerIndex !== -1) {
        customers.value[customerIndex] = {
          ...customers.value[customerIndex],
          ...customerForm.value,
          updatedAt: Date.now(),
        };
        showAlert("Customer updated successfully", "success");
      }
    } else {
      // Add new customer
      const newCustomer: ICustomer = {
        ...customerForm.value,
        id: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      customers.value.push(newCustomer);
      showAlert("New customer added successfully", "success");
    }

    savecustomersToLocalStorage();
    resetcustomerForm();
    sortByUpdatedAt();
    isSaving.value = false;

    if (!isEditing) {
      router.push(`/`);
    }
  };

  const deleteCustomer = async (customer: ICustomer) => {
    const result = await showConfirmation(
      "Are you sure?",
      "This action is irreversible"
    );
    if (result.isConfirmed) {
      const customerIndex = customers.value.findIndex(
        (n) => n.id === customer.id
      );
      if (customerIndex !== -1) {
        customers.value.splice(customerIndex, 1);
        savecustomersToLocalStorage();
        sortByUpdatedAt();
        showAlert("customer deleted successfully", "success");
      }
    }
  };

  const sortByUpdatedAt = () => {
    customers.value.sort((a, b) => b.updatedAt! - a.updatedAt!);
  };

  onMounted(() => {
    customers.value = JSON.parse(localStorage.getItem("customers") || "[]");
    sortByUpdatedAt();
  });

  return {
    showModal,
    customerForm,
    customers,
    isSaving,
    createNew,
    deleteCustomer,
    saveCustomer,
  };
});
