<template>
  <div class="Category">
    <el-button type="primary" @click="postDrawer = true">
      <i class="fa fa-plus-circle fa-fw"></i> 添加新分类
    </el-button>
    <el-divider></el-divider>
    <el-table
      height="600"
      :data="categoryList">
      <el-table-column
        fixed
        label="所属父类"
        sortable
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row['parent'] === null ? '根节点' : scope.row['parent']['title']  }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="分类名称"
        width="150">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handlePutDrawer(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDeleteDialog(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="编辑数据"
      :visible.sync="putDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form ref="putCategoryForm" v-model="selectCategory" label-width="100px">
        <el-form-item label="分类名称" prop="title">
          <el-input v-model="selectCategory.title"></el-input>
        </el-form-item>
        <el-form-item label="父分类" prop="parentId">
          <el-cascader
            v-model="putCategoryList"
            clearable
            :options="categories"
            @change="handleChangePut"
            :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'title', value: 'id' }">
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handlePut">
            保存更改
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-drawer
      title="新增分类"
      :visible.sync="postDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form ref="postCategoryForm" v-model="postCategoryForm" label-width="100px">
        <el-form-item label="分类名称" prop="title">
          <el-input v-model="postCategoryForm.title"></el-input>
        </el-form-item>
        <el-form-item label="父分类" prop="parentId">
          <el-cascader
            v-model="postCategoryList"
            clearable
            :options="categories"
            @change="handleChangePost"
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
    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="400px">
      <span>确定删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from 'api'
export default {
  name: 'Category',
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  data () {
    return {
      selectCategory: {},
      putCategoryList: [],
      postCategoryList: [],
      postCategoryForm: {
        title: null,
        parentId: null
      },
      selectScene: {
        category: {}
      },
      categoryList: [],
      putDrawer: false,
      postDrawer: false,
      deleteDialogVisible: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      api.get({url: 'categories'}).then(res => {
        vm.categoryList = res
      })
    })
  },
  methods: {
    handlePutDrawer (row) {
      this.selectCategory = row
      this.putCategoryList = []
      this.putCategoryList.push(this.categoryList[0]['id'])
      this.search(this.selectCategory['id'], this.putCategoryList, this.categoryList[0], this.categoryList, 0)
      this.putDrawer = true
    },
    handleChangePut (value) {
      this.selectCategory.parentId = value[value.length - 1]
    },
    handlePut () {
      if (this.putCategoryList.length !== 0) {
        this.selectCategory.parentId = this.putCategoryList[this.putCategoryList.length - 1]
      }
      api.put({url: 'categories', params: this.selectCategory}).then(res => {
        this.$store.commit('removeCategories')
        history.go(0)
      })
    },
    handlePost () {
      api.post({url: 'categories', params: this.postCategoryForm}).then(res => {
        this.$store.commit('removeCategories')
        history.go(0)
      })
    },
    handleChangePost (value) {
      this.postCategoryForm.parentId = value[value.length - 1]
    },
    handleDeleteDialog (row) {
      this.selectCategory = row
      this.deleteDialogVisible = true
    },
    handleDelete () {
      api.delete({url: 'categories/' + this.selectCategory['id']}).then(res => {
        this.$store.commit('removeCategories')
        history.go(0)
      })
    },
    search (searchId, path, node, list, i) {
      if (node['id'] === searchId) {
        // 由于查询的是父结点，所以要弹出当前结点
        path.pop()
        return true
      }
      for (; i < list.length; i++) {
        if (node['id'] === list[i]['parentId']) {
          path.push(list[i]['id'])
          if (!this.search(searchId, path, list[i], list, i + 1)) {
            path.pop()
          } else {
            return true
          }
        }
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>
