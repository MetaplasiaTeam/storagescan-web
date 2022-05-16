<script setup lang="ts">
import hljsVuePlugin from '@highlightjs/vue-plugin'
import { ref, watch } from 'vue'
import { useClipboard } from '@vueuse/core'
import notyf from '@/notyf'

const { copy } = useClipboard()
const highlight = hljsVuePlugin.component
const show = ref(false)
const codeHeight = ref('0px')
const rotate = ref('0deg')

const prop = defineProps({
  title: {
    type: String,
    default: '',
  },
  code: {
    type: String,
    default: '',
  },
})

watch(show, (val) => {
  codeHeight.value = val ? '500px' : '0px'
  rotate.value = val ? '180deg' : '0deg'
})

function copyCode() {
  copy(prop.code).then(() => {
    notyf.success('Copied to clipboard')
  })
}
</script>

<template>
  <div class="code-item card">
    <div @click="show = !show" class="code-head">
      <p>{{ title }}</p>
      <div class="icons">
        <i @click.stop="copyCode()" class="fa-solid fa-copy copy"></i>
        <i class="fa-solid fa-angle-down sw-down"></i>
      </div>
    </div>
    <div class="code">
      <highlight :code="code" autodetect />
    </div>
  </div>
</template>

<style scoped lang="scss">
.code-item {
  margin-top: 40px;
  margin-bottom: 40px;
  background-color: var(--color-card-background);
  width: 80%;
  overflow: hidden;
  transition: 0.4s;

  &:hover {
    transform: scale(1.02) translateY(-6px);
    box-shadow: 0px 7.3px 1.4px rgba(0, 0, 0, 0.021),
      0px 14.4px 4.2px rgba(0, 0, 0, 0.028), 0px 22px 9.1px rgba(0, 0, 0, 0.032),
      0px 31.6px 17.8px rgba(0, 0, 0, 0.037),
      0px 48.3px 34.5px rgba(0, 0, 0, 0.044), 0px 100px 80px rgba(0, 0, 0, 0.07);
  }
  padding-top: 0px;
}

.code-head {
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  padding-top: 60px;
}

.icons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.copy {
  cursor: pointer;
  font-size: 28px;
  transition: 0.4s;
  margin-left: 15px;
  margin-right: 20px;
  &:hover {
    color: var(--color-purple);
  }
}

.sw-down {
  cursor: pointer;
  font-size: 38px;
  transition: 0.2s;
  transform: rotate(v-bind(rotate));
  &:hover {
    color: var(--color-purple);
  }
}

.code {
  font-size: 14px;
  text-align: left;
  transition: 0.3s;
  height: 500px;
  max-height: v-bind(codeHeight);
  overflow-y: auto;
}

p {
  font-size: 20px;
  text-align: left;
}
</style>
