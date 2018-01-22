<template>
  <div id="app">
    <header-index>

    </header-index>
    <router-view>

    </router-view>
    <footerIndex>

    </footerIndex>
  </div>

</template>

<script type="text/ecmascript-6">
  import footerIndex from './components/footerIndex'
  import headerIndex from './components/headerIndex'

  export default {
    name: 'app',
    components: {
      'headerIndex': headerIndex,
      'footerIndex': footerIndex
    }
  }
</script>

<style>
</style>
