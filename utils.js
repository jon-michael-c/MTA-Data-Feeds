function formatTimeShow(time) {
  var h = h_24 % 12;
  if (h === 0) h = 12;
  return (h < 10 ? "0" : "") + h + ":00" + (h_24 < 12 ? "am" : "pm");
}
