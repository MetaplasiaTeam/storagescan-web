<script setup lang="ts">
defineProps({
  title: String,
  message: String,
})
</script>

<template>
  <div class="bord">
    <p id="title">{{ title }}</p>
    <p id="message"><slot></slot></p>
  </div>
</template>

<style scoped lang="scss">
.bord {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: start;
  width: 80%;
  align-self: center;
  margin-top: 60px;
  margin-bottom: 30px;
}

#title {
  font-size: 36px;
  font-weight: bold;
}

#message {
  font-size: 24px;
}
</style>
