<template>
  <div id="app">
    <router-view />
    <!-- <Navigation id="app_navigation"></Navigation> -->
    <!-- <div class="clearfix"></div> -->
    <!-- <router-view id="app_main"></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
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
  }
</style>
