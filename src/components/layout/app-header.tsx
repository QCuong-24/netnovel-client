import { Bell, LibraryBig, Search, Upload } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useCurrentUser, useLogoutMutation } from '@/features/auth/hooks/use-auth';
import { LanguageSwitcher } from './language-switcher';
import { MobileNav } from './mobile-nav';
import { ThemeToggle } from './theme-toggle';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

const navItems = [
  { to: routes.home, key: 'nav.home' },
  { to: routes.novels, key: 'nav.library' },
  { to: routes.rankings, key: 'nav.rankings' },
  { to: routes.dashboard, key: 'nav.dashboard' },
];

export function AppHeader() {
  const { t } = useTranslation();
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogoutMutation();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center gap-4 px-4 md:px-6">
        <NavLink to={routes.home} className="flex items-center gap-2 font-extrabold text-primary">
          <LibraryBig className="size-6" />
          <span>NetNovel</span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                  isActive && 'bg-accent text-accent-foreground',
                )
              }
              key={item.to}
              to={item.to}
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <label className="ml-auto hidden h-10 min-w-64 items-center gap-2 rounded-md border bg-card px-3 text-muted-foreground lg:flex">
          <Search className="size-4" />
          <input
            className="w-full bg-transparent text-sm text-foreground outline-none"
            placeholder={t('common.searchPlaceholder')}
          />
        </label>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <ThemeToggle />
          <LanguageSwitcher />
          <Button
            aria-label={t('nav.notifications')}
            size="icon"
            variant="ghost"
            type="button"
          >
            <Bell />
          </Button>
          {user ? (
            <>
              <Button className="hidden md:inline-flex" variant="ghost" asChild>
                <Link to={routes.profile}>{user.username}</Link>
              </Button>
              <Button
                className="hidden md:inline-flex"
                disabled={logoutMutation.isPending}
                variant="outline"
                type="button"
                onClick={() => logoutMutation.mutate()}
              >
                {t('auth.logout')}
              </Button>
            </>
          ) : (
            <Button className="hidden md:inline-flex" variant="outline" asChild>
              <Link to={routes.login}>{t('auth.login')}</Link>
            </Button>
          )}
          <Button className="hidden md:inline-flex" type="button">
            <Upload />
            {t('common.upload')}
          </Button>
          <MobileNav user={user} onLogout={() => logoutMutation.mutate()} isLoggingOut={logoutMutation.isPending} />
        </div>
      </div>
    </header>
  );
}
