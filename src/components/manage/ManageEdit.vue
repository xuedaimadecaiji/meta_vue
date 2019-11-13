<template>
  <div class="ManageEdit">
    <el-button type="primary" @click="handleEditDrawer(null)">
      <i class="fa fa-plus-circle fa-fw"></i> 添加新条目
    </el-button>
    <el-divider></el-divider>
    <el-table
      height="600"
      :data="tableList">
      <el-table-column
<<<<<<< .mine

=======
        :fixed="true"
>>>>>>> .theirs
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleEditDrawer(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDeleteDialog(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        :prop="column['columnName']"
        :label="column['columnComment']"
        v-for="column in tableColumns"
        :key="column.index"
        width="150">
      </el-table-column>
    </el-table>
    <el-drawer
      class="manageEditDrawer"
      title="编辑条目"
      :visible.sync="editDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form ref="postForm" v-model="editForm" label-width="150px">
<<<<<<< .mine
        <el-form-item :prop="item['columnName']" :label="item['columnComment']"
         v-for="item in tableColumns" :key="item.index">
          <el-input :disabled="item['columnName'] === 'id'" v-model="editForm[item['columnName']]" :type="item['dataType'] === 'int' ? 'number' : 'text'"></el-input>
=======
        <el-form-item :prop="item['columnName']" :label="item['columnComment']" v-for="item in tableColumns" :key="item.index">
          <el-input v-model="editForm[item['columnName']]" :type="item['dataType'] === 'int' ? 'number' : 'text'"
           :disabled="item['columnName'] === 'id'"></el-input>
>>>>>>> .theirs
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleSubmit">
            保存
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
  name: 'ManageEdit',
  data () {
    return {
      tableName: 'tableName',
      editDrawer: false,
      deleteDialogVisible: false,
      tableList: [],
      editForm: {},
      tableColumns: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.tableName = to.params['table']
      api.get({url: vm.tableName}).then(res => {
        vm.tableList = res
      })
      vm.handleColumns()
      vm.initEditForm()
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.tableName = to.params['table']
    api.get({url: this.tableName}).then(res => {
      this.tableList = res
    })
    this.handleColumns()
    this.makeEditForm()
    next()
  },
  methods: {
    makeEditForm () {
      this.editForm = {}
      this.tableColumns.forEach(item => {
        this.editForm[item['columnName']] = ''
      })
    },
    handleColumns () {
      this.$store.state.systemTable.forEach(table => {
        if (table['tableName'] === this.tableName) {
          this.tableColumns = table['systemColumnList']
        }
      })
    },
    handleSubmit () {
      // this.editForm['id'] 为undefined时，提交post，否则提交put
      if (this.editForm['id'] === undefined) {
        api.post({url: this.table, params: this.editForm}).then(res => {
          history.go(0)
        })
      } else {
        api.put({url: this.table, params: this.editForm}).then(res => {
          history.go(0)
        })
      }
    },
    handleEditDrawer (row) {
      this.editForm = {}
      if (row) {
        this.editForm = row
      }
      this.editDrawer = true
    },
    handleDeleteDialog (row) {
      this.editForm = row
      this.deleteDialogVisible = true
    },
    handleDelete () {
      api.delete({url: this.table + '/' + this.editForm['id']}).then(res => {
        // remove
        history.go(0)
      })
    }
  }
}
</script>

<style lang="scss">
  .manageEditDrawer{
    .el-drawer__body{
      height: 100px !important;
      form{
        height: 100% !important;
        overflow-y: auto!important;
      }
    }
  }
  .ManageEdit{
    padding: 20px;
  }
</style>
