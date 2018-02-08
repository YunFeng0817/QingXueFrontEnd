<template>
  <div id="app">
    <router-view>
    </router-view>
    <footerIndex>
    </footerIndex>
  </div>

</template>

<script type="text/ecmascript-6">
  import footerIndex from './components/footerIndex'

  export default {
    name: 'app',
    components: {
      'footerIndex': footerIndex
    },
    created () {
      document.documentElement.style = 'max-width:450px;max-height:800px;min-height:0;height:100%;overflow-y: scroll;overflow-x: hidden;';
    }
  }
</script>

<style>
</style>
