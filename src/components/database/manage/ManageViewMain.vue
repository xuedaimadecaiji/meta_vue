<template>
  <el-container class="ManageViewMain">
    <el-aside>
      <LeftNavigation></LeftNavigation>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import LeftNavigation from './widgets/LeftNavigation'
export default {
  name: 'ManageViewMain',
  components: {
    LeftNavigation
  }
}
</script>

<style lang="scss">
  .ManageViewMain{
    height: 100%;
    max-height: 100%;
    .el-aside{
      width: 250px!important;
    }
    .el-main{
      max-height: 100%;
      overflow-y: auto;
    }
  }
</style>
