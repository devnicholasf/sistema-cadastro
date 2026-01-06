<template>
  <div class="min-h-screen bg-background-primary">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <!-- Formulário de novo funcionário -->
        <FormFuncionario :is-novo="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormFuncionario from '~/components/FormFuncionario.vue'

definePageMeta({
  layout: 'default',
})

// Head da página
useHead({
  title: 'Novo Funcionário - Sistema de Cadastro',
  meta: [
    {
      name: 'description',
      content: 'Cadastro de novo funcionário no sistema'
    }
  ]
})
</script>