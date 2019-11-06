<template>
  <div class="EnvLoad">
    <el-table
      height="600"
      :data="materialList">
      <el-table-column
        fixed
        prop="title"
        label="标题"
        width="150">
      </el-table-column>
      <el-table-column
          label="所属分类"
          sortable
          width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row['category']['title'] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handlePut(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="编辑数据"
      :visible.sync="putDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form>
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import api from 'api'
export default {
  name: 'EnvLoad',
  data () {
    return {
      putDrawer: false,
      materialList: [],
      putEnvLoadForm: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      api.get({url: 'env_load'}).then(result => {
        vm.materialList = result
      })
    })
  },
  methods: {
    handlePut (row) {
      this.putDrawer = true
      console.log(row)
    }
  }
}
</script>

<style lang="scss">
  .EnvLoad{
    .el-table{
    }
  }
</style>
