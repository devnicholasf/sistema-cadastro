export default defineNuxtRouteMiddleware(async (to, from) => {
  // Não executar middleware no lado do servidor para evitar problemas de hidratação
  if (process.server) return

  const { isAuthenticated, checkSession, user } = useAuth()
  
  // Sempre verificar a sessão primeiro (caso ainda não tenha sido verificada)
  if (!user.value) {
    await checkSession()
  }
  
  // Lista de rotas públicas (que não precisam de autenticação)
  const publicRoutes = ['/login']
  
  // Verificar se a rota atual é pública
  const isPublicRoute = publicRoutes.includes(to.path)
  
  console.log('Middleware - Estado atual:', {
    path: to.path,
    isAuthenticated: isAuthenticated.value,
    hasUser: !!user.value,
    isPublicRoute
  })
  
  // Se usuário está tentando acessar rota de login e já está autenticado
  if (to.path === '/login' && isAuthenticated.value) {
    console.log('Usuário já logado, redirecionando para dashboard')
    return navigateTo('/')
  }
  
  // Se usuário não está autenticado e tenta acessar rota protegida
  if (!isAuthenticated.value && !isPublicRoute) {
    console.log('Usuário não autenticado, redirecionando para login')
    return navigateTo('/login')
  }
  
  // Se usuário está autenticado, permitir acesso
  console.log('Middleware: Acesso permitido à rota', to.path)
})