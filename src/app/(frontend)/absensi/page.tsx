import { attendanceSummary } from '@/components/maritime/content'
import { MaritimePanel, PageHero, SectionHeading } from '@/components/maritime/site'
import { Camera, Sailboat } from 'lucide-react'

export default function AbsensiPage() {
  return (
    <>
      <PageHero
        badge={<Sailboat className="size-10 text-[#fed65b]" />}
        title="Absensi"
        description="Halaman kehadiran dengan kartu formulir, pilihan status radio, dan panel rekap seperti pada desain attendance."
      />
      <section className="px-6 py-20 md:px-8">
        <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <MaritimePanel className="p-8">
            <SectionHeading
              eyebrow="Form"
              title="Rapat Paripurna Tahunan"
              description="Visual siap pakai untuk pencatatan kehadiran kegiatan."
            />
            <form className="mt-8 space-y-6">
              <Field label="Nama Peserta" placeholder="Masukkan nama lengkap" />
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1c1b1b]">
                  Status Kehadiran
                </label>
                <div className="grid gap-3">
                  {[
                    ['Hadir', 'Tepat waktu dan hadir fisik'],
                    ['Terlambat', 'Masuk setelah agenda dimulai'],
                    ['Tidak Hadir', 'Berhalangan dengan catatan'],
                  ].map(([label, description]) => (
                    <label
                      key={label}
                      className="rounded-lg border border-[#c3c6d2] px-4 py-3 transition hover:bg-[#f6f3f2]"
                    >
                      <div className="flex items-start gap-3">
                        <input type="radio" name="status" className="mt-1 accent-[#003f7f]" />
                        <div>
                          <div className="font-semibold text-[#1c1b1b]">{label}</div>
                          <div className="text-sm text-[#434750]">{description}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1c1b1b]">
                  Catatan
                </label>
                <textarea
                  rows={3}
                  placeholder="Alasan keterlambatan atau ketidakhadiran..."
                  className="w-full rounded-lg border border-[#c3c6d2] px-4 py-3 outline-none ring-[#315ea0] transition focus:ring-2"
                />
              </div>
              <button className="inline-flex items-center gap-2 rounded-md bg-[#002957] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                <Camera className="size-4" />
                Upload bukti foto
              </button>
            </form>
          </MaritimePanel>

          <div className="space-y-8">
            <MaritimePanel className="p-8">
              <SectionHeading
                eyebrow="Filter"
                title="Rekapitulasi Saat Ini"
                description="Panel angka utama dan tabel ringkas mengikuti pola rekap pada desain sumber."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {attendanceSummary.map((item) => (
                  <div key={item.label} className="rounded-xl bg-[#f6f3f2] p-5">
                    <div className="font-serif text-4xl text-[#003f7f]">{item.value}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.22em] text-[#434750]">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </MaritimePanel>
            <MaritimePanel className="p-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Acara" placeholder="Pilih agenda" />
                <Field label="Tanggal" placeholder="" type="date" />
                <Field label="Kategori" placeholder="Internal" />
              </div>
            </MaritimePanel>
          </div>
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
