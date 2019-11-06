<template>
  <el-container class="SceneEdit">
    <el-aside>
      <el-form ref="postSceneForm" :model="postSceneForm" :rules="postSceneRules" label-width="100px">
        <el-form-item label="场景名称" prop="title">
          <el-input v-model="postSceneForm.title"></el-input>
        </el-form-item>
        <el-form-item label="场景分类" prop="categoryId">
          <el-cascader
            v-model="postCategoryList"
            clearable
            :options="categories"
            :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'title', value: 'id' }">
          </el-cascader>
        </el-form-item>
        <el-form-item label="场景描述" prop="description">
          <el-input type="textarea"
                    :autosize="{ minRows: 5, maxRows: 10}" v-model="postSceneForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handlePut('postSceneForm')">保存</el-button>
          <router-link class="el-button el-button--primary" :to="{name: 'SceneCategory', query: {id: postSceneForm.id}}">
            查看工艺场景
          </router-link>
        </el-form-item>
      </el-form>
    </el-aside>
    <el-main>
      <el-tabs v-model="activeName">
        <el-tab-pane label="物料数据" name="1">
          <MaterialPane :scene="postSceneForm"></MaterialPane>
        </el-tab-pane>
        <el-tab-pane label="能源数据" name="2">
          <EnergyPane :scene="postSceneForm"></EnergyPane>
        </el-tab-pane>
        <el-tab-pane label="关键参数" name="3">
          <ParamPane :scene="postSceneForm"></ParamPane>
        </el-tab-pane>
        <el-tab-pane label="其他" name="4">
          <OtherPane :scene="postSceneForm"></OtherPane>
        </el-tab-pane>
        <el-tab-pane label="设备数据" name="5">
          <DevicePane :scene="postSceneForm"></DevicePane>
        </el-tab-pane>
        <el-tab-pane label="环境负荷数据" name="6">
          <EnvLoadPane :scene="postSceneForm"></EnvLoadPane>
        </el-tab-pane>
        <el-tab-pane label="IPO 可视化" name="7">
          <IPOPlane></IPOPlane>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import api from 'api'
import MaterialPane from './widgets/MaterialPane'
import EnergyPane from './widgets/EnergyPane'
import DevicePane from './widgets/DevicePane'
import EnvLoadPane from './widgets/EnvLoadPane'
import ParamPane from './widgets/ParamPane'
import OtherPane from './widgets/OtherPane'
import IPOPlane from './widgets/IPOPlane'
export default {
  name: 'SceneEdit',
  components: {
    MaterialPane,
    EnergyPane,
    DevicePane,
    EnvLoadPane,
    ParamPane,
    OtherPane,
    IPOPlane
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  data () {
    return {
      categoryList: [],
      activeName: '1',
      postCategoryList: [],
      postSceneForm: {
        id: '',
        title: '',
        description: '',
        categoryId: null,
        categoryRootId: null
      },
      postSceneRules: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.postSceneForm.id = to.params['sceneId']
      api.get({url: 'scene_data\\' + to.params['sceneId']}).then(result => {
        vm.postSceneForm = result
        api.get({url: 'categories'}).then(res => {
          vm.categoryList = res
          vm.postCategoryList = []
          vm.postCategoryList.push(vm.categoryList[0]['id'])
          vm.search(vm.postSceneForm['categoryId'], vm.postCategoryList, vm.categoryList[0], vm.categoryList, 0)
        })
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.postSceneForm.id = to.params['sceneId']
    let that = this
    api.get({url: 'scene_data\\' + to.params['sceneId']}).then(result => {
      this.postSceneForm = result
      api.get({url: 'categories'}).then(res => {
        that.categoryList = res
        that.postCategoryList = []
        that.postCategoryList.push(that.categoryList[0]['id'])
        that.search(that.postSceneForm['categoryId'], that.postCategoryList, that.categoryList[0], that.categoryList, 0)
      })
    })
    next()
  },
  methods: {
    handlePut () {
      this.postSceneForm.categoryId = this.postCategoryList[this.postCategoryList.length - 1]
      this.postSceneForm.categoryRootId = this.postCategoryList[1] // 二级分类ID
      api.put({url: 'scene_data', params: this.postSceneForm}).then(result => {
        if (result > 0) {
          history.go(0)
        } else {
          this.$message.error('出错了！')
        }
      })
    },
    search (searchId, path, node, list, i) {
      if (node['id'] === searchId) {
        return true
      }
      for (; i < list.length; i++) {
        if (node['id'] === list[i]['parentId']) {
          path.push(list[i]['id'])
          if (!this.search(searchId, path, list[i], list, i + 1)) {
            path.pop()
          } else {
            return true
          }
        }
      }
      return false
    }
  }
}
</script>

<style lang="scss">
  .SceneEdit{
    .el-aside{
      padding: 20px!important;
      width: 30%!important;
      border-right: solid 1px #ccc;
    }
    .el-main{
      padding: 10px 20px!important;
    }
  }
</style>
