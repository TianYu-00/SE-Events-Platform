export function dateFormatter(isoDateTime, format = 0) {
  if (!isoDateTime || isNaN(new Date(isoDateTime))) {
    return "Invalid";
  }

  const dateTime = new Date(isoDateTime);

  const formatDate = (options) => dateTime.toLocaleDateString("en-GB", options);
  const formatTime = (options) => dateTime.toLocaleTimeString("en-GB", options);

  switch (format) {
    case 0:
      return formatTime({ hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
    case 1:
      return formatDate({ year: "numeric", month: "long", day: "2-digit" });
    case 2:
      return formatDate({ year: "numeric", month: "numeric", day: "2-digit" });
    case 3:
      return `${formatDate({ year: "numeric", month: "2-digit", day: "2-digit" })} ${formatTime({
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`;
    case 4:
      return `${formatDate({ year: "numeric", month: "long", day: "2-digit" })} ${formatTime({
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`;
    default:
      return "Invalid";
  }
}
