<template>
  <div class="LeftNavigation">
    <router-link :to="{name: item.name}" v-for="item in navList" :key="item.index">
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
          title: '导入规范',
          name: 'BatchIndex'
        },
        {
          title: '批量导入',
          name: 'BatchImport'
        },
        {
          title: '批量导出',
          name: 'BatchExport'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
