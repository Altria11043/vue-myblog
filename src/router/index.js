import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载, 减轻初始加载时的压力 
const Login = () => import('views/login/login')
const Home = () => import('views/home/Home')
const User = () => import('views/user/User')
const Release = () => import('views/release/Release')
const UpdateImg = () => import('components/comment/updateImg')
const Index = () => import('views/homePage/index.vue')
const Game = () => import('views/game/Game.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '个人博客后台管理-登入'
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '个人博客后台管理-首页'
    }
  },
  {
    path: '/user',
    component: User,
    meta: {
      title: '个人博客后台管理-用户'
    }
  },
  {
    path: '/release/:id',
    component: Release,
    meta: {
      title: '个人博客后台管理-发布文章'
    }
  },
  {
    path: '/updateImg',
    component: UpdateImg,
    meta: {
      title: '个人博客后台管理-图片上传'
    }
  },
  {
    path: '/game',
    component: Game,
    meta: {
      title: '个人博客后台管理-游戏'
    }
  },
  {
    path: '/index',
    component: Index,
    meta: {
      title: '个人网站'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title
  if (to.path == "/login" || to.path == "/index") {
    next()
  }else {
    if (sessionStorage.getItem('user') === "SUCCESS") {
      next()
    } else {
      next({path: "/login"})
    }
  }
})

export default router;