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
        <!--这段解释-->
        <template slot-scope="scope">
          <div  v-if="column['columnKey'] === 'MUL'">
            {{scope.row[column['columnName'].substring(0, column['columnName'].length - 2)]['title']}}
          </div>
<!--          <div>
            {{scope.row[column]}}
          </div>-->
          <div v-else>
            {{ scope.row[column['columnName']] }}
          </div>
        </template>
<!--    <template slot-scope="scope" v-if="column['columnKey'] === 'MUL'">
         &lt;!&ndash; scope.row[column['columnName'].substring(0, column['columnName'].length - 2) + 'List']&ndash;&gt;
          <el-button @click="detailShowDrawer(scope.row)" type="text" size="small">详情</el-button>
        </template>-->

<!--          {{((column['columnKey'] === 'MUL') && (scope.row[column['columnName']] !== null)) ?
          ((scope.row[column['columnName'].substring(0, column['columnName'].length - 2)] === null) ||
            (scope.row[column['columnName'].substring(0, column['columnName'].length - 2)] === undefined) ?
           'null' : scope.row[column['columnName'].substring(0, column['columnName'].length - 2)]['title'])
           : scope.row[column['columnName']]}}-->
<!--        <template slot-scope="scope">-->
<!--          {{column['columnKey'] === 'MUL' ? scope.row[column['columnName'].substring(0, column['columnName'].length - 2) + 'List']-->
<!--          : scope.row[column['columnName']]}}-->
<!--        </template>-->
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
              v-for="item in baseTableMap[item['columnName'].substring(0, item['columnName'].length - 2)]"
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
    <!--<el-drawer
      class="detailShowDrawer"
      title="详情信息"
      :visible.sync="showDrawer"
      :direction="'ltr'"
      :size="'50%'">
      <el-form ref="postForm" v-model="editForm" label-width="150px">
        <el-form-item :prop="item['columnName']" :label="item['columnComment']" v-show="item['columnName'] !== 'id'"
                      v-for="item in tableColumns" :key="item.index">
          <el-input v-if="item['columnKey'] !== 'MUL'" v-model="editForm[item['columnName']]"
                    :type="item['dataType'] === 'int' ? 'number' : 'textarea'">
          </el-input>
          <el-select v-if="item['columnKey'] === 'MUL'"  v-model="editForm[item['columnName']]" filterable placeholder="请选择">
            <el-option
              v-for="item in baseTableMap[item['columnName'].substring(0, item['columnName'].length - 2)]"
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
    </el-drawer>-->
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
      showDrawer: false,
      deleteDialogVisible: false,
      tableList: [],
      editForm: {},
      showForm: {},
      tableColumns: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.tableName = to.params['table']
      // 取消网络请求，直接从store中读取基础数据，注意键需要加上‘Id’
      vm.tableList = vm.$store.state.baseTableMap[vm.tableName]
      vm.handleColumns()
      vm.initEditForm()
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.tableName = to.params['table']
    this.tableList = this.$store.state.baseTableMap[this.tableName]
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
    handleColumns () {
      this.tableColumns = this.$store.state.systemTable[this.tableName]['systemColumnList']
    },
    handleSubmit () {
      if (this.editForm['id'] === undefined) {
        api.post({url: this.tableName, params: this.editForm}).then(res => {
          history.go(0)
        })
      } else {
        api.put({url: this.tableName, params: this.editForm}).then(res => {
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
    // detailShowDrawer (row) {
    //   this.showForm = {}
    //   if (row) {
    //     this.showForm = row
    //   }
    //   this.showDrawer = true
    // },
    handleDeleteDialog (row) {
      this.editForm = row
      this.deleteDialogVisible = true
    },
    handleDelete () {
      this.deleteDialogVisible = false
      api.delete({url: this.tableName + '/' + this.editForm['id']}).then(res => {
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
