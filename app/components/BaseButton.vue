<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <slot name="icon-left" />
    <span v-if="$slots.default" :class="textClasses">
      <slot />
    </span>
    <slot name="icon-right" />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-background-primary disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-accent-gradient text-text-primary hover:shadow-glow hover:scale-105',
    secondary: 'bg-surface-primary border border-border-primary text-text-primary hover:bg-hover-background hover:border-border-accent',
    outline: 'border border-border-accent text-accent-orange hover:bg-accent-orange hover:text-text-inverse',
    ghost: 'text-accent-orange hover:bg-surface-primary hover:text-text-primary',
    danger: 'bg-error-500 text-white hover:bg-error-600 hover:shadow-lg'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }
  
  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    { 'pointer-events-none': props.loading }
  ].join(' ')
})

const textClasses = computed(() => {
  return props.loading ? 'opacity-0' : ''
})
</script>