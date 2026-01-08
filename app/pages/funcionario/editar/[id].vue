<template>
  <div class="min-h-screen bg-background-primary">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <!-- Loading state -->
        <div v-if="carregando" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-orange"></div>
          <span class="ml-3 text-text-secondary">Carregando funcionário...</span>
        </div>

        <!-- Error state -->
        <div v-else-if="erro" class="p-6 bg-error-500/10 border border-error-500 rounded-lg">
          <h2 class="text-xl font-semibold text-error-500 mb-2">Funcionário não encontrado</h2>
          <p class="text-error-500 mb-4">{{ erro }}</p>
          <BaseButton
            variant="outline"
            @click="() => navigateTo('/')"
          >
            Voltar ao início
          </BaseButton>
        </div>

        <!-- Formulário de edição -->
        <FormFuncionario 
          v-else-if="funcionario"
          :is-novo="false" 
          :funcionario="funcionario"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FormFuncionario from '~/components/FormFuncionario.vue'
import BaseButton from '~/components/BaseButton.vue'
import type { Funcionario } from '~/types/funcionarios'

// Pegar parâmetro da rota
const route = useRoute()
const funcionarioId = parseInt(route.params.id as string)

// Estados locais
const funcionario = ref<Funcionario | null>(null)
const carregando = ref(true)
const erro = ref<string | null>(null)

// Composables
const { buscarFuncionarioPorId } = useFuncionarios()
const { showError } = useNotifications()

// Validar ID
if (!funcionarioId || isNaN(funcionarioId)) {
  erro.value = 'ID de funcionário inválido'
  carregando.value = false
}

// Carregar funcionário
onMounted(async () => {
  if (funcionarioId && !isNaN(funcionarioId)) {
    try {
      const result = await buscarFuncionarioPorId(funcionarioId)
      
      if (result.success && result.data) {
        funcionario.value = result.data
        console.log(`📄 ${result.message}`)
      } else {
        erro.value = result.error || 'Funcionário não encontrado'
        showError('Funcionário não encontrado')
      }
    } catch (error) {
      console.error('Erro ao carregar funcionário:', error)
      erro.value = 'Erro ao carregar funcionário'
      showError('Erro ao carregar funcionário')
    } finally {
      carregando.value = false
    }
  }
})

// Head da página
useHead({
  title: `Editar Funcionário ${funcionarioId ? `#${funcionarioId}` : ''} - Sistema de Cadastro`,
  meta: [
    {
      name: 'description',
      content: 'Editar informações do funcionário'
    }
  ]
})

definePageMeta({
  layout: 'default'
})
</script>