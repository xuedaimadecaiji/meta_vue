<template>
  <el-container class="BatchViewMain">
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
  name: 'BatchViewMain',
  components: {
    LeftNavigation
  }
}
</script>

<style scoped>

</style>
