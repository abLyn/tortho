// calculate age --------------------------------------------
export const age = (date: string) => {
  const dob = new Date(date)
  const diff_ms = Date.now() - dob.getTime()
  const age_dt = new Date(diff_ms)

  return Math.abs(age_dt.getUTCFullYear() - 1970)
}

// capitalize 1st letter of a string ------------------------
export const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

// format Date -----------------------------------------------

export const formatDate = (date: Date) => {
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()

  return day + ' ' + month
}

//avatar patient ---------------------------------------------

export const avatarPatient = (patient: any) => {
  let avatar = ''
  const agePatient = age(patient.dob)
  if (agePatient < 5) {
    avatar =
      patient.gender === 'Male'
        ? '/assets/patientavatar/1.svg'
        : '/assets/patientavatar/2.svg'
  }
  if (agePatient >= 5 && agePatient <= 12) {
    avatar =
      patient.gender === 'Male'
        ? '/assets/patientavatar/3.svg'
        : '/assets/patientavatar/4.svg'
  }
  if (agePatient >= 13 && agePatient <= 30) {
    avatar =
      patient.gender === 'Male'
        ? '/assets/patientavatar/5.svg'
        : '/assets/patientavatar/6.svg'
  }
  if (agePatient >= 30 && agePatient <= 59) {
    avatar =
      patient.gender === 'Male'
        ? '/assets/patientavatar/7.svg'
        : '/assets/patientavatar/8.svg'
  }
  if (agePatient >= 60) {
    avatar =
      patient.gender === 'Male'
        ? '/assets/patientavatar/9.svg'
        : '/assets/patientavatar/10.svg'
  }
  return avatar
}
