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
      height="600"
      :data="scene['materialDataList']">
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
        :prop="column['columnName']"
        :label="column['columnComment']"
        v-for="column in tableColumns"
        :key="column.index"
        width="150">
      </el-table-column>
    </el-table>
    <el-drawer
      class="paneEditDrawer"
      v-if="editable"
      :title="'新增' + label"
      :visible.sync="editDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form ref="editForm" :model="editForm" label-width="150px">
        <el-form-item :prop="item['columnName']" :label="item['columnComment']" v-for="item in tableColumns" :key="item.index">
          <el-input v-model="editForm[item['columnName']]" :type="item['dataType'] === 'int' ? 'number' : 'text'"
           :disabled="item['columnName'] === 'id'"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleSubmit">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import api from 'api'
export default {
  name: 'Pane',
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
      default: 'material_data'
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
        this.$store.state.systemTable.forEach(table => {
          if (table['tableName'] === this.tableName) {
            this.tableColumns = table['systemColumnList']
          }
        })
      }
    }
  },
  data () {
    return {
      deleteDialogVisible: false,
      editDrawer: false,
      editForm: {},
      tableColumns: []
    }
  },
  methods: {
    test () {},
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
  .paneEditDrawer{
    .el-drawer__body{
      height: 100px !important;
      form{
        height: 100% !important;
        overflow-y: auto!important;
      }
    }
  }
</style>
