<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useForm } from 'vee-validate'
import { useRegisterMutation } from '../composables/use-register-mutation'
import { useLoginMutation } from '../composables/use-login-mutation'
import { registerSchema } from '../schemas/register-schema'
import { getErrorMessage } from '@/lib/error-handler'
import Button from '@/components/ui/Button.vue'
import {
  FormInput,
  FormPasswordInput,
} from '@/components/ui/form'

const router = useRouter()
const registerMutation = useRegisterMutation()
const loginMutation = useLoginMutation('/my-cards')

const successMessage = ref('')
const registerError = computed(() => registerMutation.error.value)
const registerIsPending = computed(() => registerMutation.isPending.value || loginMutation.isPending.value)

const { handleSubmit, resetForm } = useForm({
  validationSchema: registerSchema,
})

const makeLogin = async (email: string, password: string) => {
  await loginMutation.mutateAsync({
    email,
    password
  }, {
    onSuccess: () => {
      resetForm()
    },
    onError: (error) => {
      console.error('Auto-login failed after registration:', error)
      resetForm()
      router.push('/login')
    }
  })
}

const onSubmit = handleSubmit(async (values) => {
  await registerMutation.mutateAsync(values, {
    onSuccess: async () => {
      successMessage.value = 'Inscrit de Duelista criado com sucesso! Iniciando sua jornada...'
      makeLogin(values.email, values.password)
    }
  })
})
</script>

<template>
  <div class="flex min-h-[calc(100vh-160px)] items-center justify-center p-0 sm:p-4">
    <div
      class="w-full max-w-md space-y-8 bg-card/50 backdrop-blur-xl p-8 sm:p-10 border-x-0 sm:border-2 border-y-0 sm:border-white/5 rounded-none sm:rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-500 relative overflow-hidden group min-h-[calc(100vh-160px)] sm:min-h-0 flex flex-col justify-center">
      <!-- Decorative Background Shimmer -->
      <div
        class="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-primary/5 via-transparent to-transparent rotate-12 pointer-events-none">
      </div>

      <div class="text-center relative z-10">
        <h1 class="text-4xl font-black tracking-tighter uppercase font-serif italic mb-2">Criar Conta</h1>
        <p class="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em]">Inicie sua jornada lendária</p>
      </div>

      <form @submit="onSubmit" class="space-y-5 relative z-10">
        <div v-if="registerError"
          class="p-4 bg-destructive/10 border-2 border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest rounded-lg animate-in slide-in-from-top-2">
          {{ getErrorMessage(registerError) }}
        </div>

        <div v-if="successMessage"
          class="p-4 bg-primary/10 border-2 border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg animate-in slide-in-from-top-2">
          {{ successMessage }}
        </div>

        <FormInput name="name" label="Nome do Duelista" placeholder="Yugi Muto" :disabled="!!registerIsPending" />

        <FormInput name="email" label="E-mail de Cadastro" placeholder="exemplo@inmeta.com"
          :disabled="!!registerIsPending" />

        <FormPasswordInput name="password" label="Senha Secreta" placeholder="••••••••"
          :disabled="!!registerIsPending" />

        <Button type="submit" variant="gold" class="w-full h-12 mt-2" :loading="registerIsPending">
          Registrar e Jogar
        </Button>
      </form>

      <div class="text-center text-xs relative z-10 pt-4 border-t border-white/5">
        <p class="text-muted-foreground font-medium">
          Já faz parte da guilda?
          <RouterLink to="/login"
            class="text-primary font-black uppercase tracking-tighter hover:underline px-1 transition-all">
            Entrar Agora
          </RouterLink>
        </p>
      </div>

      <!-- Corner Accents -->
      <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-2xl"></div>
      <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/20 rounded-bl-2xl"></div>
    </div>
  </div>
</template>
