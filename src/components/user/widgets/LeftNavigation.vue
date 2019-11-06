<template>
  <div class="LeftNavigation">
    <router-link v-for="item in navList" :key="item.index" :to="{name: item.name}">
      {{item.title}}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'LeftNavigation',
  data () {
    return {
      navList: [
        {
          title: '用户信息',
          name: 'UserIndex'
        },
        {
          title: '分组管理',
          name: 'UserGroup'
        },
        {
          title: '权限管理',
          name: 'UserPermission'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
