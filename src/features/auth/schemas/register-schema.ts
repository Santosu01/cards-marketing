import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const registerRawSchema = zod.object({
  name: zod.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: zod.string().email('E-mail inválido'),
  password: zod.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export const registerSchema = toTypedSchema(registerRawSchema)

export type RegisterFormValues = zod.infer<typeof registerRawSchema>
