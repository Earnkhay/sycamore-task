import { useCustomerStore } from "@/stores/customers";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, email } from "@vuelidate/validators";
import { storeToRefs } from "pinia";

export function useCustomerValidations() {
  const customerStore = useCustomerStore();
  const { customerForm } = storeToRefs(customerStore);

  const rules = {
    customerForm: {
      firstName: { required, minLength: minLength(3) },
      lastName: { required, minLength: minLength(4) },
      email: { required, email },
      number: { required, minLength: minLength(10), maxLength: maxLength(11) },
      state: { required },
      details: { required },
    },
  };

  const v$ = useVuelidate(rules, { customerForm: customerForm });

  return {
    v$,
  };
}
