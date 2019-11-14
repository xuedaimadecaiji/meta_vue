<template>
  <div class="LeftNavigation">
    <el-card class="box-card" v-for="sub in navList" :key="sub.index">
      <div slot="header" class="clearfix">
        <span><i :class="'fa fa-fw fa-' + sub.icon"></i> &nbsp;{{sub.title}}</span>
      </div>
      <router-link :to="{name: 'ManageEdit', params: {table: item['tableName']}}"
                   v-for="item in systemTable" :key="item.index" v-show="item['tableComment'].split('_')[0] === sub.title">
        {{item['tableComment'].split('_')[1]}}
      </router-link>
    </el-card>
  </div>
</template>

<script>
export default {
  // #545c64 #ffd04b
  name: 'Navigation',
  computed: {
    systemTable () {
      return this.$store.state.systemTable
    }
  },
  data () {
    return {
      navList: [
        {
          title: '基础表',
          icon: 'dashboard'
        },
        // {
        //   title: '数据表',
        //   icon: 'database'
        // },
        {
          title: '辅助表',
          icon: 'gears'
        },
        {
          title: '用户相关表',
          icon: 'users'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .LeftNavigation{
    max-height: 100% !important;
    overflow-y: auto!important;
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
