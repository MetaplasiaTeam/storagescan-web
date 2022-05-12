<script setup lang="ts">
import hljsVuePlugin from '@highlightjs/vue-plugin'
import { ref, watch } from 'vue'

let highlight = hljsVuePlugin.component
let show = ref(false)
let codeHeight = ref('0px')
let rotate = ref('0deg')

defineProps({
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
</script>

<template>
  <div class="code-item card">
    <div class="code-head">
      <p>{{ title }}</p>
      <i @click="show = !show" class="fa-solid fa-angle-down sw-down"></i>
    </div>
    <div class="code"><highlight :code="code" language="solidity" /></div>
  </div>
</template>

<style scoped lang="scss">
.code-item {
  margin-top: 40px;
  margin-bottom: 40px;
  background-color: var(--color-card-background);
  width: 80%;
  overflow: hidden;
}

.code-head {
  display: flex;
  justify-content: space-between;
}

.sw-down {
  cursor: pointer;
  font-size: 38px;
  transition: 0.2s;
  transform: rotate(v-bind(rotate));
}

.code {
  font-size: 14px;
  text-align: left;
  transition: 0.3s;
  height: 500px;
  max-height: v-bind(codeHeight);
  overflow-y: scroll;
}

p {
  font-size: 20px;
  text-align: left;
}
</style>
