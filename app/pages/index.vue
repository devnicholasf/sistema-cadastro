<template>
  <div class="min-h-screen bg-background-primary">
    <!-- Loading state -->
    <div v-if="pending" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-orange"></div>
    </div>

    <!-- Dashboard para usuário logado -->
    <div v-else-if="isAuthenticated" class="container mx-auto px-4 py-8">
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

        <!-- Cards de ações -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-background-secondary rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-primary-orange rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-text-primary mb-2">Meu Perfil</h3>
            <p class="text-text-secondary">Gerencie suas informações pessoais</p>
          </div>

          <div class="bg-background-secondary rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-primary-orange rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-text-primary mb-2">Documentos</h3>
            <p class="text-text-secondary">Acesse seus documentos e relatórios</p>
          </div>

          <div class="bg-background-secondary rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-primary-orange rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-text-primary mb-2">Configurações</h3>
            <p class="text-text-secondary">Ajuste as configurações do sistema</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Redirecionamento para login se não autenticado -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-orange mx-auto mb-4"></div>
        <p class="text-text-secondary">Redirecionando para login...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/BaseButton.vue'

definePageMeta({
  layout: 'default',
})

// Composable de autenticação
const { user, isAuthenticated, logout, loading, checkSession } = useAuth()

// Estado de carregamento inicial
const pending = ref(true)

// Verificar sessão ao montar componente
onMounted(async () => {
  await checkSession()
  
  // Se não estiver autenticado, redirecionar para login
  if (!isAuthenticated.value) {
    await navigateTo('/login')
    return
  }
  
  pending.value = false
})

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