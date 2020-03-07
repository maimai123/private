export default [
  {
    path: '/demand',
    component: () => import('@/components/layout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'demand',
        component: () => import('@/views/demand/index'),
        meta: { requiresAuth: true }
      },
      {
        path: 'create/:id?',
        props: true,
        name: 'demand/create',
        meta: { requiresAuth: true, sidebar: 'demand' },
        component: resolve => import('@/views/demand/create/index.vue')
      }
    ]
  }
];
