import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '../components/HomeIndex'
import DatabaseViewMain from '../components/database/DatabaseViewMain'
import DatabaseIndex from '../components/database/DatabaseIndex'

import SceneIndex from '../components/database/scene/SceneIndex'
import SceneViewMain from '../components/database/scene/SceneViewMain'
import SceneEdit from '../components/database/scene/SceneEdit'
import SceneDetail from '../components/database/scene/SceneDetail'

import SearchViewMain from '../components/database/search/SearchViewMain'
import SearchIndex from '../components/database/search/SearchIndex'

import ManageViewMain from '../components/database/manage/ManageViewMain'
import ManageIndex from '../components/database/manage/ManageIndex'
import ManageEdit from '../components/database/manage/ManageEdit'

import BatchViewMain from '../components/database/batch/BatchViewMain'
import BatchIndex from '../components/database/batch/BatchIndex'
import BatchExport from '../components/database/batch/BatchExport'
import BatchImport from '../components/database/batch/BatchImport'

import UserViewMain from '../components/database/user/UserViewMain'
import UserIndex from '../components/database/user/UserIndex'
import UserGroup from '../components/database/user/UserGroup'
import UserPermission from '../components/database/user/UserPermission'

import PersonViewMain from '../components/person/PersonViewMain'
import PersonIndex from '../components/person/PersonIndex'

import AccountViewMain from '../components/account/AccountViewMain'
import Login from '../components/account/Login'
import Register from '../components/account/Register'
import Admin from '../components/account/Admin'
import AccountHandle from '../components/account/AccountHandle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeIndex',
      component: HomeIndex
    },
    {
      path: '/database/:categoryId/',
      component: DatabaseViewMain,
      children: [
        {
          path: '',
          meta: {
            requireAuth: true
          },
          component: DatabaseIndex,
          name: 'DatabaseIndex'
        },
        {
          path: 'scene/',
          meta: {
            requireAuth: true
          },
          component: SceneViewMain,
          children: [
            {
              path: '',
              meta: {
                requireAuth: true
              },
              name: 'SceneIndex',
              component: SceneIndex
            },
            {
              path: ':sceneId/detail',
              meta: {
                requireAuth: true
              },
              name: 'SceneDetail',
              component: SceneDetail
            },
            {
              path: ':sceneId/edit',
              meta: {
                requireAuth: true
              },
              name: 'SceneEdit',
              component: SceneEdit
            }
          ]
        },
        {
          path: 'manage/',
          component: ManageViewMain,
          children: [
            {
              path: '',
              meta: {
                requireAuth: true
              },
              name: 'ManageIndex',
              component: ManageIndex
            },
            {
              path: ':table/',
              meta: {
                requireAuth: true
              },
              name: 'ManageEdit',
              component: ManageEdit
            }
          ]
        },
        {
          path: 'batch/',
          component: BatchViewMain,
          children: [
            {
              path: '',
              meta: {
                requireAuth: true
              },
              name: 'BatchIndex',
              component: BatchIndex
            },
            {
              path: 'import',
              meta: {
                requireAuth: true
              },
              name: 'BatchImport',
              component: BatchImport
            },
            {
              path: 'export',
              meta: {
                requireAuth: true
              },
              name: 'BatchExport',
              component: BatchExport
            }
          ]
        },
        {
          path: 'search/',
          component: SearchViewMain,
          children: [
            {
              path: '',
              meta: {
                requireAuth: true
              },
              name: 'SearchIndex',
              component: SearchIndex
            }
          ]
        },
        {
          path: 'user/',
          component: UserViewMain,
          children: [
            {
              path: '',
              meta: {
                requireAuth: true
              },
              name: 'UserIndex',
              component: UserIndex
            },
            {
              path: 'group/',
              name: 'UserGroup',
              component: UserGroup
            },
            {
              path: 'permission/',
              name: 'UserPermission',
              component: UserPermission
            },
            {
              path: 'account/',
              name: 'Admin',
              component: Admin
            },
            {
              path: 'handle/',
              name: 'AccountHandle',
              component: AccountHandle
            }
          ]
        }
      ]
    },
    {
      path: '/p/',
      component: PersonViewMain,
      children: [
        {
          path: '',
          meta: {
            requireAuth: true
          },
          name: 'PersonIndex',
          component: PersonIndex
        }
      ]
    },
    {
      path: '/account/',
      component: AccountViewMain,
      children: [
        {
          path: 'login/',
          name: 'Login',
          component: Login
        },
        {
          path: 'register/',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})
