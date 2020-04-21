export default [
  {
    path: '/setting',
    component: () => import('@/components/layout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'setting',
        component: () => import('@/views/setting/index'),
        meta: { requiresAuth: true }
      }
    ]
  }
];
