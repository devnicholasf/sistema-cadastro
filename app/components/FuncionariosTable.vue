<template>
  <div class="bg-background-secondary rounded-lg shadow-lg p-6">
    <!-- Header da tabela -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-text-primary mb-2">
        Lista de Funcionários
      </h2>
      <p class="text-text-secondary">
        Gerencie todos os funcionários cadastrados no sistema
      </p>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-orange"></div>
      <span class="ml-3 text-text-secondary">Carregando funcionários...</span>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="p-4 bg-error-500/10 border border-error-500 rounded-lg">
      <p class="text-error-500 text-center">
        {{ error }}
      </p>
      <div class="text-center mt-3">
        <BaseButton
          variant="outline"
          size="sm"
          @click="handleRefresh"
        >
          Tentar novamente
        </BaseButton>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="funcionarios.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 text-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-14a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
      </svg>
      <h3 class="text-lg font-semibold text-text-primary mb-2">
        Nenhum funcionário encontrado
      </h3>
      <p class="text-text-secondary">
        Não há funcionários cadastrados no sistema
      </p>
    </div>

    <!-- Tabela de funcionários -->
    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-border-primary">
            <th class="text-left py-4 px-4 font-semibold text-text-primary">
              Nome
            </th>
            <th class="text-left py-4 px-4 font-semibold text-text-primary">
              Cargo
            </th>
            <th class="text-left py-4 px-4 font-semibold text-text-primary">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="funcionario in funcionarios"
            :key="funcionario.id"
            class="border-b border-border-secondary hover:bg-background-primary/50 transition-colors"
          >
            <td class="py-4 px-4">
              <div class="font-medium text-text-primary">
                {{ funcionario.nome }}
              </div>
            </td>
            <td class="py-4 px-4">
              <span class="text-text-secondary">
                {{ funcionario.cargo }}
              </span>
            </td>
            <td class="py-4 px-4">
              <span class="text-text-secondary">
                {{ funcionario.email }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Footer da tabela -->
      <div class="mt-4 text-center text-sm text-text-muted">
        Total: {{ funcionarios.length }} funcionário{{ funcionarios.length !== 1 ? 's' : '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import BaseButton from '~/components/BaseButton.vue'

// Composable dos funcionários
const { funcionarios, loading, error, fetchFuncionarios, clearError } = useFuncionarios()

// Função para recarregar dados
const handleRefresh = async () => {
  clearError()
  await fetchFuncionarios()
}

// Buscar funcionários ao montar o componente
onMounted(async () => {
  await fetchFuncionarios()
})
</script>