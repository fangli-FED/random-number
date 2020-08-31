export default {
  lottle: {
    left: [
      {
        name: 'navaelfSysName',
        path: '/homepage',
        children: [
          '/lottlery'
        ]
      }
    ],
    right: [
      {
        name: 'newProject',
        path: '/manage',
        children: [
          '/manage',
          '/manage/create'
        ]
      },
    ]
  },
  manage: {
    left: [
      {
        name: 'navaelfSysName',
        path: '/homepage',
        children: [
          '/lottlery'
        ]
      }
    ],
    right: [
      {
        name: 'newProject',
        path: '/manage',
        children: [
          '/manage',
          '/manage/create'
        ]
      },
      {
        name: 'navProjectManage',
        path: '/manage/list',
        children: [
          '/manage/list'
        ]
      }
    ]
  },
};
