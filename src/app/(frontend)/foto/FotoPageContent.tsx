import { Media } from '@/components/Media'
import {
  MaritimeEmptyState,
  MaritimePanel,
  PageHero,
  SectionHeading,
} from '@/components/maritime/site'
import type { Media as MediaType } from '@/payload-types'
import { Camera, Sailboat } from 'lucide-react'

export function FotoPageContent({ galleryPage }: { galleryPage: any }) {
  const tabs = galleryPage.tabs || []
  const items = galleryPage.items || []

  return (
    <>
      <PageHero
        image={galleryPage.bannerBackgroundImage}
        badge={
          typeof galleryPage.heroImage === 'object' && galleryPage.heroImage?.url ? (
            <div className="size-24 overflow-hidden rounded-full border-4 border-[#fed65b] bg-white shadow-xl">
              <Media resource={galleryPage.heroImage} className="h-full w-full object-cover" />
            </div>
          ) : (
            <Sailboat className="size-10 text-[#fed65b]" />
          )
        }
        title={galleryPage.heroTitle || ''}
        description={galleryPage.heroDescription || ''}
      />
      <section className="px-6 py-20 md:px-8">
        <div className="container space-y-10">
          {tabs.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {tabs.map((tab: { id?: string | null; label?: string | null }, index: number) => (
                <button
                  key={tab.id || tab.label}
                  className={`rounded-md px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    index === 0
                      ? 'border-b-2 border-[#fed65b] bg-[#f6f3f2] text-[#735c00]'
                      : 'text-[#737781] hover:bg-[#f6f3f2] hover:text-[#735c00]'
                  }`}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
          <SectionHeading
            title={galleryPage.sectionTitle || ''}
            description={galleryPage.sectionDescription || undefined}
          />
          {items.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map(
                (item: {
                  accent?: 'blue' | 'gold' | null
                  description?: string | null
                  id?: string | null
                  image?: MediaType | number | null
                  title?: string | null
                }) => (
                  <MaritimePanel
                    key={item.id || item.title}
                    className={`overflow-hidden border-t-4 ${
                      item.accent === 'blue' ? 'border-[#003f7f]' : 'border-[#fed65b]'
                    }`}
                  >
                    {typeof item.image === 'object' && item.image?.url ? (
                      <Media resource={item.image} className="aspect-[4/5]" />
                    ) : (
                      <div className="aspect-[4/5] bg-[linear-gradient(135deg,#d6e3ff_0%,#315ea0_45%,#002957_100%)]" />
                    )}
                    <div className="flex items-center justify-between p-5">
                      <div>
                        <h3 className="text-lg font-semibold text-[#1c1b1b]">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-[#434750]">{item.description}</p>
                        )}
                      </div>
                      <div className="flex size-8 items-center justify-center rounded-full bg-[#f6f3f2] text-[#735c00]">
                        <Camera className="size-4" />
                      </div>
                    </div>
                  </MaritimePanel>
                ),
              )}
            </div>
          ) : (
            <MaritimeEmptyState
              title="Galeri belum diisi"
              description="Tambahkan item galeri dan media di global Gallery Page untuk menampilkan dokumentasi organisasi."
            />
          )}
        </div>
      </section>
    </>
  )
}
