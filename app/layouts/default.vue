<template>
  <div class="min-h-screen bg-hero-gradient flex flex-col">
    <!-- Header (não mostrar na página de login) -->
    <TheHeader v-if="!isLoginPage" />
    
    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- Footer (não mostrar na página de login) -->
    <TheFooter v-if="!isLoginPage" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

const route = useRoute()

const isLoginPage = computed(() => {
  return route.path === '/login'
})
</script>