import { useTranslation } from 'react-i18next';
import { AdSlot } from '@/features/ads/components/ad-slot';
import { cn } from '@/lib/utils';
import { ReaderToolbar } from '../components/reader-toolbar';
import { useReaderSettings } from '../hooks/use-reader-settings';

const paragraphs = [
  'The city woke under a pale morning sky, its towers catching light before the streets remembered their noise.',
  'Linh paused at the old archive door and ran her thumb across the brass seal. Every story in the lower vault had a price, and today she finally knew which one she was willing to pay.',
  'Somewhere beneath the floor, machinery breathed in slow metallic rhythms. The archive was not asleep. It was listening.',
];

export function ChapterReaderPage() {
  const { t } = useTranslation();
  const { settings, classes, updateSetting } = useReaderSettings();

  return (
    <div className={cn('min-h-screen text-reader-page-foreground', classes.background)}>
      <ReaderToolbar settings={settings} onChange={updateSetting} />
      <article className={cn('mx-auto grid gap-8 px-4 py-8 md:py-12', classes.container)}>
        <AdSlot slot="reader_top" />
        <header className="grid gap-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('reader.sampleNovel')}
          </p>
          <h1 className="text-3xl font-bold tracking-normal md:text-4xl">
            {t('reader.sampleChapter')}
          </h1>
        </header>
        <div className={cn('grid gap-6', classes.content)}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <AdSlot slot="reader_after_chapter" />
      </article>
    </div>
  );
}
