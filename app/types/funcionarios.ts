// Tipos relacionados à entidade Funcionários

export interface Funcionario {
  id: number
  nome: string
  cargo: string
  endereco: string | null
  email: string
  salario: number
}

// Tipo para criação de funcionário (sem id que é gerado automaticamente)
export interface CreateFuncionario {
  nome: string
  cargo: string
  endereco?: string | null
  email: string
  salario: number
}

// Tipo para atualização de funcionário (campos opcionais)
export interface UpdateFuncionario {
  nome?: string
  cargo?: string
  endereco?: string | null
  email?: string
  salario?: number
}

// Tipo para resposta de API
export interface FuncionariosResponse {
  data: Funcionario[]
  count: number
  success: boolean
  error?: string
}