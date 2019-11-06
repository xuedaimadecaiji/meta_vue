<template>
  <div class="ManageIndex">
    <h1>
      基础数据管理中心
    </h1>
    <el-divider></el-divider>
    <el-row :gutter="12" v-for="sub in navList" :key="sub.index">
      <el-col :span="24">
        <h3>{{sub.title}}</h3>
      </el-col>
      <el-col :span="6" v-for="item in sub.children" :key="item.index">
        <router-link :to="{name: 'ManageEdit', params: {table: item.name}}">
          <el-card always="always">
            {{item.title}}
          </el-card>
        </router-link>
      </el-col>
      <el-col :span="24">
        <el-divider></el-divider>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ManageIndex',
  computed: {
    navList () {
      return this.$store.state.manageNavList
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  .ManageIndex{
    h1{
      text-align: center;
      margin: 20px 20px 50px 20px;
    }
    .el-row{
      margin: 20px 0;
    }
    .el-card{
      margin-bottom: 20px!important;
    }
    a{
      font-weight: bolder;
      text-align: center!important;
      &:hover{
        .el-card{
          background: darkslategray!important;
          color: #ffffff;
        }
      }
    }
  }
</style>
