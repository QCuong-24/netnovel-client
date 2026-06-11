import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';

export function RootLayout() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-background text-foreground">
      <AppHeader />
      <Outlet />
      <AppFooter />
    </div>
  );
}
