export const formatTimeRange = (start, end) => {
  if (!start || !end) return "Invalid time";

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return "Invalid time";
  }

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  };

  const startTime = startDate.toLocaleTimeString("en-IN", options);
  const endTime = endDate.toLocaleTimeString("en-IN", options);

  return `${startTime} to ${endTime}`;
};

export const formatDate = (start) => {
  const date = new Date(start);

  return date.toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};