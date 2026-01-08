<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="onCancel"
    ></div>

    <!-- Modal Container -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div
        class="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
      >
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <!-- Ícone de alerta -->
            <div
              class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>

            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3
                id="modal-title"
                class="text-base font-semibold leading-6 text-gray-900"
              >
                {{ title }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ message }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <BaseButton
            variant="danger"
            class="w-full sm:ml-3 sm:w-auto"
            @click="onConfirm"
            :loading="loading"
          >
            {{ confirmText }}
          </BaseButton>
          <BaseButton
            variant="outline"
            class="mt-3 w-full sm:mt-0 sm:w-auto"
            @click="onCancel"
            :disabled="loading"
          >
            {{ cancelText }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/BaseButton.vue'

// Props
interface Props {
  isOpen: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Confirmar ação',
  message: 'Tem certeza que deseja continuar?',
  confirmText: 'Confirmar',
  cancelText: 'Cancelar',
  loading: false
})

// Emits
const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

// Funções
const onConfirm = () => {
  emit('confirm')
}

const onCancel = () => {
  emit('cancel')
}

// Prevenir scroll do body quando modal está aberto
watch(() => props.isOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Cleanup ao desmontar componente
onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>