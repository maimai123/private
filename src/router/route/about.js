export default [
  {
    path: '/about',
    component: () => import('@/components/layout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'about',
        component: () => import('@/views/about/index'),
        meta: { requiresAuth: true }
      }
    ]
  }
];
