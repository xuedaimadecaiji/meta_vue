<template>
  <div id="app">
    <Navigation id="app_navigation"></Navigation>
    <div class="clearfix"></div>
    <router-view id="app_main"></router-view>
  </div>
</template>

<script>
import Navigation from './components/widgets/Navigation'
import Footer from './components/widgets/Footer'
export default {
  name: 'App',
  components: {
    Navigation,
    Footer
  },
  mounted () {
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState () {
      localStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    max-height: 100%;
    #app_navigation{
      height: 61px!important;
      background: #4A524F;
    }
    #app_main{
      height: calc(100% - 61px) !important;
      max-height: calc(100% - 61px) !important;
      overflow-y: auto;
    }
    .clearfix{
      clear:both
    }
  }
</style>
