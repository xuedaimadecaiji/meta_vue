<template>
  <el-container class="UserViewMain">
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
  name: 'UserViewMain',
  components: {
    LeftNavigation
  }
}
</script>

<style lang="scss">
  .UserViewMain{
    .el-card{
      margin: 10px 0;
    }
  }
</style>
