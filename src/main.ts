import { createApp } from 'vue'
import App from './App.vue'
import '@/common/rem'
import { pinia } from '@/store'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import shell from 'highlight.js/lib/languages/shell'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('shell', shell)

const app = createApp(App)
app.use(pinia).use(hljsVuePlugin).mount('#app')
