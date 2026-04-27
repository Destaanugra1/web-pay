import { Media } from '@/components/Media'
import { MaritimeEmptyState, PageHero, SectionHeading } from '@/components/maritime/site'
import { ArrowRight, Sailboat, UploadCloud } from 'lucide-react'

export function PendaftaranPageContent({ registrationPage }: { registrationPage: any }) {
  const steps = registrationPage.stepLabels || []
  const faculties = registrationPage.facultyOptions || []
  const divisions = registrationPage.divisionOptions || []

  return (
    <>
      <PageHero
        image={registrationPage.bannerBackgroundImage}
        badge={
          typeof registrationPage.heroImage === 'object' && registrationPage.heroImage?.url ? (
            <div className="size-20 overflow-hidden rounded-full border-2 border-[#fed65b] bg-white shadow-xl">
              <Media resource={registrationPage.heroImage} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#fed65b] bg-white/10 text-[#fed65b]">
              <Sailboat className="size-7" />
            </div>
          )
        }
        title={registrationPage.heroTitle || ''}
        description={registrationPage.heroDescription || ''}
      />
      <section className="-mt-16 px-6 pb-20 md:px-8">
        <div className="container max-w-3xl rounded-2xl border border-[#c3c6d2] bg-white p-8 shadow-[0_4px_12px_rgba(28,27,27,0.05)] md:p-12">
          {steps.length > 0 && (
            <div className="mb-10 flex items-center justify-center gap-4">
              {steps.map((step: { id?: string | null; label?: string | null }, index: number) => (
                <div key={step.id || `${step.label}-${index}`} className="flex items-center gap-4">
                  <div
                    className={`size-3 rounded-full ${index === 0 ? 'bg-[#fed65b]' : 'bg-[#e5e2e1]'}`}
                  />
                  {index < steps.length - 1 && <div className="h-0.5 w-12 bg-[#e5e2e1]" />}
                </div>
              ))}
            </div>
          )}
          <SectionHeading
            title={registrationPage.formTitle || ''}
            description={registrationPage.formDescription || undefined}
          />
          <form className="mt-10 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Nama Lengkap" placeholder="Masukkan nama lengkap Anda" />
              <Field label="Email" placeholder="email@mahasiswa.edu" type="email" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="No. HP / WhatsApp" placeholder="+62 8xx xxxx xxxx" />
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[#434750]">
                  Asal Fakultas
                </label>
                <select className="h-12 w-full rounded-lg border border-[#c3c6d2] bg-white px-4 text-[#1c1b1b] outline-none ring-[#315ea0] transition focus:ring-2">
                  {faculties.length > 0 ? (
                    faculties.map((faculty: { id?: string | null; label?: string | null }) => (
                      <option key={faculty.id || faculty.label}>{faculty.label}</option>
                    ))
                  ) : (
                    <option>Belum ada pilihan fakultas</option>
                  )}
                </select>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[#434750]">
                Divisi Diminati
              </label>
              {divisions.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {divisions.map((division: { id?: string | null; label?: string | null }) => (
                    <label
                      key={division.id || division.label}
                      className="flex items-center gap-3 rounded-lg border border-[#c3c6d2] px-4 py-3 transition hover:bg-[#f6f3f2]"
                    >
                      <input type="checkbox" className="size-4 accent-[#003f7f]" />
                      <span>{division.label}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <MaritimeEmptyState
                  title="Pilihan divisi belum diisi"
                  description="Tambahkan opsi divisi pada global Registration Page."
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[#434750]">
                Motivasi Bergabung
              </label>
              <textarea
                rows={4}
                placeholder="Ceritakan singkat mengapa Anda ingin bergabung..."
                className="w-full rounded-lg border border-[#c3c6d2] px-4 py-3 outline-none ring-[#315ea0] transition focus:ring-2"
              />
            </div>
            <div className="rounded-xl border-2 border-dashed border-[#c3c6d2] bg-[#fcf9f8] p-10 text-center">
              <UploadCloud className="mx-auto size-10 text-[#737781]" />
              <p className="mt-3 text-sm text-[#434750]">{registrationPage.uploadLabel || ''}</p>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fed65b] px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#745c00] transition hover:bg-[#ffe088]">
              {registrationPage.submitLabel || ''}
              <ArrowRight className="size-4" />
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

function Field({
  label,
  placeholder,
  type = 'text',
}: {
  label: string
  placeholder: string
  type?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[#434750]">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg border border-[#c3c6d2] px-4 text-[#1c1b1b] outline-none ring-[#315ea0] transition focus:ring-2"
      />
    </div>
  )
}
