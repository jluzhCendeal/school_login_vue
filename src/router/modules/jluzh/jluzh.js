export default {
    path: '/jluzh',
    component: () => import('@/views/jluzh/home/Home'),
    children: [
        {
            path: 'score',
            meta: '查询成绩',
            token: true,
            component: () => import('@/views/jluzh/home/score/Score')
        },
        {
            path: 'me',
            meta: '我',
            token: true,
            component: () => import('@/views/jluzh/home/me/Me'),

        },
        {
            path: 'schedule',
            meta: '查询课表',
            token: true,
            component: () => import('@/views/jluzh/home/schedule/Schedule')
        }

    ]
}
