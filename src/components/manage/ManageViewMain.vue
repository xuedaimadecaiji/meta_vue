<template>
  <el-container class="ManageViewMain">
    <el-aside>
      <Navigation></Navigation>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import Navigation from './widgets/Navigation'
export default {
  name: 'ManageViewMain',
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
  .ManageViewMain{
    height: 100% !important;
    .el-aside{
      width: 250px!important;
    }
    .el-main{
      height: 100%;
      overflow-y: auto!important;
    }
  }
</style>
