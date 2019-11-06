<template>
  <el-card class="box-card OwnGroupItem">
    <div class="title">
      {{item['title']}}
    </div>
    <el-divider></el-divider>
    <el-tag type="success" v-for="permissionData in item['permissionDataList']" :key="permissionData.index">
      {{permissionData['permission']['category']['title']}} {{' · ' + permissionData['permission']['permissionOperation']['title']}}
    </el-tag>
  </el-card>
</template>

<script>
export default {
  name: 'OwnGroupItem',
  props: {
    item: {
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
