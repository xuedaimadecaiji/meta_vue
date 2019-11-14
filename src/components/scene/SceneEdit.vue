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
        <el-tab-pane v-for="item in tabPaneList" :key="item.index" :label="item.label" :name="item.name">
          <pane :scene="postSceneForm" :tableName="item.tableName" :label="item.label"></pane>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import api from 'api'
import pane from './widgets/Pane'
export default {
  name: 'SceneEdit',
  components: {
    pane
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  data () {
    return {
      tabPaneList: [
        {
          label: '物料数据',
          name: '1',
          tableName: 'materialData'
        },
        {
          label: '能源数据',
          name: '2',
          tableName: 'energyData'
        },
        {
          label: '关键工艺参数',
          name: '3',
          tableName: 'materialData'
        },
        {
          label: '设备数据',
          name: '4',
          tableName: 'deviceData'
        },
        {
          label: '环境负荷数据',
          name: '5',
          tableName: 'envLoadData'
        }
      ],
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
      api.get({url: 'sceneData\\' + to.params['sceneId']}).then(result => {
        vm.postSceneForm = result
        api.get({url: 'category'}).then(res => {
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
    api.get({url: 'sceneData\\' + to.params['sceneId']}).then(result => {
      this.postSceneForm = result
      api.get({url: 'category'}).then(res => {
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
      api.put({url: 'sceneData', params: this.postSceneForm}).then(result => {
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
    .el-tabs{
      padding: 10px 20px!important;
    }
  }
</style>
