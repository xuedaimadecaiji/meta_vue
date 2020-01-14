<template>
  <div class="SceneDetail">
    <el-container>
      <el-header>
        <div class="wrapper">
          <el-row>
            <el-col :span="20">
              <h1>{{scene['title'] !== undefined ? scene['title'] : ''}}</h1>
              <div class="description">
                <div>所属分类：{{scene['category'] !== undefined ? scene['category']['title'] : ''}}</div>
                <div>最近更新：{{scene['updatedAt']}}</div>
                <div>描述：{{scene['description']}}</div>
              </div>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" round @click="handleEdit">
                <i class="fa fa-fw fa-edit"></i> 编辑工艺
              </el-button>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main>
        <div class="wrapper">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="tabPaneList[0].label" name="first">
              <Pane :scene="scene" :editable="false" :label="tabPaneList[0].label" :tableName="tabPaneList[0].tableName"></Pane>
            </el-tab-pane>
            <el-tab-pane :label="tabPaneList[1].label" name="second">
              <Pane :scene="scene" :editable="false" :label="tabPaneList[1].label" :tableName="tabPaneList[1].tableName"></Pane>
            </el-tab-pane>
            <el-tab-pane :label="tabPaneList[2].label" name="third">
              <Pane :scene="scene" :editable="false" :label="tabPaneList[2].label" :tableName="tabPaneList[2].tableName"></Pane>
            </el-tab-pane>
            <el-tab-pane :label="tabPaneList[3].label" name="fourth">
              <Pane :scene="scene" :editable="false" :label="tabPaneList[3].label" :tableName="tabPaneList[3].tableName"></Pane>
            </el-tab-pane>
            <el-tab-pane :label="tabPaneList[4].label" name="fifth">
              <Pane :scene="scene" :editable="false" :label="tabPaneList[4].label" :tableName="tabPaneList[4].tableName"></Pane>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import api from 'api'
import Pane from './widgets/Pane'
export default {
  name: 'SceneDetail',
  components: {
    Pane
  },
  data () {
    return {
      activeName: 'first',
      scene: {
        id: 0,
        title: ''
      },
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
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      api.get({url: 'sceneData/' + to.params['sceneId']}).then(res => {
        vm.scene = res
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    api.get({url: 'sceneData/' + to.params['sceneId']}).then(res => {
      this.scene = res
    })
    next()
  },
  methods: {
    handleEdit () {
      this.$router.push({name: 'SceneEdit', params: {sceneId: this.scene['id']}})
    }
  }
}
</script>
<style scoped lang="scss">
  .SceneDetail{
    padding-top: 20px;
    .wrapper{
      min-width: 100;
      margin: auto;
    }
    .el-header{
      padding: 20px 0!important;
      h1{
        font-size: 25px;
        margin: 0 0 20px 0;
      }
      a{
        color: black
      }
    }
    .description{
      div{
        color: #858585;
        padding: 5px 0;
      }
    }
  }
</style>
