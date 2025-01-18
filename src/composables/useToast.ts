import Swal, { type SweetAlertIcon } from "sweetalert2";

export function useToast() {
  // Basic alert
  const showAlert = (title: string, icon: SweetAlertIcon, text?: string) => {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    }).fire({
      title,
      text,
      icon,
    });
  };

  // Confirmation Alert
  const showConfirmation = (
    title: string,
    text: string,
    confirmButtonText: string = "Yes",
    cancelButtonText: string = "Cancel"
  ) => {
    return Swal.fire({
      title,
      text,
      icon: "error",
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      buttonsStyling: false,
      reverseButtons: true,
      customClass: {
        cancelButton:
          "btn text-black px-12 py-2 bg-transparent hover:bg-transparent hover:text-grey-400 mr-2 sm:mr-6",
        confirmButton: "btn bg-orange text-white px-12 py-2",
      },
    });
  };

  return {
    showAlert,
    showConfirmation,
  };
}
