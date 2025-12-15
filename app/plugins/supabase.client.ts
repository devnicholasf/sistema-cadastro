import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Verificar se as variáveis de ambiente estão configuradas
  if (!config.public.supabaseUrl || !config.public.supabaseKey) {
    console.error('Variáveis de ambiente do Supabase não configuradas')
    throw new Error('Configuração do Supabase inválida')
  }

  // Validar formato da URL
  if (!config.public.supabaseUrl.includes('supabase.co')) {
    console.error('URL do Supabase inválida:', config.public.supabaseUrl)
    throw new Error('URL do Supabase inválida')
  }

  // Criar cliente Supabase
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      },
      global: {
        headers: {
          'X-Client-Info': 'nuxt-supabase'
        }
      }
    }
  )

  // Disponibilizar o cliente globalmente
  return {
    provide: {
      supabase
    }
  }
})