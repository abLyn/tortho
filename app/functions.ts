// calculate age
export const age = (date: string) => {
  const dob = new Date(date)
  const diff_ms = Date.now() - dob.getTime()
  const age_dt = new Date(diff_ms)

  return Math.abs(age_dt.getUTCFullYear() - 1970)
}
// capitalize 1st letter of a string
export const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
