import { type User } from '@supabase/supabase-js'
import { ref, readonly, computed } from 'vue'

// Estado global de autenticação
const user = ref<User | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

export const useAuth = () => {
  // Usar cliente Supabase do plugin
  const { $supabase } = useNuxtApp()

  // Função para mapear erros para mensagens amigáveis
  const getErrorMessage = (error: any): string => {
    // Erros de autenticação (credenciais incorretas)
    if (error.message?.includes('Invalid login credentials') ||
        error.message?.includes('invalid_credentials') ||
        (error.status === 400 && error.message?.includes('credentials'))) {
      return 'Email ou senha incorretos. Verifique seus dados e tente novamente.'
    }

    // Erros específicos de API key (apenas se realmente for problema de configuração)
    if (error.message?.includes('Invalid API key') || 
        error.message?.includes('API key not found') ||
        error.message?.includes('JWT') && error.message?.includes('invalid')) {
      return 'Problema na configuração do sistema. Entre em contato com o suporte.'
    }

    // Erro de email não verificado
    if (error.message?.includes('Email not confirmed')) {
      return 'Por favor, verifique seu email e confirme sua conta antes de fazer login.'
    }

    // Erro de muitas tentativas
    if (error.message?.includes('too_many_requests') || 
        error.message?.includes('rate limit')) {
      return 'Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente.'
    }

    // Erro de rede
    if (error.message?.includes('fetch') || 
        error.message?.includes('network') ||
        !error.message) {
      return 'Erro de conexão. Verifique sua internet e tente novamente.'
    }

    // Para erro 401 genérico (provavelmente credenciais incorretas)
    if (error.status === 401) {
      return 'Email ou senha incorretos. Verifique seus dados e tente novamente.'
    }

    // Erro genérico (não expor detalhes técnicos)
    return 'Não foi possível fazer login no momento. Tente novamente em alguns instantes.'
  }

  // Função de login
  const login = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: loginError } = await $supabase.auth.signInWithPassword({
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
      const errorMessage = getErrorMessage(err)
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

      const { error: logoutError } = await $supabase.auth.signOut()
      
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
      const { data: { session } } = await $supabase.auth.getSession()
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