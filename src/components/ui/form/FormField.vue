<script setup lang="ts">
import { useId } from 'vue'
import { Field } from 'vee-validate'

interface Props {
  name: string
}

const props = defineProps<Props>()
const id = useId()
</script>

<template>
  <Field v-slot="{ field, errorMessage }" :name="props.name">
    <slot 
      :id="id"
      :component-field="field" 
      :error-message="errorMessage" 
    />
  </Field>
</template>
