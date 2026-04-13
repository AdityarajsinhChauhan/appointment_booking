const today = new Date();

const formatted = today.toLocaleDateString("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default formatted;