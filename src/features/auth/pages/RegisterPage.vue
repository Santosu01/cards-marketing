<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useForm } from 'vee-validate'
import { useRegisterMutation } from '../composables/use-register-mutation'
import { registerSchema } from '../schemas/register-schema'
import { getErrorMessage } from '@/lib/error-handler'
import Button from '@/components/ui/Button.vue'
import {
  FormInput,
} from '@/components/ui/form'

const registerMutation = useRegisterMutation()
const successMessage = ref('')

const { handleSubmit, resetForm } = useForm({
  validationSchema: registerSchema,
})

const onSubmit = handleSubmit((values) => {
  registerMutation.mutate(values, {
    onSuccess: () => {
      successMessage.value = 'Conta criada com sucesso! Redirecionando para o login...'
      resetForm()
    }
  })
})
</script>

<template>
  <div class="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-muted/40">
    <div class="w-full max-w-md space-y-8 bg-card p-8 border rounded-xl shadow-lg animate-in fade-in zoom-in duration-300">
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight">Criar Conta</h1>
        <p class="text-muted-foreground mt-2">Junte-se à nossa comunidade de trocas</p>
      </div>

      <form @submit="onSubmit" class="space-y-4">
        <div v-if="registerMutation.error" class="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md">
          {{ getErrorMessage(registerMutation.error) }}
        </div>
        
        <div v-if="successMessage" class="p-3 bg-green-500/10 border border-green-500/20 text-green-600 text-sm rounded-md">
          {{ successMessage }}
        </div>

        <FormInput 
          name="name" 
          label="Nome" 
          placeholder="Seu nome completo" 
          :disabled="!!registerMutation.isPending" 
        />

        <FormInput 
          name="email" 
          label="E-mail" 
          placeholder="exemplo@teste.com" 
          :disabled="!!registerMutation.isPending" 
        />

        <FormInput 
          name="password" 
          label="Senha" 
          type="password" 
          placeholder="••••••••" 
          :disabled="!!registerMutation.isPending" 
        />

        <Button type="submit" class="w-full" :loading="!!registerMutation.isPending">
          Registrar
        </Button>
      </form>

      <div class="text-center text-sm">
        <p class="text-muted-foreground">
          Já tem uma conta? 
          <RouterLink to="/login" class="text-primary font-medium hover:underline">
            Entrar
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
