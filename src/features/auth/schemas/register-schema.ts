import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const registerRawSchema = zod.object({
  name: zod
    .string({ required_error: 'Nome é obrigatório' })
    .min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: zod.string({ required_error: 'E-mail é obrigatório' }).email('E-mail inválido'),
  password: zod
    .string({ required_error: 'Senha é obrigatória' })
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial'),
})

export const registerSchema = toTypedSchema(registerRawSchema)

export type RegisterFormValues = zod.infer<typeof registerRawSchema>
