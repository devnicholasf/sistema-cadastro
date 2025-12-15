<template>
  <div class="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-accent-orange opacity-10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-orange opacity-5 rounded-full blur-3xl"></div>
    </div>
    
    <!-- Main content -->
    <div class="relative w-full max-w-md">
      <slot />
    </div>
  </div>
</template>

<script setup>
// Layout específico para páginas de autenticação
// Sem header/footer para foco total na autenticação
</script>