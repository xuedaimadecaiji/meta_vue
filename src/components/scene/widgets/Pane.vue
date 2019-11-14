<template>
  <div class="Pane">
    <h2 v-if="!editable">{{label}}</h2>
    <el-button
      v-if="editable" type="primary" size="medium" @click="handleEditDrawer(null)">
      <i class="fa fa-fw fa-plus-circle"></i>
      添加{{label}}
    </el-button>
    <el-divider v-if="editable"></el-divider>
    <el-table
      :data="scene['materialDataList']">
      <el-table-column
        v-if="editable"
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
      class="PaneEditDrawer"
      v-if="editable"
      :title="'新增' + label"
      :visible.sync="editDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form ref="editForm" :model="editForm" label-width="150px">
        <el-form-item :prop="column['columnName']" :label="column['columnComment']"  v-show="column['columnName'] !== 'id'"
         v-for="column in tableColumns" :key="column.index">
          <el-input v-if="column['columnKey'] !== 'MUL'" v-model="editForm[column['columnName']]"
           :type="column['dataType'] === 'int' ? 'number' : 'textarea'">
          </el-input>
          <el-select v-if="column['columnKey'] === 'MUL'"  v-model="editForm[column['columnName']]" filterable placeholder="请选择">
            <el-option
              v-for="item in baseTableMap[column['columnName'].substring(0, column['columnName'].length - 2)]"
              :key="item.id"
              :label="item['title']"
              :value="item.id">
            </el-option>
          </el-select>
          <span v-if="column['columnKey'] === 'MUL'" class="AddManageDataTips">
            &nbsp;&nbsp;
            <el-button type="text" @click="handlManageDrawer(column['columnName'], column['columnComment'])">
              缺少数据？前往添加
            </el-button>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleSubmit">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-drawer
      class="AddManageDataDrawer"
      :title="'新增' + addManageData.label"
      :visible.sync="addManageData.visible"
      :direction="'ltr'"
      :size="'50%'">
      <AddManageData :tableName="addManageData.tableName"></AddManageData>
    </el-drawer>
  </div>
</template>
<script>
import api from 'api'
import AddManageData from './AddManageData'
export default {
  name: 'Pane',
  components: {
    AddManageData
  },
  props: {
    scene: {
      type: Object
    },
    editable: {
      type: Boolean,
      default: true
    },
    tableName: {
      type: String,
      default: 'materialData'
    },
    label: {
      type: String,
      default: '物料数据'
    }
  },
  watch: {
    tableName: {
      immediate: true, // 很重要！！！，必须叫handler
      handler (val) {
        this.tableColumns = this.$store.state.systemTable[this.tableName]['systemColumnList']
      }
    }
  },
  computed: {
    baseTableMap () {
      return this.$store.state.baseTableMap
    }
  },
  data () {
    return {
      addManageData: {
        tableName: '',
        visible: false,
        label: ''
      },
      addManageDataVisible: false,
      deleteDialogVisible: false,
      editDrawer: false,
      editForm: {},
      tableColumns: []
    }
  },
  methods: {
    handlManageDrawer (columnName, columnComment) {
      this.addManageData.tableName = columnName.substring(0, columnName.length - 2)
      this.addManageData.visible = true
      this.addManageData.label = columnComment
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
    handleDeleteDialog (row) {
      this.editForm = row
      this.deleteDialogVisible = true
    }
  }
}
</script>
<style lang=scss>
  .PaneEditDrawer, .AddManageDataDrawer{
    .el-drawer__body{
      height: 100px !important;
      form{
        padding: 0 20px!important;
        height: 100% !important;
        overflow-y: auto!important;
      }
    }
  }
  .AddManageDataTips{
    button{
      color: #aaa;
      &:hover{
        text-decoration: underline;
      }
    }
  }
</style>
