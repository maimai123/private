export default [
  {
    path: '/user',
    component: () => import('@/components/layout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'reset',
        component: () => import('@/views/user/reset'),
        meta: { requiresAuth: true }
      }
    ]
  }
];
