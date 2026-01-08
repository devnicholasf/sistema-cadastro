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

  // Função para criar novo funcionário
  const createFuncionario = async (funcionario: CreateFuncionario) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: createError } = await $supabase
        .from('funcionarios')
        .insert([funcionario])
        .select()
        .single()

      if (createError) {
        throw createError
      }

      // Adicionar o novo funcionário à lista local
      if (data) {
        funcionarios.value.push(data)
      }

      return {
        success: true,
        data: data,
        message: 'Funcionário criado com sucesso!'
      }
    } catch (err) {
      console.error('Erro ao criar funcionário:', err)
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar funcionário'
      error.value = errorMessage
      
      return {
        success: false,
        error: errorMessage,
        message: 'Erro ao criar funcionário'
      }
    } finally {
      loading.value = false
    }
  }

  // Função para buscar funcionário por ID (híbrida)
  const buscarFuncionarioPorId = async (id: number) => {
    try {
      loading.value = true
      error.value = null

      // Primeiro tenta encontrar nos dados já carregados
      const funcionarioExistente = funcionarios.value.find(f => f.id === id)
      
      if (funcionarioExistente) {
        console.log('💨 Funcionário encontrado no cache local')
        return {
          success: true,
          data: funcionarioExistente,
          message: 'Funcionário carregado do cache'
        }
      }

      // Se não encontrar, faz busca específica no Supabase
      console.log('🔍 Buscando funcionário no Supabase...')
      const { data, error: fetchError } = await $supabase
        .from('funcionarios')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) {
        throw fetchError
      }

      if (!data) {
        throw new Error('Funcionário não encontrado')
      }

      console.log('✅ Funcionário encontrado no Supabase')
      return {
        success: true,
        data: data,
        message: 'Funcionário carregado do banco'
      }
    } catch (err) {
      console.error('Erro ao buscar funcionário:', err)
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar funcionário'
      error.value = errorMessage
      
      return {
        success: false,
        error: errorMessage,
        data: null,
        message: 'Funcionário não encontrado'
      }
    } finally {
      loading.value = false
    }
  }

  // Função para atualizar funcionário
  const updateFuncionario = async (id: number, funcionario: UpdateFuncionario) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: updateError } = await $supabase
        .from('funcionarios')
        .update(funcionario)
        .eq('id', id)
        .select()
        .single()

      if (updateError) {
        throw updateError
      }

      // Atualizar o funcionário na lista local
      if (data) {
        const index = funcionarios.value.findIndex(f => f.id === id)
        if (index !== -1) {
          funcionarios.value[index] = data
        }
      }

      return {
        success: true,
        data: data,
        message: 'Funcionário atualizado com sucesso!'
      }
    } catch (err) {
      console.error('Erro ao atualizar funcionário:', err)
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar funcionário'
      error.value = errorMessage
      
      return {
        success: false,
        error: errorMessage,
        message: 'Erro ao atualizar funcionário'
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
    createFuncionario,
    buscarFuncionarioPorId,
    updateFuncionario,
    clearError,
    clearFuncionarios
  }
}