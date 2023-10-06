import { z } from 'zod'

const schema = z.object({
  firstname: z.string().min(3, {
    message: 'prenom trop court',
  }),
  lastname: z.string().min(3, {
    message: 'Nom trop court',
  }),
})

export default schema
