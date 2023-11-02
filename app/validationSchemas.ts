import { z } from 'zod'

export const UserSchema = z.object({
  name: z
    .string({
      required_error: 'Vous devez saisir un prenom',
      invalid_type_error: 'Le prenom doit etre une chaine de caracteres',
    })
    .min(3, { message: 'Trop court!' })
    .max(50, { message: 'Trop long!' })
    .trim()
    .toLowerCase(),
  password: z
    .string({
      required_error: 'Vous devez saisir un mot de passe',
    })
    .min(2, { message: 'Trop court!' })
    .max(50, { message: 'Trop long!' }),
})
//-------------------------------------------------------------------------
enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export const PatientSchema = z.object({
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
    .min(new Date('1900-01-01'), { message: 'Noah ou qui?!!!' })
    .max(new Date(), { message: 'Trop jeune!' }),

  email: z
    .string({
      required_error: 'Vous devez saisir une adresse email',
      invalid_type_error: 'Adresse email non valide ',
    })
    .email({ message: 'Invalid email address' }),
  phone: z.string().min(9).max(10),
  gender: z.nativeEnum(Gender),
  address: z.string(),
  medicalHistory: z.string(),
})
//-------------------------------------------------------------------------------
export const ClinicalCaseSchema = z.object({
  title: z
    .string({
      required_error: 'Vous devez saisir un prenom',
      invalid_type_error: 'Le titre doit etre une chaine de caracteres',
    })
    .min(3, { message: 'Trop court!' })
    .max(50, { message: 'Trop long!' })
    .trim()
    .toLowerCase(),
  cost: z.coerce.number({
    required_error: 'Vous devez saisir une nombre',
    invalid_type_error: 'le cout doit etre un nombre ',
  }),
  patientId: z.string(),
})
//---------------------------------------------------------------------------
export const PaymentSchema = z.object({
  value: z.coerce.number({
    required_error: 'Vous devez saisir une nombre',
    invalid_type_error: 'le cout doit etre un nombre ',
  }),
  clinicalCaseId: z.string(),
})
