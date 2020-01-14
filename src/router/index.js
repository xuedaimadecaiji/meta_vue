import Vue from 'vue'
import Router from 'vue-router'
import HomeViewMain from '../components/home/HomeViewMain'
import HomeIndex from '../components/home/HomeIndex'
import DatabaseViewMain from '../components/database/DatabaseViewMain'
import DatabaseIndex from '../components/database/DatabaseIndex'

import SceneIndex from '../components/scene/SceneIndex'
import SceneViewMain from '../components/scene/SceneViewMain'
import SceneEdit from '../components/scene/SceneEdit'

import SearchViewMain from '../components/search/SearchViewMain'
import SearchIndex from '../components/search/SearchIndex'

import ManageViewMain from '../components/manage/ManageViewMain'
import ManageIndex from '../components/manage/ManageIndex'
import ManageEdit from '../components/manage/ManageEdit'

import BatchViewMain from '../components/batch/BatchViewMain'
import BatchIndex from '../components/batch/BatchIndex'
import BatchExport from '../components/batch/BatchExport'
import BatchImport from '../components/batch/BatchImport'

import UserViewMain from '../components/user/UserViewMain'
import UserIndex from '../components/user/UserIndex'
import UserGroup from '../components/user/UserGroup'
import UserPermission from '../components/user/UserPermission'

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
      component: HomeViewMain,
      children: [
        {
          path: '',
          meta: {
            requireAuth: true
          },
          name: 'HomeIndex',
          component: HomeIndex
        }
      ]
    },
    {
      path: '/database/:categoryId/',
      component: DatabaseViewMain,
      children: [
        {
          path: '',
          component: DatabaseIndex,
          name: 'DatabaseIndex'
        },
        {
          path: 'scene/',
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
              path: 'edit/:sceneId',
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
      path: '/user/',
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
