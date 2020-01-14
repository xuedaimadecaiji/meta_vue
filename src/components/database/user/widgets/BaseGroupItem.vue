<template>
  <el-card class="box-card BaseGroupItem">
    <el-row class="title" :gutter="10">
      <el-col :span="8" style="font-weight: bolder">
        {{item['title']}}
      </el-col>
      <el-col :span="8">
        <span>创建时间：{{item['createdAt']}}</span>
      </el-col>
      <el-col :span="8" style="text-align: right">
        <el-button type="primary" size="mini">
          申请加入
        </el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-tag type="success" v-for="permissionData in permissionDataList" :key="permissionData.index">
      {{permissionData['permission']['category']['title']}} {{' · ' + permissionData['permission']['permissionOperation']['title']}}
    </el-tag>
  </el-card>
</template>

<script>
export default {
  name: 'BaseGroupItem',
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    permissionDataList () {
      return this.item['permissionDataList']
    }
  }
}
</script>

<style lang="scss">
  .BaseGroupItem{
    margin: 10px 0;
  }
</style>
