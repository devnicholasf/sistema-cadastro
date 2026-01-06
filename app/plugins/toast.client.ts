import { defineNuxtPlugin } from '#app'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: 'top-right',
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
    transition: 'Vue-Toastification__bounce',
    maxToasts: 20,
    newestOnTop: true,
    toastDefaults: {
      // Customizar cores para combinar com o design system
      success: {
        toastClassName: '!bg-primary-orange !text-white',
        bodyClassName: '!text-white',
        progressClassName: '!bg-white',
      },
      error: {
        toastClassName: '!bg-error-500 !text-white',
        bodyClassName: '!text-white',
        progressClassName: '!bg-white',
      },
      warning: {
        toastClassName: '!bg-amber-500 !text-white',
        bodyClassName: '!text-white',
        progressClassName: '!bg-white',
      },
      info: {
        toastClassName: '!bg-blue-500 !text-white',
        bodyClassName: '!text-white',
        progressClassName: '!bg-white',
      }
    }
  })
})