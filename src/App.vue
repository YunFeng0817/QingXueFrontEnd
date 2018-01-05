<template>
  <div id="app">
    <router-view></router-view>
    <footerIndex></footerIndex>
  </div>

</template>

<script type="text/ecmascript-6">
  import footerIndex from './components/footerIndex'

  export default {
    name: 'app',
    components: {
      footerIndex
    }
  }
</script>

<style>
</style>
