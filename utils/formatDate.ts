function formatDate(date: string) {
  const dateParts = date.split('-');
  return new Date(
    Number(dateParts[2]),
    Number(dateParts[1]),
    Number(dateParts[0])
  ).toDateString();
}

export default formatDate;
