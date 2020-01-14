<template>
  <div class="Breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: item['name'] }" v-for="item in navList" :key="item.index">
        <i v-if="item['icon']" :class="'fa fa-fw fa-' + item['icon']"></i> {{item['title']}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'Breadcrumb',
  computed: {
    categoryId () {
      return this.$route.params['categoryId']
    },
    navList () {
      return this.$store.state.breadcrumbList
    },
    databaseList () {
      return this.$store.state.categories[0]['children']
    }
  },
  data () {
    return {
      value: 0
    }
  }
}
</script>
<style lang="scss">
  .Breadcrumb{
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    .el-breadcrumb{
      height: 39px;
      line-height: 39px;
      .el-breadcrumb__item, .el-breadcrumb__inner, .is-link{
        color: aliceblue!important;
      }
    }
  }
</style>
