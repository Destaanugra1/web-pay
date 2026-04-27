import { Media } from '@/components/Media'
import {
  MaritimeEmptyState,
  MaritimePanel,
  PageHero,
  SectionHeading,
} from '@/components/maritime/site'
import type { Media as MediaType } from '@/payload-types'
import { ArrowRight, Sailboat } from 'lucide-react'

export function StrukturPageContent({ structure }: { structure: any }) {
  const coreMembers = structure.coreMembers || []
  const divisions = structure.divisions || []

  return (
    <>
      <PageHero
        image={structure.bannerBackgroundImage}
        badge={
          typeof structure.heroImage === 'object' && structure.heroImage?.url ? (
            <div className="size-24 overflow-hidden rounded-full border-4 border-[#fed65b] bg-white shadow-xl">
              <Media resource={structure.heroImage} className="h-full w-full object-cover" />
            </div>
          ) : (
            <Sailboat className="size-10 text-[#fed65b]" />
          )
        }
        title={structure.heroTitle || ''}
        description={structure.heroDescription || ''}
      />
      <section className="px-6 py-20 md:px-8">
        <div className="container space-y-12">
          {structure.leader?.name ? (
            <div className="flex flex-col items-center">
              <MaritimePanel className="w-full max-w-xs border-t-4 border-[#fed65b] bg-[#002957] p-6 text-center text-white">
                <p className="text-xs uppercase tracking-[0.22em] text-[#d6e3ff]">Pimpinan</p>
                <h2 className="mt-2 text-3xl font-semibold">{structure.leader.name}</h2>
                {structure.leader.role && (
                  <p className="mt-1 text-sm text-[#fed65b]">{structure.leader.role}</p>
                )}
              </MaritimePanel>
              {coreMembers.length > 0 && (
                <>
                  <div className="h-12 w-px bg-[#c3c6d2]" />
                  <div className="grid w-full gap-6 md:grid-cols-3">
                    {coreMembers.slice(0, 3).map(
                      (member: {
                        id?: string | null
                        name?: string | null
                        role?: string | null
                      }) => (
                        <MaritimePanel
                          key={member.id || member.name}
                          className="border-t-4 border-[#fed65b] bg-[#003f7f] p-5 text-center text-white"
                        >
                          <h3 className="text-2xl font-semibold">{member.name}</h3>
                          {member.role && (
                            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#d6e3ff]">
                              {member.role}
                            </p>
                          )}
                        </MaritimePanel>
                      ),
                    )}
                  </div>
                </>
              )}
            </div>
          ) : (
            <MaritimeEmptyState
              title="Pimpinan organisasi belum diisi"
              description="Lengkapi data leader pada global Struktur Organisasi untuk menampilkan bagan pimpinan."
            />
          )}

          <SectionHeading
            title={structure.divisionsSectionTitle || ''}
            description={structure.divisionsSectionDescription || undefined}
          />
          {divisions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {divisions.map(
                (division: {
                  id?: string | null
                  leadName?: string | null
                  leadPhoto?: MediaType | number | null
                  leadRole?: string | null
                  name?: string | null
                  tasks?: { id?: string | null; task?: string | null }[] | null
                }) => (
                  <MaritimePanel key={division.id || division.name} className="border-t-4 border-[#fed65b] p-6">
                    <div className="mb-5 flex items-center gap-4">
                      <DivisionAvatar
                        name={division.leadName || ''}
                        photo={typeof division.leadPhoto === 'object' ? division.leadPhoto : null}
                      />
                      <div>
                        <h3 className="text-2xl font-semibold text-[#1c1b1b]">{division.name}</h3>
                        <p className="text-sm text-[#434750]">
                          Koordinator: {division.leadName}
                          {division.leadRole ? `, ${division.leadRole}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {(division.tasks || []).map((task) => (
                        <div
                          key={task.id || task.task}
                          className="flex items-start gap-3 text-sm text-[#434750]"
                        >
                          <ArrowRight className="mt-0.5 size-4 text-[#735c00]" />
                          <span>{task.task}</span>
                        </div>
                      ))}
                    </div>
                  </MaritimePanel>
                ),
              )}
            </div>
          ) : (
            <MaritimeEmptyState
              title="Divisi belum diisi"
              description="Tambahkan divisi, koordinator, dan tugasnya di Payload agar struktur tampil lengkap."
            />
          )}
        </div>
      </section>
    </>
  )
}

function DivisionAvatar({
  name,
  photo,
}: {
  name: string
  photo?: MediaType | null
}) {
  if (photo?.url) {
    return (
      <div className="size-16 overflow-hidden rounded-full border-2 border-[#fed65b] bg-white">
        <Media resource={photo} className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#fed65b] bg-[#fcf9f8] text-lg font-semibold text-[#003f7f]">
      {name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')}
    </div>
  )
}
