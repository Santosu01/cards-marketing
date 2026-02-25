<script setup lang="ts">
interface Props {
  id?: string
  error?: string
}

defineProps<Props>()
</script>

<template>
  <p
    v-if="error"
    :id="id ? `${id}-form-item-message` : undefined"
    class="text-xs font-medium text-destructive"
  >
    {{ error }}
  </p>
</template>
