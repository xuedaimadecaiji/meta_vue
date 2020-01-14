<template>
  <el-container class="DatabaseViewMain">
    <el-header>
      <Header id="header"></Header>
      <!-- <Breadcrumb id="breadcrumb"></Breadcrumb> -->
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
import Breadcrumb from './widgets/Breadcrumb'
import Navigation from './widgets/Navigation'
export default {
  name: 'DatabaseViewMain',
  components: {
    Header,
    Breadcrumb,
    Navigation
  }
}
</script>
<style scoped lang="scss">
    #header{
      height: 71px!important;
      background: #4A524F;
    }
    #breadcrumb{
      height: 40px!important;
      background: #2D2D2D;
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
