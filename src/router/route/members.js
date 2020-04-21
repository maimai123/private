export default [
  {
    path: '/members',
    component: () => import('@/components/layout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'members',
        component: () => import('@/views/members/index'),
        meta: { requiresAuth: true }
      }
    ]
  }
];
