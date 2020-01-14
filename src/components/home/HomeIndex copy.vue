<template>
  <div class="HomeIndex">
    <div class="wrapper">
      <h1>
        欢迎来到，基础制造工艺资源环境负荷数据库
      </h1>
      <el-row :gutter="12">
        <el-col :span="8">
          <router-link :to="{name: 'SceneIndex'}">
            <el-card always="always">
              工艺场景管理
            </el-card>
          </router-link>
        </el-col>
        <el-col :span="8">
          <router-link :to="{name: 'ManageIndex'}">
            <el-card always="always">
              基础数据管理
            </el-card>
          </router-link>
        </el-col>
        <el-col :span="8">
          <router-link :to="{name: 'BatchIndex'}">
            <el-card always="always">
              批量数据处理
            </el-card>
          </router-link>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <router-link :to="{name: 'SearchIndex'}">
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
  name: 'HomeIndex',
  methods: {}
}
</script>

<style lang="scss">
</style>
