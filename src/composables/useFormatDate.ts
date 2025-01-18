export function useFormatDate() {
  const formatDate = (timestamp: number | undefined) => {
    if (!timestamp) {
      return;
    }
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return { formatDate };
}
