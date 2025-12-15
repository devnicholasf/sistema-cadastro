export default defineNuxtPlugin(async () => {
  // Executar apenas no cliente para evitar problemas de hidratação
  if (process.server) return

  const { checkSession } = useAuth()
  
  // Verificar sessão automaticamente ao inicializar a aplicação
  await checkSession()
})