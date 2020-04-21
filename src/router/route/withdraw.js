export default [
  {
    path: '/withdraw',
    component: () => import('@/components/layout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'withdraw',
        component: () => import('@/views/withdraw/index'),
        meta: { requiresAuth: true }
      }
    ]
  }
];
