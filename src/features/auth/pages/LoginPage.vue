<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useForm } from 'vee-validate'
import { useLoginMutation } from '../composables/use-login-mutation'
import { loginSchema } from '../schemas/login-schema'
import { getErrorMessage } from '@/lib/error-handler'
import Button from '@/components/ui/Button.vue'
import {
  FormInput,
  FormPasswordInput,
} from '@/components/ui/form'

const loginMutation = useLoginMutation()
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
    <div class="w-full max-w-md space-y-8 bg-card/50 backdrop-blur-xl p-8 sm:p-10 border-x-0 sm:border-2 border-y-0 sm:border-white/5 rounded-none sm:rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-500 relative overflow-hidden group min-h-[calc(100vh-160px)] sm:min-h-0 flex flex-col justify-center">
      <!-- Decorative Background Shimmer -->
      <div class="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-primary/5 via-transparent to-transparent rotate-12 pointer-events-none"></div>

      <div class="text-center relative z-10">
        <h1 class="text-4xl font-black tracking-tighter uppercase font-serif italic mb-2">Login</h1>
        <p class="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em]">Acesse sua conta de Duelista</p>
      </div>

      <form @submit="onSubmit" class="space-y-6 relative z-10">
        <div v-if="loginError" class="p-4 bg-destructive/10 border-2 border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest rounded-lg animate-in slide-in-from-top-2">
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

        <Button type="submit" variant="gold" class="w-full h-12" :loading="loginIsPending">
          Entrar no Jogo
        </Button>
      </form>

      <div class="text-center text-xs relative z-10 pt-4 border-t border-white/5">
        <p class="text-muted-foreground font-medium">
          Ainda não possui uma conta? 
          <RouterLink to="/register" class="text-primary font-black uppercase tracking-tighter hover:underline px-1 transition-all">
            Registre-se Agora
          </RouterLink>
        </p>
      </div>

      <!-- Corner Accents -->
      <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl"></div>
      <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/20 rounded-br-2xl"></div>
    </div>
  </div>
</template>
