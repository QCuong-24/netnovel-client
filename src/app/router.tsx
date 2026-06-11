import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layouts/root-layout';
import { ReaderLayout } from '@/layouts/reader-layout';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { AuthLayout } from '@/layouts/auth-layout';
import { HomePage } from '@/pages/home-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { PlaceholderPage } from '@/pages/placeholder-page';
import { ChapterReaderPage } from '@/features/reader/pages/chapter-reader-page';
import { LoginPage } from '@/features/auth/pages/login-page';
import { RegisterPage } from '@/features/auth/pages/register-page';
import { ProtectedRoute } from '@/features/auth/components/protected-route';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'novels', element: <PlaceholderPage titleKey="nav.library" /> },
      { path: 'rankings', element: <PlaceholderPage titleKey="nav.rankings" /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'notifications', element: <PlaceholderPage titleKey="nav.notifications" /> },
          { path: 'profile', element: <PlaceholderPage titleKey="nav.profile" /> },
          {
            path: 'dashboard',
            element: <DashboardLayout />,
            children: [
              { index: true, element: <PlaceholderPage titleKey="nav.dashboard" /> },
              { path: 'novels', element: <PlaceholderPage titleKey="nav.myNovels" /> },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <ReaderLayout />,
    children: [
      {
        path: 'novels/:novelId/chapters/:chapterId',
        element: <ChapterReaderPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
