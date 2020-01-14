<template>
  <div class="Navigation">
    <router-link v-for="item in navListLeft" :key="item.index" :to="{name: item['name']}">
      <i :class="'fa fa-fw fa-' + item['icon']"></i> {{item['title']}}
    </router-link>
  </div>
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
      title: '工艺数据库',
      navListLeft: [
        {
          title: '工艺场景',
          icon: 'cubes',
          name: 'SceneIndex'
        },
        {
          title: '基础数据',
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
  .Navigation{
    height: 100%;
    background: #333333;
    a{
      display: block;
      padding: 15px 20px;
      color: #fff;
    }
    i{
      margin-right: 3px;
    }
    .router-link-active{
      color: gold;
      background: #545C64;
    }
  }

</style>
