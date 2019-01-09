export const daysInPreviousMonth = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 0).getDate()
}