<template>
  <div class="bg-background-secondary rounded-lg shadow-lg p-6">
    <!-- Header do formulário -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-text-primary mb-2">
        {{ isNovo ? 'Novo Funcionário' : 'Editar Funcionário' }}
      </h2>
      <p class="text-text-secondary">
        {{ isNovo ? 'Preencha os dados para cadastrar um novo funcionário' : 'Edite as informações do funcionário' }}
      </p>
    </div>

    <!-- Formulário -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Nome -->
      <BaseInput
        v-model="formData.nome"
        type="text"
        label="Nome Completo"
        placeholder="Digite o nome completo do funcionário"
        required
        :error-message="errors.nome"
      />

      <!-- Cargo -->
      <BaseDropdown
        v-model="formData.cargo"
        label="Cargo"
        placeholder="Selecione o cargo"
        :options="cargosDisponiveis"
        required
        :error-message="errors.cargo"
      />

      <!-- Email -->
      <BaseInput
        v-model="formData.email"
        type="email"
        label="Email"
        placeholder="funcionario@empresa.com"
        required
        :error-message="errors.email"
      />

      <!-- Endereço -->
      <BaseInput
        v-model="formData.endereco"
        type="text"
        label="Endereço"
        placeholder="Digite o endereço completo"
        required
        :error-message="errors.endereco"
      />

      <!-- Salário -->
      <BaseInput
        v-model="formData.salario"
        type="number"
        label="Salário"
        placeholder="0.00"
        step="0.01"
        min="0"
        required
        :error-message="errors.salario"
      />

      <!-- Botões de ação -->
      <div class="flex justify-end space-x-4 pt-4 border-t border-border-primary">
        <BaseButton
          variant="outline"
          type="button"
          @click="handleCancel"
        >
          Cancelar
        </BaseButton>
        
        <BaseButton
          variant="primary"
          type="submit"
          :loading="loading"
        >
          {{ isNovo ? 'Salvar' : 'Editar' }}
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import BaseInput from '~/components/BaseInput.vue'
import BaseButton from '~/components/BaseButton.vue'
import BaseDropdown from '~/components/BaseDropdown.vue'
import type { CreateFuncionario, Funcionario } from '~/types/funcionarios'

// Composables
const { createFuncionario } = useFuncionarios()
const { showSuccess, showError, showInfo } = useNotifications()

// Props
interface Props {
  isNovo?: boolean
  funcionario?: Funcionario | null
}

const props = withDefaults(defineProps<Props>(), {
  isNovo: true,
  funcionario: null
})

// Lista de cargos disponíveis
const cargosDisponiveis = [
  'Assistente Administrativo',
  'Analista Financeiro',
  'Auxiliar de Recursos Humanos',
  'Coordenador de Projetos',
  'Supervisor Operacional',
  'Analista de Marketing',
  'Desenvolvedor Front-end',
  'Desenvolvedor Back-end',
  'Analista de Suporte Técnico',
  'Gerente Comercial'
]

// Estado do formulário
const formData = reactive<Omit<CreateFuncionario, 'endereco'> & { endereco: string }>({
  nome: '',
  cargo: '',
  endereco: '',
  email: '',
  salario: 0
})

// Estados de erro
const errors = reactive({
  nome: '',
  cargo: '',
  email: '',
  endereco: '',
  salario: ''
})

// Estado de loading
const loading = ref(false)

// Função para limpar erros
const clearErrors = () => {
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
}

// Função de validação
const validateForm = (): boolean => {
  clearErrors()
  let isValid = true

  // Validar nome
  if (!formData.nome.trim()) {
    errors.nome = 'Nome é obrigatório'
    isValid = false
  } else if (formData.nome.trim().length < 2) {
    errors.nome = 'Nome deve ter pelo menos 2 caracteres'
    isValid = false
  }

  // Validar cargo
  if (!formData.cargo.trim()) {
    errors.cargo = 'Cargo é obrigatório'
    isValid = false
  }

  // Validar endereço
  if (!formData.endereco.trim()) {
    errors.endereco = 'Endereço é obrigatório'
    isValid = false
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim()) {
    errors.email = 'Email é obrigatório'
    isValid = false
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Digite um email válido'
    isValid = false
  }

  // Validar salário
  if (formData.salario <= 0) {
    errors.salario = 'Salário deve ser maior que zero'
    isValid = false
  }

  return isValid
}

// Função para enviar formulário
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true
  
  try {
    if (props.isNovo) {
      // Criar novo funcionário
      const result = await createFuncionario(formData)
      
      if (result.success) {
        // Toast de sucesso
        showSuccess('Funcionário cadastrado com sucesso!')
        
        // Resetar formulário
        resetForm()
        
        // Redirecionar para página inicial após 1.5s
        setTimeout(async () => {
          await navigateTo('/')
        }, 1500)
      } else {
        // Toast de erro
        showError(result.error || 'Erro ao cadastrar funcionário')
      }
    } else {
      // TODO: Implementar edição
      console.log('Editar funcionário:', formData)
      showInfo('Funcionalidade de edição será implementada em breve')
    }
    
  } catch (error) {
    console.error('Erro no formulário:', error)
    showError('Erro inesperado. Tente novamente.')
  } finally {
    loading.value = false
  }
}

// Função para resetar o formulário
const resetForm = () => {
  formData.nome = ''
  formData.cargo = ''
  formData.endereco = ''
  formData.email = ''
  formData.salario = 0
  clearErrors()
}

// Função para cancelar
const handleCancel = () => {
  // TODO: Implementar lógica de cancelar
  console.log('Cancelar ação')
}

// Preencher dados se estiver editando
watch(() => props.funcionario, (newFuncionario) => {
  if (newFuncionario && !props.isNovo) {
    formData.nome = newFuncionario.nome
    formData.cargo = newFuncionario.cargo
    formData.endereco = newFuncionario.endereco ?? ''
    formData.email = newFuncionario.email
    formData.salario = newFuncionario.salario
  }
}, { immediate: true })

// Limpar erros quando usuário digitar
watch(() => formData.nome, () => {
  if (errors.nome) errors.nome = ''
})

watch(() => formData.cargo, () => {
  if (errors.cargo) errors.cargo = ''
})

watch(() => formData.email, () => {
  if (errors.email) errors.email = ''
})

watch(() => formData.endereco, () => {
  if (errors.endereco) errors.endereco = ''
})

watch(() => formData.salario, () => {
  if (errors.salario) errors.salario = ''
})
</script>