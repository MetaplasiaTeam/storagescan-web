<script setup lang="ts">
import {
  TopBar,
  EnterAddress,
  ShowValues,
  ShowCode,
  SubBord,
} from './components'
</script>

<template>
  <TopBar />
  <p id="app-title">Online Get Contract Value Services</p>
  <EnterAddress />
  <ShowValues />
  <ShowCode />
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

#link-to-meta {
  color: #000;
  text-decoration: none;
  font-weight: bold;
}

.notyf {
  font-size: 24px;
}
</style>
