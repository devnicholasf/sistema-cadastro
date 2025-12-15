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
          :error-message="emailError"
        />
        
        <BaseInput
          v-model="loginForm.password"
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          required
          :error-message="passwordError"
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
          v-model="registerForm.name"
          type="text"
          label="Nome Completo"
          placeholder="Seu nome completo"
          required
          :error-message="nameError"
        />
        
        <BaseInput
          v-model="registerForm.email"
          type="email"
          label="Email"
          placeholder="seu@email.com"
          required
          :error-message="emailError"
        />
        
        <BaseInput
          v-model="registerForm.password"
          type="password"
          label="Senha"
          placeholder="Digite sua senha (mínimo 6 caracteres)"
          required
          :error-message="passwordError"
        />

        <BaseInput
          v-model="registerForm.confirmPassword"
          type="password"
          label="Confirmar Senha"
          placeholder="Confirme sua senha"
          required
          :error-message="confirmPasswordError"
        />

        <BaseButton
          variant="primary"
          size="lg"
          class="w-full mt-6"
          :loading="loading"
          @click="handleRegister"
        >
          {{ loading ? 'Criando conta...' : 'Criar Conta' }}
        </BaseButton>

        <!-- Mensagem de erro -->
        <div v-if="error" class="mt-4 p-3 bg-error-500/10 border border-error-500 rounded-lg">
          <p class="text-error-500 text-sm text-center">
            {{ error }}
          </p>
        </div>

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

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BaseInput from '~/components/BaseInput.vue'
import BaseButton from '~/components/BaseButton.vue'

// Composable de autenticação
const { login, register, loading, error, clearError } = useAuth()

// Estado das abas
const activeTab = ref('login')

// Formulário de login
const loginForm = ref({
  email: '',
  password: ''
})

// Formulário de registro
const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Estados de validação
const emailError = ref('')
const passwordError = ref('')
const nameError = ref('')
const confirmPasswordError = ref('')

// Função para validar email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Função para limpar erros de validação
const clearValidationErrors = () => {
  emailError.value = ''
  passwordError.value = ''
  nameError.value = ''
  confirmPasswordError.value = ''
}

// Função de validação do formulário de login
const validateLoginForm = (): boolean => {
  clearValidationErrors()
  let isValid = true

  // Validar email
  if (!loginForm.value.email) {
    emailError.value = 'Email é obrigatório'
    isValid = false
  } else if (!isValidEmail(loginForm.value.email)) {
    emailError.value = 'Por favor, digite um email válido'
    isValid = false
  }

  // Validar senha
  if (!loginForm.value.password) {
    passwordError.value = 'Senha é obrigatória'
    isValid = false
  } else if (loginForm.value.password.length < 6) {
    passwordError.value = 'Senha deve ter pelo menos 6 caracteres'
    isValid = false
  }

  return isValid
}

// Função de login
const handleLogin = async () => {
  // Limpar erros anteriores
  clearError()
  clearValidationErrors()
  
  // Validar formulário
  if (!validateLoginForm()) {
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

// Função de validação do formulário de registro
const validateRegisterForm = (): boolean => {
  clearValidationErrors()
  let isValid = true

  // Validar nome
  if (!registerForm.value.name.trim()) {
    nameError.value = 'Nome é obrigatório'
    isValid = false
  } else if (registerForm.value.name.trim().length < 2) {
    nameError.value = 'Nome deve ter pelo menos 2 caracteres'
    isValid = false
  }

  // Validar email
  if (!registerForm.value.email) {
    emailError.value = 'Email é obrigatório'
    isValid = false
  } else if (!isValidEmail(registerForm.value.email)) {
    emailError.value = 'Por favor, digite um email válido'
    isValid = false
  }

  // Validar senha
  if (!registerForm.value.password) {
    passwordError.value = 'Senha é obrigatória'
    isValid = false
  } else if (registerForm.value.password.length < 6) {
    passwordError.value = 'Senha deve ter pelo menos 6 caracteres'
    isValid = false
  }

  // Validar confirmação de senha
  if (!registerForm.value.confirmPassword) {
    confirmPasswordError.value = 'Confirmação de senha é obrigatória'
    isValid = false
  } else if (registerForm.value.password !== registerForm.value.confirmPassword) {
    confirmPasswordError.value = 'Senhas não conferem'
    isValid = false
  }

  return isValid
}

// Função placeholder para registro (será implementada depois)
const handleRegister = async () => {
  // Limpar erros anteriores
  clearError()
  clearValidationErrors()
  
  // Validar formulário
  if (!validateRegisterForm()) {
    return
  }

  try {
    const result = await register(
      registerForm.value.name.trim(),
      registerForm.value.email,
      registerForm.value.password
    )
    
    if (result.success) {
      // Registro e login automático bem-sucedido
      console.log('Conta criada e login realizado!')
      
      // Limpar formulário
      registerForm.value = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  } catch (err) {
    console.error('Erro no registro:', err)
  }
}

// Limpar erros quando trocar de aba ou digitar
watch(activeTab, () => {
  clearError()
  clearValidationErrors()
})

// Limpar erro específico do campo quando usuário começar a digitar
watch(() => loginForm.value.email, () => {
  if (emailError.value) emailError.value = ''
})

watch(() => loginForm.value.password, () => {
  if (passwordError.value) passwordError.value = ''
})

// Watches para formulário de registro
watch(() => registerForm.value.name, () => {
  if (nameError.value) nameError.value = ''
})

watch(() => registerForm.value.email, () => {
  if (emailError.value) emailError.value = ''
})

watch(() => registerForm.value.password, () => {
  if (passwordError.value) passwordError.value = ''
})

watch(() => registerForm.value.confirmPassword, () => {
  if (confirmPasswordError.value) confirmPasswordError.value = ''
})
</script>