<template>
  <div class="LeftNavigation">
    <el-card class="box-card" v-for="sub in navList" :key="sub.index">
      <div slot="header" class="clearfix">
        <span><i :class="'fa fa-fw fa-' + sub.icon"></i> &nbsp;{{sub.title}}</span>
      </div>
      <router-link :to="{name: 'ManageEdit', params: {table: item.name}}"
                   :index="sub.index + '-' + item.index" v-for="item in sub.children" :key="item.index">
        {{item.title}}
      </router-link>
    </el-card>
  </div>
</template>

<script>
export default {
  // #545c64 #ffd04b
  name: 'Navigation',
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
  .LeftNavigation{
    height: calc(100% - 40px);
    padding: 20px 10px;
    background: #545c64;
    .el-card{
      border-radius: 0;
      border-color: #777;
      margin: 10px;
      background: transparent;
      .el-card__header{
        color: #ffffff!important;
        font-size: 16px;
      }
    }
    a{
      margin: 15px 0;
      padding: 0 10px;
      display: block;
      color: #ffffff;
      font-size: 15px;
    }
    .router-link-exact-active{
      color: gold;
    }
  }
</style>
