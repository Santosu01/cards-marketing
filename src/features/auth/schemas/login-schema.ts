import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const loginRawSchema = zod.object({
  email: zod.string().email('E-mail inválido').min(1, 'E-mail é obrigatório'),
  password: zod.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export const loginSchema = toTypedSchema(loginRawSchema)

export type LoginFormValues = zod.infer<typeof loginRawSchema>
