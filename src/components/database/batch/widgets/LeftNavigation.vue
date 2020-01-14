<template>
  <div class="LeftNavigation">
    <router-link :to="{name: item.name}" v-for="item in navList" :key="item.index">
      <i :class="'fa fa-fw fa-' + item['icon']"></i>{{item.title}}
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
          icon: 'file-text-o',
          name: 'BatchIndex'
        },
        {
          title: '批量导入',
          icon: 'upload',
          name: 'BatchImport'
        },
        {
          title: '批量导出',
          icon: 'download',
          name: 'BatchExport'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
