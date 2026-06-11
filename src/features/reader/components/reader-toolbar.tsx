import { ArrowLeft, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ReaderSettingsPanel } from './reader-settings-panel';
import type { ReaderSettings } from '../types';

type ReaderToolbarProps = {
  settings: ReaderSettings;
  onChange: <TKey extends keyof ReaderSettings>(key: TKey, value: ReaderSettings[TKey]) => void;
};

export function ReaderToolbar({ settings, onChange }: ReaderToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex min-h-14 max-w-5xl items-center gap-2 px-4">
        <Button asChild size="sm" variant="ghost">
          <Link to="/">
            <ArrowLeft />
            {t('common.back')}
          </Link>
        </Button>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setIsOpen((current) => !current)}
          >
            <Settings />
            {t('reader.settings')}
          </Button>
        </div>
      </div>
      {isOpen ? (
        <div className="mx-auto max-w-5xl px-4 pb-4">
          <ReaderSettingsPanel settings={settings} onChange={onChange} />
        </div>
      ) : null}
    </header>
  );
}
