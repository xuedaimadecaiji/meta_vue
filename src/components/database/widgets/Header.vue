<template>
  <el-row class="Header">
    <el-col :span="12">
      <router-link :to="{name: 'HomeIndex'}">
        <i class="fa fa-fw fa-database" style="font-size: larger"></i> {{title}}
      </router-link>
    </el-col>
    <el-col :span="12" style="text-align: right">
      <el-dropdown v-if="auth">
        <router-link class="el-dropdown-link"  :to="{name: 'PersonIndex'}">
          <i class="fa fa-fw fa-user"></i> {{auth['username']}}
        </router-link>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link :to="{name: 'PersonIndex'}">
              <i class="fa fa-fw fa-user"></i> 我的主页
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link :to="{name: 'PersonIndex'}">
              <i class="fa fa-fw fa-gear"></i> 设置
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text" @click="handleLogout">
              <i class="fa fa-fw fa-sign-out"></i> 退出登录
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <router-link  v-else v-for="item in navListRight" :key="item.index" :to="{name: item['name']}">
        <i :class="'fa fa-fw fa-' + item['icon']"></i> {{item['title']}}
      </router-link>
    </el-col>
    <div class="clear"></div>
  </el-row>
</template>

<script>
export default {
  name: 'Navigation',
  computed: {
    auth () {
      return this.$store.state.auth
    }
  },
  data () {
    return {
      title: '基础制造工艺资源环境负荷数据库',
      navListLeft: [
        {
          title: '工艺场景',
          icon: 'database',
          name: 'SceneIndex'
        },
        {
          title: '基础数据管理',
          icon: 'table',
          name: 'ManageIndex'
        },
        {
          title: '数据批处理',
          icon: 'download',
          name: 'BatchIndex'
        },
        {
          title: '数据查询',
          icon: 'search',
          name: 'SearchIndex'
        },
        {
          title: '用户管理',
          icon: 'users',
          name: 'UserIndex'
        }
      ],
      navListRight: [
        {
          title: '登录',
          name: 'Login'
        },
        {
          title: '注册',
          name: 'Register'
        }
      ]
    }
  },
  methods: {
    handleLogout () {
      this.$store.commit('logout')
      history.go(0)
    }
  }
}
</script>

<style scoped lang="scss">
  .Header{
    padding: 0 20px;
    height: 70px;
    line-height: 70px;
    background: #3c3c3c;
    .title{
      color: gold;
      font-size: 20px;
    }
    a{
      display: inline-block;
      color: #fff;
      font-size: 18px;
    }
    .router-link-active{
      color: gold;
    }
    .clear{
      clear: both;
    }
  }

</style>
