import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-8 text-foreground">
      <Outlet />
    </main>
  );
}
