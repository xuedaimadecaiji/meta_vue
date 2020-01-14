<template>
  <el-container class="DatabaseViewMain">
    <el-header id="navigation">
      <Navigation> </Navigation>
    </el-header>
    <el-main id="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import Navigation from './widgets/Navigation'
export default {
  name: 'DatabaseViewMain',
  components: {
    Navigation
  }
}
</script>
<style scoped lang="scss">
    #navigation{
      height: 61px!important;
      background: #4A524F;
    }
    #main{
      height: calc(100% - 61px) !important;
      max-height: calc(100% - 61px) !important;
      overflow-y: auto;
    }
    .clearfix{
      clear:both
    }
</style>
