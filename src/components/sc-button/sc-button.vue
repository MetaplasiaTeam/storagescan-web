<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button :class="outlined ? 'sc-button-outlined' : 'sc-button'">
    <slot v-if="!loading"></slot>
    <div v-else class="sc-loading"></div>
  </button>
</template>

<style scoped lang="scss">
@mixin button-hover {
  transition: 0.3s;
  &:hover {
    filter: drop-shadow(0 0 30px rgba(33, 85, 205, 0.3));
  }
}

@mixin button-active {
  &:active {
    transform: translateY(8px);
  }
}

.sc-button {
  cursor: pointer;
  width: 229px;
  height: 81px;
  margin-right: 40px;
  background-color: var(--color-purple);
  color: #fff;
  border-radius: 25px;
  border-style: none;
  font-size: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.6px 1.7px 2.2px rgba(121, 72, 234, 0.02),
    1.3px 4.1px 5.3px rgba(121, 72, 234, 0.028),
    2.5px 7.8px 10px rgba(121, 72, 234, 0.035),
    4.5px 13.8px 17.9px rgba(121, 72, 234, 0.042),
    8.4px 25.9px 33.4px rgba(121, 72, 234, 0.05),
    20px 62px 80px rgba(121, 72, 234, 0.07);
  @include button-hover;
  @include button-active;

  &.btn-loading {
    pointer-events: none;
    background-color: #e6e6e6;
    color: #2c3e50;
    box-shadow: 0.6px 1.7px 2.2px rgba(0, 0, 0, 0.02),
      1.3px 4.1px 5.3px rgba(0, 0, 0, 0.028),
      2.5px 7.8px 10px rgba(0, 0, 0, 0.035),
      4.5px 13.8px 17.9px rgba(0, 0, 0, 0.042),
      8.4px 25.9px 33.4px rgba(0, 0, 0, 0.05),
      20px 62px 80px rgba(0, 0, 0, 0.07);
  }
}

.sc-button-outlined {
  cursor: pointer;
  width: 229px;
  height: 81px;
  margin-right: 40px;
  background-color: var(--color-body-background);
  color: var(--color-text);
  border: 4px solid var(--color-radio);
  border-radius: 25px;
  font-size: 38px;
  transition: 0.3s;

  @include button-active;
}

.sc-loading {
  width: 30px;
  height: 30px;
  border: 4px solid #fff;
  border-top-color: transparent;
  border-radius: 100%;

  animation: circle infinite 0.75s linear;
}
</style>
