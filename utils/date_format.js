function formatDateString(date) {
  /** Takes a 8 digit string in format ddmmyyyy and returns it as a dd/mm/yyyy date format
   * @param {string} date - The unformatted date-string
  */
  const formattedDate = `${date.slice(0, 2)}/${date.slice(2, 4)}/${date.slice(4, 8)}`;
  return formattedDate;
}

export { formatDateString };
