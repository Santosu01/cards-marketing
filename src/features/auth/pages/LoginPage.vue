<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useForm } from 'vee-validate'
import { useLogin } from '../composables/use-login'
import { loginSchema } from '../schemas/login-schema'
import { getErrorMessage } from '@/lib/error-handler'
import Button from '@/components/ui/Button.vue'
import { FormInput, FormPasswordInput } from '@/components/ui/form'

const loginMutation = useLogin()
const loginError = computed(() => loginMutation.error.value)
const loginIsPending = computed(() => loginMutation.isPending.value)

const { handleSubmit } = useForm({
  validationSchema: loginSchema,
})

const onSubmit = handleSubmit((values) => {
  loginMutation.mutate(values)
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
        <h1 class="mb-2 font-serif text-4xl font-black tracking-tighter uppercase italic">Login</h1>
        <p class="text-muted-foreground text-xs font-bold tracking-[0.2em] uppercase">
          Acesse sua conta de Duelista
        </p>
      </div>

      <form @submit="onSubmit" class="relative z-10 space-y-6">
        <div
          v-if="loginError"
          class="bg-destructive/10 border-destructive/20 text-destructive animate-in slide-in-from-top-2 rounded-lg border-2 p-4 text-[10px] font-black tracking-widest uppercase"
        >
          {{ getErrorMessage(loginError) }}
        </div>

        <FormInput
          name="email"
          label="E-mail de Cadastro"
          placeholder="exemplo@inmeta.com"
          :disabled="!!loginIsPending"
        />

        <FormPasswordInput
          name="password"
          label="Senha de Acesso"
          placeholder="••••••••"
          :disabled="!!loginIsPending"
        />

        <Button type="submit" variant="gold" class="h-12 w-full" :loading="loginIsPending">
          Entrar no Jogo
        </Button>
      </form>

      <div class="relative z-10 border-t border-white/5 pt-4 text-center text-xs">
        <p class="text-muted-foreground font-medium">
          Ainda não possui uma conta?
          <RouterLink
            to="/register"
            class="text-primary px-1 font-black tracking-tighter uppercase transition-all hover:underline"
          >
            Registre-se Agora
          </RouterLink>
        </p>
      </div>

      <!-- Corner Accents -->
      <div
        class="border-primary/20 absolute top-0 left-0 h-8 w-8 rounded-tl-2xl border-t-2 border-l-2"
      ></div>
      <div
        class="border-primary/20 absolute right-0 bottom-0 h-8 w-8 rounded-br-2xl border-r-2 border-b-2"
      ></div>
    </div>
  </div>
</template>
