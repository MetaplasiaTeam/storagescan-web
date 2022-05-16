<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { ref, watch } from 'vue'
import {
  TopBar,
  EnterAddress,
  ShowValues,
  ShowCode,
  SubBord,
} from './components'
import emitter from './emitter'
import { useDark } from '@vueuse/core'
import hljsVuePlugin from '@highlightjs/vue-plugin'

const highlight = hljsVuePlugin.component
const isDark = useDark()

import('highlight.js/styles/atom-one-light.css')
watch(isDark, (val) => {
  if (val) {
    import('highlight.js/styles/atom-one-dark.css')
  } else {
    import('highlight.js/styles/atom-one-light.css')
  }
})

let first = true
const showValueCard = ref(false)
const iconRotate = ref('180deg')

const valueData = ref<{ name: String; value: String }>()

watch(showValueCard, (val) => {
  iconRotate.value = val ? '0deg' : '180deg'
})

emitter.on('getValue', (val) => {
  if (first) {
    first = false
    showValueCard.value = true
  }
  valueData.value = val
})

const code = `
contract test {
    // slice type
    []uint256 public a;

    // mapping type
    mapping(uint256 => uint256) public b;

    // struct type
    struct Entity {
        []uint id;  
        mapping(uint256 => uint256)  value; 
        uint256 age;
    }
    Entity c; 
`
</script>

<template>
  <TopBar />
  <p id="app-title">Online Get Contract Value Services</p>
  <EnterAddress />
  <ShowValues />
  <ShowCode />
  <SubBord :id="'how-to-use'" :title="'How to use?'">
    <highlight :code="code" :language="'solidity'" />
    <ul>
      <li>
        slice usage:
        <ul>
          <li><code class="hljs javascript">a[0],a[1],a[2],...,a[n]</code></li>
        </ul>
      </li>
      <li>
        mapping usage:
        <ul>
          <li>
            <code class="hljs javascript"
              >b["key1"],b["key2"],b["key3"],...,b["keyn"]</code
            >
          </li>
        </ul>
      </li>
      <li>
        struct usage:
        <ul>
          <li>
            <code class="hljs javascript"
              >c.id[0],c.id[1],c.id[2],...,c.id[n]</code
            >
          </li>
          <li>
            <code class="hljs javascript">
              c.value["key1"],c.value["key2"],c.value["key3"],...,c.value["keyn"]</code
            >
          </li>
          <li><code class="hljs javascript">c.age</code></li>
        </ul>
      </li>
    </ul>
  </SubBord>
  <SubBord :id="'what-is-this'" :title="'What is this?'"
    >StorageScan is an online tool website that can get the values of all
    variables of verified contracts on
    <a href="https://etherscan.io/" target="_blank">ethscan</a> or
    <a href="https://bscscan.com/" target="_blank">bscscan</a>, including
    private variables.
  </SubBord>
  <SubBord :id="'how-it-work'" :title="'How it work?'">
    through
    <code class="hljs shell">solc --storage-layout target.sol</code>
    command, we can know the storage slot location and variable type of all
    variables of the contract, and use the
    <code class="hljs shell">web3.eth_getStorageAt()</code> method to get the
    value of the specified slot, so the combination of the two can get the value
    of the variable.</SubBord
  >
  <p id="footer">
    Copyright @ 2022
    <a href="https://metaplasia.io" target="_blank" id="link-to-meta"
      >metaplasia.io</a
    >
  </p>
  <div :class="showValueCard ? 'card' : 'card hide'" id="show-value-card">
    <i
      @click="showValueCard = !showValueCard"
      id="close-or-open-show-value-card"
      class="fa-solid fa-angle-right"
    ></i>
    <div id="show-value-card-content">
      <p id="title">Value in here</p>
      <p v-if="valueData !== undefined" id="value">
        {{ valueData?.value }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
@import '../style/base.scss';

#app-title {
  font-size: 58px;
  font-weight: bold;
  margin-bottom: 120px;
  margin-top: 160px;
}

#footer {
  font-size: 24px;
  margin-top: 120px;
  margin-bottom: 20px;
}

ul {
  margin-left: 0;
  padding-left: 40px;
}

#link-to-meta {
  color: var(--color-link);
  text-decoration: none;
  font-weight: bold;
}

.notyf {
  font-size: 24px;
}

#show-value-card {
  width: 500px;
  height: 300px;
  position: fixed;
  bottom: 40px;
  transition: 0.3s;
  right: 40px;

  &.hide {
    right: -500px;
  }

  #title {
    font-size: 38px;
    font-weight: bold;
  }

  #value {
    font-size: 24px;
    margin-top: 40px;
    word-wrap: break-word;
  }

  overflow: hidden;
}

#show-value-card-content {
  height: 100%;
  overflow-y: auto;
}

#close-or-open-show-value-card {
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 40px;
  font-size: 40px;
  transition: 0.3s;
  transform: rotate(v-bind(iconRotate));
}

@media screen and (max-width: 768px) {
  #show-value-card {
    width: 300px;
    height: 300px;
    bottom: 40px;
    border-radius: 0px;
    bottom: 0px;
    right: 0px;

    &.hide {
      right: -330px;
    }
  }
}
</style>
