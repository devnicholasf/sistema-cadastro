import { ref, readonly } from 'vue'
import type { Funcionario, CreateFuncionario, UpdateFuncionario } from '~/types/funcionarios'

// Estado global dos funcionários
const funcionarios = ref<Funcionario[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export const useFuncionarios = () => {
  // Usar cliente Supabase do plugin
  const { $supabase } = useNuxtApp()

  // Função para buscar todos os funcionários
  const fetchFuncionarios = async () => {
    try {
      loading.value = true
      error.value = null

      const { data, error: fetchError } = await $supabase
        .from('funcionarios')
        .select('*')
        .order('id', { ascending: true })

      if (fetchError) {
        throw fetchError
      }

      funcionarios.value = data || []
      
      return {
        success: true,
        data: data || [],
        count: data?.length || 0
      }
    } catch (err) {
      console.error('Erro ao buscar funcionários:', err)
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar funcionários'
      error.value = errorMessage
      
      return {
        success: false,
        error: errorMessage,
        data: [],
        count: 0
      }
    } finally {
      loading.value = false
    }
  }

  // Limpar erro
  const clearError = () => {
    error.value = null
  }

  // Limpar dados
  const clearFuncionarios = () => {
    funcionarios.value = []
  }

  return {
    // Estado (readonly para proteger de modificações externas)
    funcionarios: readonly(funcionarios),
    loading: readonly(loading),
    error: readonly(error),
    
    // Métodos
    fetchFuncionarios,
    clearError,
    clearFuncionarios
  }
}