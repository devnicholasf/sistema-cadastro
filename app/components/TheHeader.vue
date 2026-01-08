<template>
  <header class="bg-background-secondary border-b border-border-primary sticky top-0 z-50 backdrop-blur-lg">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <NuxtLink 
            to="/"
            class="flex items-center space-x-2 text-text-primary hover:text-accent-orange transition-colors duration-200"
          >
            <div class="w-8 h-8 bg-accent-gradient rounded-lg flex items-center justify-center font-bold text-sm">
              SC
            </div>
            <span class="text-xl font-bold hidden sm:block">Sistema de Cadastro</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink
            to="/"
            class="text-text-secondary hover:text-accent-orange transition-colors duration-200 font-medium"
            active-class="text-accent-orange"
          >
            Início
          </NuxtLink>
          <NuxtLink
            to="/novo-cadastro"
            class="text-text-secondary hover:text-accent-orange transition-colors duration-200 font-medium"
            active-class="text-accent-orange"
          >
            Novo Cadastro
          </NuxtLink>
        </div>

        <!-- Action Buttons -->
        <div class="hidden md:flex items-center space-x-3">
          <div v-if="isAuthenticated" class="flex items-center space-x-3">
            <span class="text-text-secondary text-sm">
              {{ user?.email }}
            </span>
            <BaseButton
              variant="outline"
              size="sm"
              @click="handleLogout"
            >
              Sair
            </BaseButton>
          </div>
          <div v-else class="flex items-center space-x-3">
            <NuxtLink
              to="/login"
              class="text-text-secondary hover:text-accent-orange transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-surface-primary"
            >
              Login
            </NuxtLink>
            <button class="bg-accent-gradient text-text-primary px-4 py-2 rounded-lg font-medium hover:shadow-glow hover:scale-105 transition-all duration-200">
              Cadastrar
            </button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden text-text-primary hover:text-accent-orange transition-colors duration-200 p-2"
        >
          <svg
            v-if="!isMobileMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden mt-4 pb-4 border-t border-border-primary pt-4"
      >
        <div class="flex flex-col space-y-3">
          <NuxtLink
            to="/"
            @click="closeMobileMenu"
            class="text-text-secondary hover:text-accent-orange transition-colors duration-200 font-medium py-2"
            active-class="text-accent-orange"
          >
            Início
          </NuxtLink>
          <NuxtLink
            to="/novo-cadastro"
            @click="closeMobileMenu"
            class="text-text-secondary hover:text-accent-orange transition-colors duration-200 font-medium py-2"
            active-class="text-accent-orange"
          >
            Novo Cadastro
          </NuxtLink>
          <div v-if="isAuthenticated" class="flex flex-col space-y-2 pt-2 border-t border-border-primary">
            <span class="text-text-secondary text-sm py-2">
              {{ user?.email }}
            </span>
            <BaseButton
              variant="outline"
              size="sm"
              @click="handleLogout"
              class="text-left"
            >
              Sair
            </BaseButton>
          </div>
          <div v-else class="flex flex-col space-y-2 pt-2 border-t border-border-primary">
            <NuxtLink
              to="/login"
              @click="closeMobileMenu"
              class="text-text-secondary hover:text-accent-orange transition-colors duration-200 text-left py-2"
            >
              Entrar
            </NuxtLink>
            <button class="bg-accent-gradient text-text-primary px-4 py-2 rounded-lg font-medium text-left">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '~/components/BaseButton.vue'

// Composable de autenticação
const { user, isAuthenticated, logout } = useAuth()
const { showSuccess } = useNotifications()

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = async () => {
  await logout()
  showSuccess('Logout realizado com sucesso!')
  closeMobileMenu()
  navigateTo('/login')
}
</script>