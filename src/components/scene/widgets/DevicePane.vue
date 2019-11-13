<template>
  <div class="DevicePane">
    <h2 v-if="!editable">设备数据</h2>
    <el-button v-if="editable" type="primary" size="medium" @click="postDeviceDataDrawer = true">
      <i class="fa fa-fw fa-plus-circle"></i>
      添加设备数据
    </el-button>
    <el-drawer
      v-if="editable"
      title="新增设备数据"
      :visible.sync="postDeviceDataDrawer"
      :direction="'rtl'"
      :size="'50%'">
      <el-form ref="postDeviceForm" :model="postDeviceForm" label-width="100px">
        <el-form-item label="设备名称">
          <el-select v-model="postDeviceForm.deviceId">
            <el-option v-for="item in deviceList" :key="item.index" :label="item['title']" :value="item['id']"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用时长">
          <el-input v-model="postDeviceForm.workTime" placeholder="千瓦时"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlePost">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-divider v-if="editable"></el-divider>
    <el-table
      :data="scene['deviceDataList']"
      style="width: 100%">
      <el-table-column
        label="设备名称"
        width="180">
        <template slot-scope="scope">
          {{ scope.row['device']['title'] }}
        </template>
      </el-table-column>
      <el-table-column
        label="设备型号"
        width="120">
        <template slot-scope="scope">
          {{ scope.row['device']['type']}}
        </template>
      </el-table-column>
      <el-table-column
        label="设备功率"
        width="120">
        <template slot-scope="scope">
          {{ scope.row['device']['power']}}
        </template>
      </el-table-column>
      <el-table-column
        label="设备描述"
        width="120">
        <template slot-scope="scope">
          {{ scope.row['device']['description']}}
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
  name: 'DevicePane',
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
    deviceList () {
      return this.$store.state.device
    }
  },
  data () {
    return {
      postDeviceDataDrawer: false,
      postDeviceForm: {
        sceneDataId: '',
        deviceId: '',
        workTime: ''
      }
    }
  },
  methods: {
    handlePost () {
      this.postDeviceForm.sceneDataId = this.scene.id
      console.log(this.postDeviceForm)
      api.post({url: 'device_data', params: this.postDeviceForm}).then(result => {
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
