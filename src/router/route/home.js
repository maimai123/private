export default [
  {
    path: '/home',
    component: () => import('@/components/layout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { requiresAuth: true }
      }
    ]
  }
];
