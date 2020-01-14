<template>
  <div class="LeftNavigation">
    <router-link v-for="item in navList" :key="item.index" :to="{name: item.name}">
      <i :class="'fa fa-fw fa-' + item.icon"></i> {{item.title}}
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
          icon: 'vcard-o',
          name: 'UserIndex'
        },
        {
          title: '分组管理',
          icon: 'users',
          name: 'UserGroup'
        },
        {
          title: '权限管理',
          icon: 'key',
          name: 'UserPermission'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
