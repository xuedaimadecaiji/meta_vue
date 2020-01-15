<template>
  <el-container class="DatabaseViewMain">
    <el-header>
      <Header id="header"></Header>
      <Breadcrumb id="breadcrumb"></Breadcrumb>
    </el-header>
    <el-container id="main">
      <el-aside id="navigation">
        <Navigation></Navigation>
      </el-aside>
      <el-main id="content">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer id="footer">

    </el-footer>
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
      height: 70px!important;
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
      height: calc(100% - 110px) !important;
      max-height: calc(100% - 110px) !important;
      overflow-y: auto;
    }
    #content{
      height: 100% !important;
      max-height: 100% !important;
      overflow-y: auto;
    }
    .clearfix{
      clear:both
    }
</style>
