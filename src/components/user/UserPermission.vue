<template>
  <div class="UserPermission">
    <el-button type="primary" @click="postDrawer = true">
      <i class="fa fa-fw fa-plus-circle"></i> 新增权限
    </el-button>
    <el-divider></el-divider>
    <el-table
      :data="permissionList">
      <el-table-column
        label="权限标题"
        width="200">
        <template slot-scope="scope">
          {{ scope.row['title'] }}
        </template>
      </el-table-column>
      <el-table-column
        label="权限操作"
        width="180">
        <template slot-scope="scope">
          <el-tag type="success">{{ scope.row['permissionOperation']['title'] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="权限对象"
        width="180">
        <template slot-scope="scope">
          <el-tag type="primary">{{ scope.row['category']['title'] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="权限描述"
        width="200">
        <template slot-scope="scope">
          {{ scope.row['description'] }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="我是标题"
      :visible.sync="postDrawer"
      :direction="'rtl'"
      size="50%">
      <el-form ref="postForm" v-model="postForm" label-width="120px">
        <el-form-item prop="title" label="权限标题">
          <el-input v-model="postForm.title"></el-input>
        </el-form-item>
        <el-form-item prop="description" label="权限描述">
          <el-input type="textarea" v-model="postForm.description"></el-input>
        </el-form-item>
        <el-form-item prop="permissionOperationId" label="权限操作">
          <el-select v-model="postForm.permissionOperationId" filterable placeholder="请选择">
            <el-option
              v-for="item in permissionOperationList"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="description" label="权限实施对象">
          <el-cascader
            v-model="selectCategoryList"
            clearable
            :options="categories"
            :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'title', value: 'id' }">
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handlePost">
            立即创建
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import api from 'api'
export default {
  name: 'UserPermission',
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  data () {
    return {
      selectCategoryList: [],
      permissionList: [],
      permissionOperationList: [],
      postDrawer: false,
      postForm: {
        title: null,
        description: null,
        permissionOperationId: null,
        categoryId: null
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      api.get({url: 'permission'}).then(res => {
        vm.permissionList = res
      })
      api.get({url: 'permission/operation'}).then(res => {
        vm.permissionOperationList = res
      })
    })
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row)
    },
    handlePost () {
      this.postForm.categoryId = this.selectCategoryList[this.selectCategoryList.length - 1]
      api.post({url: 'permission', params: this.postForm}).then(res => {
        history.go(0)
      })
    }
  }
}
</script>

<style scoped>

</style>
