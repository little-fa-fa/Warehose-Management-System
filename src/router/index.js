import Vue from 'vue'
import VueRouter from 'vue-router'
import CurrentStorage from "@/views/CurrentStorage";
import FullContainerLoad from "@/views/FullContainerLoad";
import Inbound from "@/views/InboundRecord/Inbound";
import Index from "@/views/Index";
import Outbound from "@/views/OutboundRecord/Outbound";
import OutboundRecord from "@/views/OutboundRecord/OutboundRecord";
import InboundRecord from "@/views/InboundRecord/InboundRecord";
import FullContainerLoadRecord from "@/views/FullContainerLoadRecord";
import OutboundRecordSearch from "@/views/OutboundRecord/OutboundRecordSearch";
import OutboundRecordUpdate from "@/views/OutboundRecord/OutboundRecordUpdate";
import Login from "@/views/login"
import Home from "@/views/Home"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '主页',
    component: Index,
    redirect:'/login',
    show:true,
children:[{
  path:'/home',
  name:'主页',
  component:Home,
  show:true
},
  {
    path: '/currentStorage',
    name: '仓库',
    component: CurrentStorage,
    show:true,

  },
  {
    path: '/inbound',
    name: '入库',
    component: Inbound,
    show:true,
    redirect:"/inbound",
    children:[
      {
        path: '/fullContainerLoad',
        name: '整柜直送',
        component: FullContainerLoad,
        show:true,
      },
      {
        path: '/inbound',
        name: '其他',
        component: Inbound,
        show:true,
      }
    ]
  },
  {
    path: '/outbound',
    name: '出库',
    component: Outbound,
    show:true,
    children:[{
      path: '/outbound',
      name: '出库',
      component: Outbound,
      show:true,
    }]
  },
  {
    path: '/outboundRecord',
    name: '出库记录',
    component: OutboundRecord,
    show:true,
    children: [
      {
        path: '/outboundRecord',
        name: '出库记录',
        component: OutboundRecord,
        show:true,
      }
    ]
  },
  {
    path: '/inboundRecord',
    name: '入库记录',
    component: InboundRecord,
    show:true,
    children:[
      {
        path: '/fullContainerLoadRecord',
        name: '整柜直送记录',
        component: FullContainerLoadRecord,
        show:true,
      },
      {
        path: '/inboundRecord',
        name: '入库记录',
        component: InboundRecord,
        show:true,
      }
    ]

  },
  {
    path: '/outboundSearch/',
    name: '出库记录搜索',
    component: OutboundRecordSearch,
    show:false,

  },
  {
    path: '/outboundUpdate/',
    name: '出库记录更新',
    component: OutboundRecordUpdate,
    show:false,

  },
]
  },
  {
    path:'/login',
    name: '登陆',
    component: Login,
    show:false,


  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
