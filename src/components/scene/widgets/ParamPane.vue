<template>
  <div class="ParamPane">
    <h2 v-if="!editable">关键参数数据</h2>
    <el-button
      v-if="editable" type="primary" size="medium" @click="postParamDataDrawer = true">
      <i class="fa fa-fw fa-plus-circle"></i>
      添加关键工艺参数
    </el-button>
    <el-divider v-if="editable"></el-divider>
    <el-table
      :data="scene['paramDataList']"
      style="width: 100%">
      <el-table-column
        label="参数名称"
        width="180">
        <template slot-scope="scope">
          {{ scope.row['param']['title'] }}
        </template>
      </el-table-column>
      <el-table-column
        label="参数用量"
        width="120">
        <template slot-scope="scope">
          {{ scope.row['value']}}
        </template>
      </el-table-column>
      <el-table-column
        label="参数单位"
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
    <el-drawer
      v-if="editable"
      title="新增参数数据"
      :visible.sync="postParamDataDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form ref="postMaterialForm" :model="postParamForm" label-width="100px">
        <el-form-item label="参数名称">
          <el-select v-model="postParamForm.parameterId">
            <el-option v-for="item in paramList" :key="item.index" :label="item['title']" :value="item['id']"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数值">
          <el-input v-model="postParamForm.value" style="max-width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="参数单位">
          <el-select v-model="postParamForm.unitId">
            <el-option v-for="item in unitList" :key="item.index" :label="item['title']" :value="item['id']"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlePost">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'ParamPane',
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
    paramList () {
      return this.$store.state.parameter
    },
    unitList () {
      return this.$store.state.unit
    }
  },
  data () {
    return {
      postParamDataDrawer: false,
      postParamForm: {
        sceneDataId: '',
        parameterId: '',
        description: '',
        value: '',
        unitId: ''
      }
    }
  },
  methods: {
    handlePost () {},
    handlePut () {},
    handleDelete () {}
  }
}
</script>

<style scoped>

</style>
