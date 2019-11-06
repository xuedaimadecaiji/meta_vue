<template>
  <div class="EnergyPane">
    <h2 v-if="!editable">能源数据</h2>
    <el-button
      v-if="editable" type="primary" size="medium" @click="postEnergyDataDrawer = true">
      <i class="fa fa-fw fa-plus-circle"></i>
      添加能源
    </el-button>
    <el-divider v-if="editable"></el-divider>
    <el-drawer
      v-if="editable"
      title="新增能源数据"
      :visible.sync="postEnergyDataDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form ref="postEnergyForm" :model="postEnergyForm" label-width="100px">
        <el-form-item label="能源名称">
          <el-select v-model="postEnergyForm.energyId">
            <el-option v-for="item in energyList" :key="item.index" :label="item['title']" :value="item['id']"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="能源用量">
          <el-input v-model="postEnergyForm.value" style="max-width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="能源单位">
          <el-select v-model="postEnergyForm.unitId">
            <el-option v-for="item in unitList" :key="item.index" :label="item['title']" :value="item['id']"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlePost">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-table
      :data="scene['energyDataList']"
      style="width: 100%">
      <el-table-column
        label="能源名称"
        width="180">
        <template slot-scope="scope">
          {{ scope.row['energy']['title'] }}
        </template>
      </el-table-column>
      <el-table-column
        label="能源用量"
        width="120">
        <template slot-scope="scope">
          {{ scope.row['value']}}
        </template>
      </el-table-column>
      <el-table-column
        label="能源单位"
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
  name: 'EnergyPane',
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
    energyList () {
      return this.$store.state.energy
    },
    unitList () {
      return this.$store.state.unit
    }
  },
  data () {
    return {
      postEnergyDataDrawer: false,
      postEnergyForm: {
        sceneDataId: '',
        energyId: '',
        value: '',
        unitId: ''
      }
    }
  },
  methods: {
    handlePost () {
      this.postEnergyForm.sceneDataId = this.scene.id
      console.log(this.postEnergyForm)
      api.post({url: 'energy_data', params: this.postEnergyForm}).then(result => {
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
