import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const loginRawSchema = zod.object({
  email: zod.string({ required_error: 'E-mail é obrigatório' }).email('E-mail inválido'),
  password: zod
    .string({ required_error: 'Senha é obrigatória' })
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export const loginSchema = toTypedSchema(loginRawSchema)

export type LoginFormValues = zod.infer<typeof loginRawSchema>
