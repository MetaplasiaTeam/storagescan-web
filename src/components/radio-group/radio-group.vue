<script setup lang="ts">
import { ref } from 'vue'

let prop = defineProps({
  items: {
    type: Object,
    default: () => [{ name: '', key: '' }],
  },
  currItemName: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['handleClickItem'])

let _currItemName = ref(prop.currItemName)

function clickItem(item: any) {
  _currItemName.value = item.name
  emit('handleClickItem', item.key)
}
</script>

<template>
  <div class="radio-group">
    <span
      v-for="(item, index) in items"
      :key="index"
      :class="{ active: _currItemName === item.name }"
      @click="clickItem(item)"
    >
      {{ item.name }}</span
    >
  </div>
</template>

<style scoped lang="scss">
.radio-group {
  font-size: 24px;
}

span {
  padding: 5px 15px;
  margin-left: 40px;
  border: 2px solid var(--color-text);
  transition: 0.3s;
  border-radius: 20px;
  color: var(--color-radio);
  &:hover {
    color: var(--color-purple);
    cursor: pointer;
  }
}

.active {
  color: var(--color-purple);
  border: 2px solid var(--color-purple);
}
</style>
