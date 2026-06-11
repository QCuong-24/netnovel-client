import { Bell, LibraryBig, LogOut, Menu, Upload, UserRound } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { routes } from '@/config/routes';
import type { User } from '@/features/auth/types';
import { cn } from '@/lib/utils';

const navItems = [
  { to: routes.home, key: 'nav.home' },
  { to: routes.novels, key: 'nav.library' },
  { to: routes.rankings, key: 'nav.rankings' },
  { to: routes.dashboard, key: 'nav.dashboard' },
  { to: routes.notifications, key: 'nav.notifications' },
  { to: routes.profile, key: 'nav.profile' },
];

type MobileNavProps = {
  user?: User;
  isLoggingOut?: boolean;
  onLogout: () => void;
};

export function MobileNav({ user, isLoggingOut = false, onLogout }: MobileNavProps) {
  const { t } = useTranslation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden" size="icon" variant="ghost" type="button" aria-label={t('nav.menu')}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="grid gap-6">
          <div className="grid gap-1 pr-10">
            <SheetTitle className="flex items-center gap-2 text-left text-lg font-extrabold text-primary">
              <LibraryBig className="size-6" />
              NetNovel
            </SheetTitle>
            <SheetDescription className="text-left text-sm text-muted-foreground">
              {t('footer.description')}
            </SheetDescription>
          </div>

          <nav className="grid gap-1">
            {navItems.map((item) => (
              <SheetClose asChild key={item.to}>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-3 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                      isActive && 'bg-accent text-accent-foreground',
                    )
                  }
                  to={item.to}
                >
                  {t(item.key)}
                </NavLink>
              </SheetClose>
            ))}
          </nav>

          <div className="grid gap-3 border-t pt-4">
            {user ? (
              <>
                <Button className="justify-start" variant="outline" asChild>
                  <Link to={routes.profile}>
                    <UserRound />
                    {user.username}
                  </Link>
                </Button>
                <Button
                  className="justify-start"
                  disabled={isLoggingOut}
                  variant="outline"
                  type="button"
                  onClick={onLogout}
                >
                  <LogOut />
                  {t('auth.logout')}
                </Button>
              </>
            ) : (
              <Button className="justify-start" variant="outline" asChild>
                <Link to={routes.login}>
                  <UserRound />
                  {t('auth.login')}
                </Link>
              </Button>
            )}
            <Button className="justify-start" variant="outline" type="button">
              <Bell />
              {t('nav.notifications')}
            </Button>
            <Button className="justify-start" type="button">
              <Upload />
              {t('common.upload')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
