//对外暴露配置的route, 常量路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', //命名路由
    meta: {
      ///路由元信息, 用于展示菜单标题
      title: 'Login',
      hidden: true, //代表路由的标题在左边菜单栏中是否隐藏, 因为是把所有的路由都取出来了,有的不需要展示在侧边菜单栏那里
      icon: 'User', //菜单栏里显示的图标, 支持element-plus里所有的图标
    },
  },
  {
    //登陆成功以后展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout', //命名路由
    meta: {},
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: 'Home',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404', //命名路由
    meta: {
      title: '404',
      hidden: true,
      icon: 'CircleCloseFilled',
    },
  },

  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen', //命名路由
    meta: {
      title: 'Data Display Screen',
      hidden: false,
      icon: 'DataAnalysis',
    },
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    redirect: '/acl/user',
    meta: {
      title: 'Access Control',
      hidden: false,
      icon: 'Lock',
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: 'User Management',
          hidden: false,
          icon: 'User',
        },
      },
      {
        path: '/acl/role', //path要么这么写, 要么像下面那种写
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: 'Role Management',
          hidden: false,
          icon: 'UserFilled',
        },
      },
      {
        path: '/permission', //path要么这么写, 要么像上面那种写
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: 'Menu Management',
          hidden: false,
          icon: 'Grid',
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product', //命名路由
    redirect: '/product/trademark',
    meta: {
      title: 'Product Management',
      hidden: false,
      icon: 'Goods',
    },
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark', //命名路由
        meta: {
          title: 'Trademark Management',
          hidden: false,
          icon: 'ShoppingBag',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr', //命名路由
        meta: {
          title: 'Attributes Management',
          hidden: false,
          icon: 'TakeawayBox',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu', //命名路由
        meta: {
          title: 'SPU Management',
          hidden: false,
          icon: 'ShoppingBag',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku', //命名路由
        meta: {
          title: 'SKU Management',
          hidden: false,
          icon: 'Wallet',
        },
      },
    ],
  },
  {
    //任意路由, 指的是上面这几个都没匹配上, 那就访问这个, 重定向到404
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: 'Any',
      hidden: true,
      icon: 'CaretBottom',
    },
  },
]
