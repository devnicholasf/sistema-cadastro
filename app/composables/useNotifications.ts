import { useToast } from 'vue-toastification'

export const useNotifications = () => {
  const toast = useToast()

  const showSuccess = (message: string, options?: object) => {
    toast.success(message, options)
  }

  const showError = (message: string, options?: object) => {
    toast.error(message, options)
  }

  const showWarning = (message: string, options?: object) => {
    toast.warning(message, options)
  }

  const showInfo = (message: string, options?: object) => {
    toast.info(message, options)
  }

  const clear = () => {
    toast.clear()
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    clear
  }
}