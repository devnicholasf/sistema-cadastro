<template>
  <div class="w-full max-w-md mx-auto">
    <div class="bg-surface-primary border border-border-primary rounded-xl p-6 shadow-secondary">
      <!-- Header -->
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-text-primary mb-2">
          Sistema de Cadastro
        </h2>
        <p class="text-text-secondary text-sm">
          Faça login ou crie sua conta
        </p>
      </div>

      <!-- Tabs -->
      <div class="flex bg-background-secondary rounded-lg p-1 mb-6">
        <button
          @click="activeTab = 'login'"
          :class="[
            'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
            activeTab === 'login'
              ? 'bg-surface-primary text-text-primary shadow-sm'
              : 'text-text-muted hover:text-text-secondary'
          ]"
        >
          Entrar
        </button>
        <button
          @click="activeTab = 'register'"
          :class="[
            'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
            activeTab === 'register'
              ? 'bg-surface-primary text-text-primary shadow-sm'
              : 'text-text-muted hover:text-text-secondary'
          ]"
        >
          Criar Conta
        </button>
      </div>

      <!-- Login Tab -->
      <div v-if="activeTab === 'login'" class="space-y-4">
        <BaseInput
          v-model="loginForm.email"
          type="email"
          label="Email"
          placeholder="seu@email.com"
          required
        />
        
        <BaseInput
          v-model="loginForm.password"
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          required
        />

        <BaseButton
          variant="primary"
          size="lg"
          class="w-full mt-6"
          :loading="loading"
          @click="handleLogin"
        >
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </BaseButton>

        <!-- Mensagem de erro -->
        <div v-if="error" class="mt-4 p-3 bg-error-500/10 border border-error-500 rounded-lg">
          <p class="text-error-500 text-sm text-center">
            {{ error }}
          </p>
        </div>

        <p class="text-center text-sm text-text-muted mt-4">
          Esqueceu sua senha? 
          <a href="#" class="text-accent-orange hover:text-accent-orange-light transition-colors">
            Clique aqui
          </a>
        </p>
      </div>

      <!-- Register Tab -->
      <div v-if="activeTab === 'register'" class="space-y-4">
        <BaseInput
          v-model="registerForm.email"
          type="email"
          label="Email"
          placeholder="seu@email.com"
          required
        />
        
        <BaseInput
          v-model="registerForm.password"
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          required
        />

        <BaseInput
          v-model="registerForm.confirmPassword"
          type="password"
          label="Confirmar Senha"
          placeholder="Confirme sua senha"
          required
        />

        <BaseButton
          variant="primary"
          size="lg"
          class="w-full mt-6"
          @click="handleRegister"
        >
          Criar Conta
        </BaseButton>

        <p class="text-center text-sm text-text-muted mt-4">
          Ao criar uma conta, você concorda com nossos 
          <a href="#" class="text-accent-orange hover:text-accent-orange-light transition-colors">
            Termos de Uso
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from '~/components/BaseInput.vue'
import BaseButton from '~/components/BaseButton.vue'

// Composable de autenticação
const { login, loading, error, clearError } = useAuth()

// Estado das abas
const activeTab = ref('login')

// Formulário de login
const loginForm = ref({
  email: '',
  password: ''
})

// Formulário de registro
const registerForm = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

// Função de login
const handleLogin = async () => {
  // Limpar erros anteriores
  clearError()
  
  // Validação básica
  if (!loginForm.value.email || !loginForm.value.password) {
    return
  }

  try {
    const result = await login(loginForm.value.email, loginForm.value.password)
    
    if (result.success) {
      // Login bem-sucedido, o composable já faz o redirect
      console.log('Login realizado com sucesso!')
    }
  } catch (err) {
    console.error('Erro no login:', err)
  }
}

// Função placeholder para registro (será implementada depois)
const handleRegister = () => {
  // TODO: Implementar lógica de registro
}

// Limpar erro quando trocar de aba
watch(activeTab, () => {
  clearError()
})
</script>