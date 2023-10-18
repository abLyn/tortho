import { z } from 'zod'

export const createPatientSchema = z.object({
  firstname: z
    .string({
      required_error: 'Vous devez saisir un prenom',
      invalid_type_error: 'Le prenom doit etre une chaine de caracteres',
    })
    .min(3, { message: 'Trop court!' })
    .max(50, { message: 'Trop long!' })
    .trim()
    .toLowerCase(),

  lastname: z
    .string({
      required_error: 'Vous devez saisir un nom',
      invalid_type_error: 'Le nom doit etre une chaine de caracteres',
    })
    .min(3, { message: 'Trop court!' })
    .max(50, { message: 'Trop long!' })
    .trim()
    .toLowerCase(),

  dob: z.coerce
    .date({
      required_error: 'Vous devez saisir une date de naissance',
      invalid_type_error: 'Date non valide',
    })
    .min(new Date('1923-01-01'), { message: 'Trop vieux!' })
    .max(new Date(), { message: 'Trop jeune!' }),

  email: z
    .string({
      required_error: 'Vous devez saisir une adresse email',
      invalid_type_error: 'Adresse email non valide ',
    })
    .email({ message: 'Invalid email address' }),
  phone: z.string().min(9).max(10),
  gender: z.string(),
  address: z.string(),
  medicalHistory: z.string(),
})