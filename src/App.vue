<template>
  <div id="app">
    <footerIndex></footerIndex>
    <router-view></router-view>
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
