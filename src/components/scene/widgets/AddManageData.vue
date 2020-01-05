<template>
  <div class="AddManageData">
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
  </div>
</template>
<script>
import api from 'api'
export default {
  name: 'AddManageData',
  props: {
    tableName: {
      type: String
    }
  },
  computed: {
    baseTableMap () {
      return this.$store.state.baseTableMap
    },
    tableColumns () {
      return this.$store.state.systemTable[this.tableName]['systemColumnList']
    }
  },
  data () {
    return {
      editForm: {}
    }
  },
  methods: {
    handleSubmit () {
      api.post({url: this.tableName, params: this.editForm}).then(res => {
        history.go(0)
      })
    }
  }
}
</script>
<style lang="scss">
.AddManageData{
  form{
    padding: 0 20px!important;
    height: 100% !important;
    overflow-y: auto!important;
  }
}
</style>
