export default [
  {
    path: '/order',
    component: () => import('@/components/layout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: { requiresAuth: true }
      }
    ]
  }
];
