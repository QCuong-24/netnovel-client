export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    google: '/auth/google',
    me: '/auth/me',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  novels: {
    list: '/novels',
    detail: (novelId: string) => `/novels/${novelId}`,
  },
  rankings: {
    list: '/rankings',
  },
  comments: {
    byNovel: (novelId: string) => `/novels/${novelId}/comments`,
  },
  notifications: {
    list: '/notifications',
    sse: '/notifications/stream',
  },
} as const;
