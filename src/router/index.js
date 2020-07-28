import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeMain from '../components/home/main.vue'
import RoomMain from '../components/room/main.vue'
import RoomList from '../components/room/list.vue'
import RoomAdd from '../components/room/add.vue'
import RoomModify from '../components/room/modify.vue'
import RoomView from '../components/room/view.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
