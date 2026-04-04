export const formatTimeRange = (start,end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const startTime = startDate.toLocaleTimeString([], options);
  const endTime = endDate.toLocaleTimeString([], options);

  return `${startTime} to ${endTime}`;
}

export const formatDate = (start) => {
  const date = new Date(start);

  return date.toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};