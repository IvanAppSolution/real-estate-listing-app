import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import { ConfirmationService } from 'primevue'
import StyleClass from 'primevue/styleclass'
import './assets/demo/demo.scss'
import './assets/tailwind.css'
import './assets/styles.scss'
import './assets/main.css'
import Unicon from 'vue-unicons';
import { uniMusic, uniCarWash, uniBed, uniRuler, uniBath } from 'vue-unicons/dist/icons';
Unicon.add([uniMusic, uniCarWash, uniBed, uniRuler, uniBath]);


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
app.use(Unicon)
app.use(ToastService)
app.use(ConfirmationService)
app.directive('styleclass', StyleClass)
app.mount('#app')
