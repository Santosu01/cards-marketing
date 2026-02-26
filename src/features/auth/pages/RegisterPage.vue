<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useForm } from 'vee-validate'
import { useRegister } from '../composables/use-register'
import { useLogin } from '../composables/use-login'
import { registerSchema } from '../schemas/register-schema'
import { getErrorMessage } from '@/lib/error-handler'
import Button from '@/components/ui/Button.vue'
import { FormInput, FormPasswordInput } from '@/components/ui/form'

const router = useRouter()
const registerMutation = useRegister()
const loginMutation = useLogin('/my-cards')

const successMessage = ref('')
const registerError = computed(() => registerMutation.error.value)
const registerIsPending = computed(
  () => registerMutation.isPending.value || loginMutation.isPending.value,
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: registerSchema,
})

const makeLogin = (email: string, password: string) => {
  loginMutation.mutate(
    {
      email,
      password,
    },
    {
      onSuccess: () => {
        resetForm()
      },
      onError: (error) => {
        console.error('Auto-login failed after registration:', error)
        resetForm()
        router.push('/login')
      },
    },
  )
}

const onSubmit = handleSubmit((values) => {
  registerMutation.mutate(values, {
    onSuccess: () => {
      successMessage.value = 'Inscrit de Duelista criado com sucesso! Iniciando sua jornada...'
      makeLogin(values.email, values.password)
    },
  })
})
</script>

<template>
  <div class="flex min-h-[calc(100vh-160px)] items-center justify-center p-0 sm:p-4">
    <div
      class="bg-card/50 animate-in fade-in zoom-in group relative flex min-h-[calc(100vh-160px)] w-full max-w-md flex-col justify-center space-y-8 overflow-hidden rounded-none border-x-0 border-y-0 p-8 shadow-2xl backdrop-blur-xl duration-500 sm:min-h-0 sm:rounded-2xl sm:border-2 sm:border-white/5 sm:p-10"
    >
      <!-- Decorative Background Shimmer -->
      <div
        class="from-primary/5 pointer-events-none absolute -top-[50%] -left-[50%] h-[200%] w-[200%] rotate-12 bg-gradient-to-br via-transparent to-transparent"
      ></div>

      <div class="relative z-10 text-center">
        <h1 class="mb-2 font-serif text-4xl font-black tracking-tighter uppercase italic">
          Criar Conta
        </h1>
        <p class="text-muted-foreground text-xs font-bold tracking-[0.2em] uppercase">
          Inicie sua jornada lendária
        </p>
      </div>

      <form @submit="onSubmit" class="relative z-10 space-y-5">
        <div
          v-if="registerError"
          class="bg-destructive/10 border-destructive/20 text-destructive animate-in slide-in-from-top-2 rounded-lg border-2 p-4 text-[10px] font-black tracking-widest uppercase"
        >
          {{ getErrorMessage(registerError) }}
        </div>

        <div
          v-if="successMessage"
          class="bg-primary/10 border-primary/20 text-primary animate-in slide-in-from-top-2 rounded-lg border-2 p-4 text-[10px] font-black tracking-widest uppercase"
        >
          {{ successMessage }}
        </div>

        <FormInput
          name="name"
          label="Nome do Duelista"
          placeholder="Yugi Muto"
          :disabled="!!registerIsPending"
        />

        <FormInput
          name="email"
          label="E-mail de Cadastro"
          placeholder="exemplo@inmeta.com"
          :disabled="!!registerIsPending"
        />

        <FormPasswordInput
          name="password"
          label="Senha Secreta"
          placeholder="••••••••"
          :disabled="!!registerIsPending"
        />

        <Button type="submit" variant="gold" class="mt-2 h-12 w-full" :loading="registerIsPending">
          Registrar e Jogar
        </Button>
      </form>

      <div class="relative z-10 border-t border-white/5 pt-4 text-center text-xs">
        <p class="text-muted-foreground font-medium">
          Já faz parte da guilda?
          <RouterLink
            to="/login"
            class="text-primary px-1 font-black tracking-tighter uppercase transition-all hover:underline"
          >
            Entrar Agora
          </RouterLink>
        </p>
      </div>

      <!-- Corner Accents -->
      <div
        class="border-primary/20 absolute top-0 right-0 h-8 w-8 rounded-tr-2xl border-t-2 border-r-2"
      ></div>
      <div
        class="border-primary/20 absolute bottom-0 left-0 h-8 w-8 rounded-bl-2xl border-b-2 border-l-2"
      ></div>
    </div>
  </div>
</template>
