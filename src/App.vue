<template>
  <div id="app">
    <router-view />
    <!-- <Navigation id="app_navigation"></Navigation> -->
    <!-- <div class="clearfix"></div> -->
    <!-- <router-view id="app_main"></router-view> -->
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
  }
  .HomeIndex, .DatabaseIndex{
    h1{
      font-size: 30px;
      padding: 100px;
      margin: 0;
      text-align: center;
      background: #4A524F;
      color: gold;
    }
    .wrapper{
      max-width: 1000px;
      margin: auto;
      a{
        font-weight: bolder;
        font-size: larger;
        text-align: center!important;
        &:hover{
          .el-card{
            background: darkslategray!important;
            color: #ffffff;
          }
        }
      }
      .el-row{
        // margin: 50px 0;
      }
      .el-card__body{
        padding: 50px;
        text-align: center!important;
        i{
          font-size: x-large;
        }
      }
      .el-card{
        margin-bottom: 10px!important;
      }
      .add .el-card__body{
        padding: 30px!important;
      }
    }
  }
</style>
