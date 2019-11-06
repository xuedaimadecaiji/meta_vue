<template>
  <div class="MaterialPane">
    <h2 v-if="!editable">物料数据</h2>
    <el-button
      v-if="editable" type="primary" size="medium" @click="postMaterialDataDrawer = true">
      <i class="fa fa-fw fa-plus-circle"></i>
      添加物料
    </el-button>
    <el-drawer
      v-if="editable"
      title="新增物料数据"
      :visible.sync="postMaterialDataDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form ref="postMaterialForm" :model="postMaterialForm" label-width="100px">
        <el-form-item label="物料名称">
          <el-select v-model="postMaterialForm.materialId">
            <el-option v-for="item in materialList" :key="item.index" :label="item['title']" :value="item['id']"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料用量">
          <el-input v-model="postMaterialForm.value" style="max-width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="物料单位">
          <el-select v-model="postMaterialForm.unitId">
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
      :data="scene['materialDataList']"
      style="width: 100%">
      <el-table-column
        label="物料名称"
        width="180">
        <template slot-scope="scope">
          {{ scope.row['material']['title'] }}
        </template>
      </el-table-column>
      <el-table-column
        label="物料用量"
        width="120">
        <template slot-scope="scope">
          {{ scope.row['value']}}
        </template>
      </el-table-column>
      <el-table-column
        label="物料单位"
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
      <el-table-column label="操作" width="200"
                       v-if="editable">
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
  name: 'MaterialPane',
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
    materialList () {
      return this.$store.state.material
    },
    unitList () {
      return this.$store.state.unit
    }
  },
  data () {
    return {
      postMaterialDataDrawer: false,
      postMaterialForm: {
        sceneDataId: '',
        materialId: '',
        value: '',
        unitId: ''
      }
    }
  },
  methods: {
    handlePost () {
      this.postMaterialForm.sceneDataId = this.scene.id
      console.log(this.postMaterialForm)
      api.post({url: 'material_data', params: this.postMaterialForm}).then(result => {
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
