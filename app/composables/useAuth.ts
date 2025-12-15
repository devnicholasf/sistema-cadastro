import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js'
import { ref, readonly, computed, watch } from 'vue'

// Estado global de autenticação
const user = ref<User | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

let supabase: SupabaseClient | null = null

export const useAuth = () => {
  // Inicializar cliente Supabase se ainda não foi criado
  if (!supabase) {
    const config = useRuntimeConfig()
    
    // Debug: verificar se as variáveis estão carregando
    console.log('Supabase URL:', config.public.supabaseUrl)
    console.log('Supabase Key exists:', !!config.public.supabaseKey)
    
    supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)
  }

  // Função de login
  const login = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null

      if (!supabase) {
        throw new Error('Cliente Supabase não inicializado')
      }

      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })

      if (loginError) {
        throw loginError
      }

      user.value = data.user
      
      // Redirecionar para a página principal após login bem-sucedido
      await navigateTo('/')
      
      return { success: true, user: data.user }
    } catch (err) {
      console.error('Erro no login:', err)
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  // Função de logout
  const logout = async () => {
    try {
      loading.value = true
      error.value = null

      if (!supabase) {
        throw new Error('Cliente Supabase não inicializado')
      }

      const { error: logoutError } = await supabase.auth.signOut()
      
      if (logoutError) {
        throw logoutError
      }

      user.value = null
      
      // Redirecionar para login após logout
      await navigateTo('/login')
    } catch (err) {
      console.error('Erro no logout:', err)
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer logout'
      error.value = errorMessage
    } finally {
      loading.value = false
    }
  }

  // Função para verificar sessão atual
  const checkSession = async () => {
    try {
      if (!supabase) {
        throw new Error('Cliente Supabase não inicializado')
      }
      
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        user.value = session.user
      }
    } catch (err) {
      console.error('Erro ao verificar sessão:', err)
    }
  }

  // Limpar erro
  const clearError = () => {
    error.value = null
  }

  // Verificar se usuário está autenticado
  const isAuthenticated = computed(() => !!user.value)

  return {
    // Estado (readonly para proteger de modificações externas)
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    isAuthenticated,
    
    // Métodos
    login,
    logout,
    checkSession,
    clearError
  }
}