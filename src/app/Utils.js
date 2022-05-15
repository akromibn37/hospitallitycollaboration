export default function compareDate(event) {
  const now = new Date();
  let endDate = new Date(Date.parse(event.end_date));
  endDate = endDate.setDate(endDate.getDate() + 1);
  if (now >= Date.parse(event.start_date) && now < endDate) {
    return true;
  }
  return false;
}

export function convertDateString(dateValue) {
  if (dateValue !== null) {
    return new Date(`${dateValue}EDT`).toISOString().split('T')[0];
  }
  return null;
}
