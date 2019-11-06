<template>
  <el-container id="app">
    <el-header id="navigation">
      <Navigation></Navigation>
    </el-header>
    <el-main id="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import Navigation from './components/widgets/Navigation'
import Footer from './components/widgets/Footer'
export default {
  name: 'App',
  components: {
    Navigation,
    Footer
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    min-height: 100%;
    #navigation{
      /*width: 250px!important;*/
      background: #4A524F;
    }
    #main{
      padding: 0;
      height: 100%;
      display: block;
    }
  }
</style>
