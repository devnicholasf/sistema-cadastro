<template>
  <div class="w-full">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-text-primary mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-accent-orange ml-1">*</span>
    </label>

    <!-- Input Wrapper -->
    <div class="relative">
      <!-- Icon Left -->
      <div
        v-if="$slots.iconLeft"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="icon-left" class="h-5 w-5 text-text-muted" />
      </div>

      <!-- Input Field -->
      <input
        :id="inputId"
        :type="currentType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keydown.enter="$emit('enter', $event)"
      />

      <!-- Password Toggle -->
      <button
        v-if="type === 'password'"
        type="button"
        @click="togglePasswordVisibility"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-secondary transition-colors"
      >
        <svg
          v-if="showPassword"
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <svg
          v-else
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m-3.122-3.122l4.243-4.243m0 0L21 21M9.878 9.878l4.242 4.242" />
        </svg>
      </button>

      <!-- Icon Right -->
      <div
        v-else-if="$slots.iconRight"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <slot name="icon-right" class="h-5 w-5 text-text-muted" />
      </div>
    </div>

    <!-- Helper Text -->
    <p
      v-if="helperText"
      class="mt-2 text-sm text-text-muted"
    >
      {{ helperText }}
    </p>

    <!-- Error Message -->
    <p
      v-if="errorMessage"
      class="mt-2 text-sm text-error-500"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { computed, useId, ref } from 'vue'

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'enter'])

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  helperText: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const inputId = useId()
const showPassword = ref(false)

const currentType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const inputClasses = computed(() => {
  const baseClasses = 'block w-full bg-surface-primary border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-transparent placeholder-text-muted text-text-primary disabled:bg-surface-tertiary disabled:cursor-not-allowed'
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  }
  
  const stateClasses = props.errorMessage
    ? 'border-error-500 focus:ring-error-500'
    : 'border-border-primary hover:border-border-accent focus:border-border-accent'
    
  const iconPadding = {
    left: props.$slots?.iconLeft ? 'pl-10' : '',
    right: (props.$slots?.iconRight || props.type === 'password') ? 'pr-10' : ''
  }
  
  return [
    baseClasses,
    sizeClasses[props.size],
    stateClasses,
    iconPadding.left,
    iconPadding.right
  ].filter(Boolean).join(' ')
})
</script>