import { createApp } from 'vue'
import App from './App.vue'
import '@/common/rem'
import { pinia } from '@/store'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

const app = createApp(App)
app.use(pinia).use(hljsVuePlugin).mount('#app')
