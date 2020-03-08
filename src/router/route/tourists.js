export default [
  {
    path: '/tourists',
    component: () => import('@/components/layout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'tourists',
        component: () => import('@/views/tourists/index'),
        meta: { requiresAuth: true }
      }
    ]
  }
];
