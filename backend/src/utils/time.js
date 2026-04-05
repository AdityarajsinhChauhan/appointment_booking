const convertToIST = (date) => {
  return new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: false
  });
};

module.exports = { convertToIST };