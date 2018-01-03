<template>
  <div id="app">
    <router-view/>
    <footer_index></footer_index>
  </div>

</template>

<script type="text/ecmascript-6">
  import footer_index from './components/footer_index'

  export default {
    name: 'app',
    components: {
      footer_index
    }
  }
</script>

<style>
</style>
