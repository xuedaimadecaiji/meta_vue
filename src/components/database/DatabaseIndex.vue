<template>
  <div class="DatabaseIndex">
    <div class="wrapper">
      <h3>
        欢迎来到，基础制造工艺资源环境负荷数据库
      </h3>
      <el-row :gutter="12">
        <el-col :span="8">
          <router-link :to="{name: 'SceneIndex', params: {categoryId: categoryId}}">
            <el-card always="always">
              工艺场景管理
            </el-card>
          </router-link>
        </el-col>
        <el-col :span="8">
          <router-link :to="{name: 'ManageIndex', params: {categoryId: categoryId}}">
            <el-card always="always">
              基础数据管理
            </el-card>
          </router-link>
        </el-col>
        <el-col :span="8">
          <router-link :to="{name: 'BatchIndex', params: {categoryId: categoryId}}">
            <el-card always="always">
              批量数据处理
            </el-card>
          </router-link>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <router-link :to="{name: 'SearchIndex', params: {categoryId: categoryId}}">
            <el-card always="always">
              <i class="fa fa-fw fa-search"></i> RESTful 查询
            </el-card>
          </router-link>
        </el-col>
        <el-col :span="12">
          <router-link :to="{name: 'UserIndex'}">
            <el-card always="always">
              <i class="fa fa-fw fa-users"></i> 用户权限管理
            </el-card>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatabaseIndex',
  data () {
    return {
      categoryId: 0
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.categoryId = to.params['categoryId']
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.categoryId = to.params['categoryId']
    next()
  }
}
</script>

<style lang="scss">
  .DatabaseIndex{
    h3{
      padding: 20px;
      font-size: 25px;
      text-align: center;
    }
  }
</style>
