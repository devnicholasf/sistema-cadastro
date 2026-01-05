<template>
  <div class="min-h-screen bg-background-primary">
    <!-- Dashboard para usuário logado -->
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header da dashboard -->
        <div class="bg-background-secondary rounded-lg shadow-lg p-6 mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-text-primary mb-2">
                Bem-vindo, {{ user?.email }}!
              </h1>
              <p class="text-text-secondary">
                Você está logado no sistema
              </p>
            </div>
            <BaseButton 
              variant="outline" 
              @click="logout"
              :loading="loading"
            >
              Sair
            </BaseButton>
          </div>
        </div>
        

        <!-- Tabela de Funcionários -->

        <FuncionariosTable />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/BaseButton.vue'
import FuncionariosTable from '~/components/FuncionariosTable.vue'

definePageMeta({
  layout: 'default',
})

// Composable de autenticação
const { user, logout, loading } = useAuth()

// Head da página
useHead({
  title: 'Dashboard - Sistema de Cadastro',
  meta: [
    {
      name: 'description',
      content: 'Dashboard do sistema de cadastro'
    }
  ]
})
</script>