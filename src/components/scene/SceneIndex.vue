<template>
  <div class="SceneIndex">
    <div class="wrapper">
      <h1>
        欢迎来到，基础制造工艺资源环境负荷数据库
      </h1>
      <el-row :gutter="12" v-for="sub in navList" :key="sub.index">
        <el-col :span="12" v-for="item in sub.children" :key="item.index">
          <router-link :to="{name: 'SceneCategory', query:{category: item['id']}}">
            <el-card always="always">
              {{ item['title'] }}
            </el-card>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SceneIndex',
  computed: {
    navList () {
      return this.$store.state.categories
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  .SceneIndex{
    .wrapper{
      max-width: 1000px;
      margin: auto;
      h1{
        font-size: 30px;
        margin: 100px;
        text-align: center;
      }
      a{
        font-weight: bolder;
        font-size: larger;
        text-align: center!important;
        &:hover{
          .el-card{
            background: darkslategray!important;
            color: #ffffff;
          }
        }
      }
      .el-card__body{
        padding: 50px;
        text-align: center!important;
      }
      .el-card{
        margin-bottom: 10px!important;
      }
    }
  }
</style>
