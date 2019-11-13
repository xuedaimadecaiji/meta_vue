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
        :fixed="true"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleEditDrawer(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDeleteDialog(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="column['columnComment']"
        v-for="column in tableColumns"
        :key="column.index"
        width="150">
        <template slot-scope="scope">
          {{((column['columnKey'] === 'MUL') && (scope.row[column['columnName']] !== null)) ?
          ((scope.row[column['columnName'].substring(0, column['columnName'].length - 2)] === null) ||
            (scope.row[column['columnName'].substring(0, column['columnName'].length - 2)] === undefined) ?
           'null' : scope.row[column['columnName'].substring(0, column['columnName'].length - 2)]['title'])
           : scope.row[column['columnName']]}}
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      class="manageEditDrawer"
      title="编辑条目"
      :visible.sync="editDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form ref="postForm" v-model="editForm" label-width="150px">
        <el-form-item :prop="item['columnName']" :label="item['columnComment']" v-show="item['columnName'] !== 'id'"
         v-for="item in tableColumns" :key="item.index">
          <el-input v-if="item['columnKey'] !== 'MUL'" v-model="editForm[item['columnName']]"
           :type="item['dataType'] === 'int' ? 'number' : 'textarea'">
          </el-input>
          <el-select v-if="item['columnKey'] === 'MUL'"  v-model="editForm[item['columnName']]" filterable placeholder="请选择">
            <el-option
              v-for="item in baseTableMap[item['columnName']]"
              :key="item.id"
              :label="item['title']"
              :value="item.id">
            </el-option>
          </el-select>
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
  computed: {
    baseTableMap () {
      return this.$store.state.baseTableMap
    }
  },
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
      // 取消网络请求，直接从store中读取基础数据，注意键需要加上‘_id’
      vm.tableList = vm.$store.state.baseTableMap[vm.handleTableFormat(vm.tableName)]
      vm.handleColumns()
      vm.initEditForm()
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.tableName = to.params['table']
    this.tableList = this.$store.state.baseTableMap[this.handleTableFormat(this.tableName)]
    this.handleColumns()
    this.initEditForm()
    next()
  },
  methods: {
    initEditForm () {
      this.editForm = {}
      this.tableColumns.forEach(item => {
        this.editForm[item['columnName']] = ''
      })
    },
    handleTableFormat (str) {
      let temp = ''
      str.split('_').forEach(item => {
        temp += item.slice(0, 1).toUpperCase() + item.slice(1)
      })
      temp = temp.slice(0, 1).toLowerCase() + temp.slice(1) + 'Id'
      return temp
    },
    handleColumns () {
      this.$store.state.systemTable.forEach(table => {
        if (table['tableName'] === this.tableName) {
          this.tableColumns = table['systemColumnList']
        }
      })
    },
    handleSubmit () {
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
        padding: 0 20px!important;
        height: 100% !important;
        overflow-y: auto!important;
      }
    }
  }
  .ManageEdit{
    padding: 20px;
  }
</style>
