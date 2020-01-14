<template>
  <div class="HomeIndex">
    <h1>
      欢迎来到，基础制造工艺资源环境负荷数据库
    </h1>
    <div class="wrapper">
      <el-row :gutter="20" v-for="sub in navList" :key="sub.index">
        <el-col :span="12" v-for="item in sub.children" :key="item.index">
          <router-link :to="{name: 'DatabaseIndex', params:{categoryId: item['id']}}">
            <el-card always="always">
              <i class="fa fa-fw fa-database"></i>  {{ item['title'] }}数据库
            </el-card>
          </router-link>
        </el-col>
        <el-col :span="24">
          <el-card class="add">
            <el-button type="text" @click="handleAdd">
              <i class="fa fa-fw fa-plus-circle"></i> 添加数据库
            </el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  computed: {
    navList () {
      return this.$store.state.categories
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleAdd () {
      this.$message.warning('新增数据库功能暂未开放')
    }
  }
}
</script>

<style lang="scss">
.HomeIndex{
  h1{
    margin-bottom: 50px;
  }
}
</style>
