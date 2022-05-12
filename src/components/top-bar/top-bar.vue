<script setup lang="ts">
import { onMounted, ref } from 'vue'

onMounted(() => {
  window.addEventListener('scroll', handleScroll, true)
})

let i = 0
let showBar = ref(true)

function handleScroll() {
  var scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  var scroll = scrollTop - i
  i = scrollTop
  if (Math.abs(scroll) >= 50) {
    if (scroll < 0) {
      showBar.value = true
    } else {
      showBar.value = false
    }
  }
}
</script>

<template>
  <div id="top-bar" :class="showBar ? 'up' : 'down'">
    <div id="top-bar-div">
      <div id="left">
        <h1>Storage<span style="color: var(--color-purple)">Scan</span></h1>
      </div>
      <div id="right">
        <a href="#what-is-this">What is this?</a>
        <a href="#how-it-work">How is works?</a>
        <a href="https://twitter.com/@lianyanshe" target="_blank"
          ><i class="fa-brands fa-twitter"></i
        ></a>
        <a href="https://github.com/MetaplasiaTeam" target="_blank"
          ><i class="fa-brands fa-github"></i
        ></a>
        <a href="https://t.me/metaplasia_io" target="_blank"
          ><i class="fa-brands fa-telegram"></i
        ></a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#top-bar {
  position: fixed;
  display: flex;
  padding-top: 28px;
  padding-bottom: 28px;
  justify-content: center;
  width: 100%;
  background-color: #f2f6fa;
  transition: 0.2s;

  &.up {
    padding-top: 28px;
    padding-bottom: 28px;
    opacity: 1;
  }

  &.down {
    padding-top: 18px;
    padding-bottom: 18px;
    background-color: #f2f6fa80;
    backdrop-filter: blur(10px);
  }

  @-moz-document url-prefix() {
    &.down {
      background-color: #f2f6fad8;
    }
  }
}

#top-bar-div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 85%;
}

h1 {
  font-size: 48px;
}

a {
  color: #000;
  text-decoration: none;
}

a,
i {
  cursor: pointer;
  font-size: 28px;
  transition: 0.3s;
  margin-left: 24px;

  &:hover {
    color: var(--color-purple);
  }
}

#right {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
