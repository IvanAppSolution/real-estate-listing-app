import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import { ConfirmationService } from 'primevue'
import StyleClass from 'primevue/styleclass'

// Font Awesome imports
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'

// Add icons to the library
// library.add(fas, far, fab)


import './assets/demo/demo.scss'
import './assets/tailwind.css'
import './assets/styles.scss'
import './assets/main.css'


const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.p-dark',
    },
  },
})
app.use(ToastService)
app.use(ConfirmationService)
app.directive('styleclass', StyleClass)
app.mount('#app')
