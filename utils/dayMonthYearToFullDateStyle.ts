function dayMonthYearToFullDateStyle(
  date: string,
  style?: 'full' | 'long' | 'medium' | 'short'
) {
  const dateParts = date.split('-');
  const newDate = new Date(
    parseInt(dateParts[2]),
    // It's bizarre to me that Javascript uses
    // zero-based indexing for months,
    // so yeah had to adapt here
    parseInt(dateParts[1]) - 1,
    parseInt(dateParts[0])
  );
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: style || 'full'
  }).format(newDate);
}
export default dayMonthYearToFullDateStyle;
