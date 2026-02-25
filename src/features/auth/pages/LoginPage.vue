<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useForm } from 'vee-validate'
import { useLoginMutation } from '../composables/use-login-mutation'
import { loginSchema } from '../schemas/login-schema'
import { getErrorMessage } from '@/lib/error-handler'
import Button from '@/components/ui/Button.vue'
import {
  FormInput,
} from '@/components/ui/form'

const loginMutation = useLoginMutation()

const { handleSubmit } = useForm({
  validationSchema: loginSchema,
})

const onSubmit = handleSubmit((values) => {
  loginMutation.mutate(values)
})
</script>

<template>
  <div class="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-muted/40">
    <div class="w-full max-w-md space-y-8 bg-card p-8 border rounded-xl shadow-lg animate-in fade-in zoom-in duration-300">
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight">Bem-vindo de volta</h1>
        <p class="text-muted-foreground mt-2">Insira suas credenciais para acessar sua conta</p>
      </div>

      <form @submit="onSubmit" class="space-y-4">
        <div v-if="loginMutation.error" class="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md">
          {{ getErrorMessage(loginMutation.error) }}
        </div>

        <FormInput 
          name="email" 
          label="E-mail" 
          placeholder="exemplo@teste.com" 
          :disabled="!!loginMutation.isPending" 
        />

        <FormInput 
          name="password" 
          label="Senha" 
          type="password" 
          placeholder="••••••••" 
          :disabled="!!loginMutation.isPending" 
        />

        <Button type="submit" class="w-full" :loading="!!loginMutation.isPending">
          Entrar
        </Button>
      </form>

      <div class="text-center text-sm">
        <p class="text-muted-foreground">
          Não tem uma conta? 
          <RouterLink to="/register" class="text-primary font-medium hover:underline">
            Registre-se agora
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
