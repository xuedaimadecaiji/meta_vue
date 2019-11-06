<template>
  <el-card class="box-card JoinGroupItem">
    <div class="title">
      {{userGroup['title']}}
      <span>加入时间：{{item['createdAt']}}</span>
    </div>
    <el-divider></el-divider>
    <el-tag type="success" v-for="permissionData in userGroup['permissionDataList']" :key="permissionData.index">
      {{permissionData['permission']['category']['title']}} {{' · ' + permissionData['permission']['permissionOperation']['title']}}
    </el-tag>
  </el-card>
</template>

<script>
export default {
  name: 'JoinGroupItem',
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    userGroup () {
      return this.item['userGroup']
    }
  }
}
</script>

<style scoped>

</style>
