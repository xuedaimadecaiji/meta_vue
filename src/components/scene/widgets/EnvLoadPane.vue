<template>
  <div class="EnvLoadPane">
    <h2 v-if="!editable">环境负荷数据</h2>
    <el-button
      v-if="editable" type="primary" size="medium" @click="postEnvLoadDataDrawer = true">
      <i class="fa fa-fw fa-plus-circle"></i>
      添加环境负荷数据
    </el-button>
    <el-drawer
      v-if="editable"
      title="新增环境负荷数据"
      :visible.sync="postEnvLoadDataDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form ref="postEnvLoadForm" :model="postEnvLoadForm" label-width="140px">
        <el-form-item label="环境负荷名称">
          <el-select v-model="postEnvLoadForm.envLoadId">
            <el-option v-for="item in envLoadList" :key="item.index" :label="item['title']" :value="item['id']"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="环境负荷数据描述">
          <el-input type="textarea" v-model="postEnvLoadForm.description" style="max-width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="环境负荷数据值">
          <el-input v-model="postEnvLoadForm.value" style="max-width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="环境负荷单位">
          <el-select v-model="postEnvLoadForm.unitId">
            <el-option v-for="item in unitList" :key="item.index" :label="item['title']" :value="item['id']"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlePost">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-divider v-if="editable"></el-divider>
    <el-table
      :data="scene['envLoadDataList']"
      style="width: 100%">
      <el-table-column
        label="环境负荷名称"
        width="180">
        <template slot-scope="scope">
          {{ scope.row['envLoad']['title'] }}
        </template>
      </el-table-column>
      <el-table-column
        label="环境负荷描述"
        width="180">
        <template slot-scope="scope">
          {{ scope.row['envLoad']['description'] }}
        </template>
      </el-table-column>
      <el-table-column
        label="环境负荷数据值"
        width="120">
        <template slot-scope="scope">
          {{ scope.row['value']}}
        </template>
      </el-table-column>
      <el-table-column
        label="环境负荷单位"
        width="120">
        <template slot-scope="scope">
          {{ scope.row['unit']['title']}}
        </template>
      </el-table-column>
      <el-table-column
        label="添加时间"
        sortable
        width="180">
        <template slot-scope="scope">
          {{ scope.row['createdAt']}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" v-if="editable">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handlePut(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from 'api'
export default {
  name: 'EnvLoadPane',
  props: {
    scene: {
      type: Object
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    envLoadList () {
      return this.$store.state.envLoad
    },
    unitList () {
      return this.$store.state.unit
    }
  },
  data () {
    return {
      postEnvLoadDataDrawer: false,
      postEnvLoadForm: {
        sceneDataId: '',
        envLoadId: '',
        description: '',
        value: '',
        unitId: ''
      }
    }
  },
  methods: {
    handlePost () {
      this.postEnvLoadForm.sceneDataId = this.scene.id
      console.log(this.postEnvLoadForm)
      api.post({url: 'env_load_data', params: this.postEnvLoadForm}).then(result => {
        history.go(0)
      })
    },
    handlePut (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped>

</style>
