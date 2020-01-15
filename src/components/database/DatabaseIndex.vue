<template>
  <div class="DatabaseIndex">
    <div class="wrapper">
      <h3 v-if="title">
        欢迎来到，{{title}}负荷数据库
      </h3>
      <h3 v-else>
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
  computed: {
    title () {
      let temp = null
      this.$store.state.categories[0]['children'].forEach(item => {
        if (parseInt(this.categoryId) === item['id']) {
          temp = item['title']
        }
      })
      return temp
    }
  },
  data () {
    return {
      categoryId: 0
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.categoryId = to.params['categoryId']
      vm.setBreadCrumb()
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.categoryId = to.params['categoryId']
    this.setBreadCrumb()
    next()
  },
  methods: {
    setBreadCrumb () {
      let title = '机加工数据库'
      this.$store.state.categories[0]['children'].forEach(item => {
        if (item['id'] === parseInt(this.categoryId)) {
          title = item['title']
        }
      })
      let list = [
        {
          name: 'HomeIndex',
          title: '主页',
          icon: 'home',
          params: {},
          query: {}
        },
        {
          name: 'DatabaseIndex',
          title: title + '数据库',
          icon: 'database',
          params: {},
          query: {}
        }
      ]
      this.$store.commit('setBreadcrumbList', list)
    }
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
