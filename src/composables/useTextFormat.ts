export function useTextFormat() {
  // const statusLabels = {
  //   "to-do": "To do",
  //   "in-progress": "In progress",
  //   completed: "Completed",
  // };
  // const getStatusLabel = (status?: string) => {
  //   return statusLabels[status as keyof typeof statusLabels];
  // };

  const getStatusColor = (status: boolean) => {
    switch (status) {
      case false:
        return "text-red-500";
      case true:
        return "text-green";
      default:
        return "text-black";
    }
  };

  const capitalizeFirstLetter = (str: string | undefined): string => {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      return "-";
    }
  };

  return { capitalizeFirstLetter, getStatusColor };
}
