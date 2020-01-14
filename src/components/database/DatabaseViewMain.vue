<template>
  <el-container class="DatabaseViewMain">
    <el-header id="header">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside id="navigation">
        <Navigation></Navigation>
      </el-aside>
      <el-main id="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from './widgets/Header'
import Navigation from './widgets/Navigation'
export default {
  name: 'DatabaseViewMain',
  components: {
    Header,
    Navigation
  }
}
</script>
<style scoped lang="scss">
    #header{
      height: 70px!important;
      background: #4A524F;
    }
    #navigation{
      width: 200px!important;
    }
    #main{
      height: calc(100% - 0px) !important;
      max-height: calc(100% - 0px) !important;
      overflow-y: auto;
    }
    .clearfix{
      clear:both
    }
</style>
