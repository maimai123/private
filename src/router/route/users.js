export default [
  {
    path: '/users',
    component: () => import('@/components/layout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'users',
        component: () => import('@/views/users/index'),
        meta: { requiresAuth: true }
      }
    ]
  }
];
