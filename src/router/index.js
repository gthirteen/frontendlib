import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeMain from '../components/home/main.vue'

import RoomMain from '../components/room/main.vue'
import RoomList from '../components/room/list.vue'
import RoomAdd from '../components/room/add.vue'
import RoomModify from '../components/room/modify.vue'
import RoomView from '../components/room/view.vue'

import DepartmentMain from '../components/department/main.vue'
import DepartmentList from '../components/department/list.vue'
import DepartmentAdd from '../components/department/add.vue'
import DepartmentModify from '../components/department/modify.vue'
import DepartmentView from '../components/department/view.vue'

import ElderMain from '../components/elder/main.vue'
import ElderList from '../components/elder/list.vue'
import ElderAdd from '../components/elder/add.vue'
import ElderModify from '../components/elder/modify.vue'
import ElderView from '../components/elder/view.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:"/", name:"homemain", component:HomeMain
  },
  {
    path:"/room", name:"roommain", component:RoomMain, children:[
      {path:"list", name:"roomlist", component:RoomList},
      {path:"add", name:"roomadd", component:RoomAdd},
      {path:"modify/:id", name:"roommodify", component:RoomModify},
      {path:"view/:id", name:"roomview", component:RoomView},
      {path:"", redirect:"list"}
    ]
  },
  {
    path:"/department", name:"departmentmain", component:DepartmentMain, children:[
      {path:"list", name:"departmentlist", component:DepartmentList},
      
      {path:"add", name:"departmentadd", component:DepartmentAdd},
      {path:"modify/:id", name:"departmentmodify", component:DepartmentModify},
      {path:"view/:id", name:"departmentview", component:DepartmentView},
      {path:"", redirect:"list"}
    ]
  },
  {
    path:"/elder", name:"eldermain", component:ElderMain, children:[
      {path:"list", name:"elderlist", component:ElderList},
      {path:"add", name:"elderadd", component:ElderAdd},
      {path:"modify/:id", name:"eldermodify", component:ElderModify},
      {path:"view/:id", name:"elderview", component:ElderView},
      {path:"", redirect:"list"}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
