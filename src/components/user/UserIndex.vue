<template>
  <div class="UserIndex">
    <el-row class="groupSearch" :gutter="20">
      <el-col :span="12">
        <el-input placeholder="搜索用户" v-model="content" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-table
      stripe
      :data="userList">
      <el-table-column
        label="用户名"
        width="200">
        <template slot-scope="scope">
          {{ scope.row['username'] }}
        </template>
      </el-table-column>
      <el-table-column
        label="用户邮箱"
        width="200">
        <template slot-scope="scope">
          {{ scope.row['email'] }}
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="200">
        <template slot-scope="scope">
          {{ scope.row['createdAt'] }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="handleManage(scope.row)"
            type="text"
            size="small">
            管理用户
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from 'api'
export default {
  name: 'UserIndex',
  data () {
    return {
      content: '',
      userList: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.content = to.query['content'] ? to.query['content'] : ''
      api.get({url: 'users/search', params: {content: vm.content}}).then(res => {
        vm.userList = res
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.content = to.query['content'] ? to.query['content'] : ''
    api.get({url: 'users/search', params: {content: this.content}}).then(res => {
      this.userList = res
    })
    next()
  },
  methods: {
    handleManage (row) {
      console.log(row)
    },
    handleSearch () {
      this.$router.push({name: 'UserIndex', query: {content: this.content}})
    }
  }
}
</script>

<style scoped>

</style>
