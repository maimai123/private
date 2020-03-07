export default [
  {
    path: '/tags',
    component: () => import('@/components/layout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'tags',
        component: () => import('@/views/tags/index'),
        meta: { requiresAuth: true }
      }
    ]
  }
];
