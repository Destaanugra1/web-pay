'use client'

import React, { useState } from 'react'
import { MaritimePanel, SectionHeading } from '@/components/maritime/site'
import { Camera } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Acara = {
  id: string
  title: string
  tanggal: string
  kategori: string
  deskripsi?: string
  formTitle?: string
  formDescription?: string
  enablePhoto?: boolean
  enableCatatan?: boolean
  customFields?: {
    id: string
    name: string
    type: 'text' | 'textarea' | 'checkbox'
    required?: boolean
  }[]
}

type Summary = {
  total: number
  hadir: number
  terlambat: number
  tidakHadir: number
}

export function AbsensiClient({ activeAcara, initialSummary }: { activeAcara: Acara | null; initialSummary: Summary }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!activeAcara) return

    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    
    const customData: Record<string, any> = {}
    
    if (activeAcara.customFields) {
      activeAcara.customFields.forEach((field) => {
        if (field.type === 'checkbox') {
          customData[field.name] = formData.get(`custom_${field.id}`) === 'on'
        } else {
          customData[field.name] = formData.get(`custom_${field.id}`)
        }
      })
    }

    // In a real scenario with image upload, we'd upload the image to Payload's Media API first,
    // then submit the relation ID. For now, we submit text data.
    const payload = {
      acara: activeAcara.id,
      nama: formData.get('nama'),
      status: formData.get('status'),
      catatan: formData.get('catatan'),
      customData,
    }

    try {
      const res = await fetch('/api/absensi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setSuccess(true)
        router.refresh() // Refresh page to update summary
      } else {
        alert('Gagal mengirim absensi. Silakan coba lagi.')
      }
    } catch (err) {
      console.error(err)
      alert('Terjadi kesalahan sistem.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-xl border border-[#c3c6d2] bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#e6f4ea] text-2xl">
          ✅
        </div>
        <h3 className="mt-6 text-xl font-bold text-[#1c1b1b]">Absensi Berhasil Dicatat!</h3>
        <p className="mt-2 text-[#434750]">Terima kasih atas partisipasi Anda.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-6 inline-block rounded-md bg-[#003f7f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#002957]"
        >
          Kirim Data Lainnya
        </button>
      </div>
    )
  }

  return (
    <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <MaritimePanel className="p-8">
        <SectionHeading
          eyebrow="Form"
          title={activeAcara ? (activeAcara.formTitle || activeAcara.title) : 'Tidak Ada Acara Aktif'}
          description={activeAcara ? (activeAcara.formDescription || activeAcara.deskripsi || 'Silakan isi data kehadiran Anda.') : 'Silakan tunggu acara dibuka.'}
        />
        
        {activeAcara ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[#434750]">
                Nama Peserta
              </label>
              <input
                required
                name="nama"
                type="text"
                placeholder="Masukkan nama lengkap"
                className="h-12 w-full rounded-lg border border-[#c3c6d2] px-4 text-[#1c1b1b] outline-none ring-[#315ea0] transition focus:ring-2"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1c1b1b]">
                Status Kehadiran
              </label>
              <div className="grid gap-3">
                {[
                  ['Hadir', 'Tepat waktu dan hadir fisik', 'hadir'],
                  ['Terlambat', 'Masuk setelah agenda dimulai', 'terlambat'],
                  ['Tidak Hadir', 'Berhalangan dengan catatan', 'tidak_hadir'],
                ].map(([label, description, val]) => (
                  <label
                    key={val}
                    className="cursor-pointer rounded-lg border border-[#c3c6d2] px-4 py-3 transition hover:bg-[#f6f3f2]"
                  >
                    <div className="flex items-start gap-3">
                      <input required type="radio" name="status" value={val} className="mt-1 accent-[#003f7f]" />
                      <div>
                        <div className="font-semibold text-[#1c1b1b]">{label}</div>
                        <div className="text-sm text-[#434750]">{description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            {/* Custom Fields */}
            {activeAcara.customFields && activeAcara.customFields.map((field) => (
              <div key={field.id} className="space-y-2">
                {field.type !== 'checkbox' && (
                  <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1c1b1b]">
                    {field.name} {field.required && <span className="text-red-500">*</span>}
                  </label>
                )}
                
                {field.type === 'text' && (
                  <input
                    required={field.required}
                    name={`custom_${field.id}`}
                    type="text"
                    placeholder={`Masukkan ${field.name.toLowerCase()}`}
                    className="h-12 w-full rounded-lg border border-[#c3c6d2] px-4 text-[#1c1b1b] outline-none ring-[#315ea0] transition focus:ring-2"
                  />
                )}

                {field.type === 'textarea' && (
                  <textarea
                    required={field.required}
                    name={`custom_${field.id}`}
                    rows={3}
                    placeholder={`Masukkan ${field.name.toLowerCase()}`}
                    className="w-full rounded-lg border border-[#c3c6d2] px-4 py-3 outline-none ring-[#315ea0] transition focus:ring-2"
                  />
                )}

                {field.type === 'checkbox' && (
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#c3c6d2] px-4 py-3 transition hover:bg-[#f6f3f2]">
                    <input
                      required={field.required}
                      type="checkbox"
                      name={`custom_${field.id}`}
                      className="mt-1 accent-[#003f7f]"
                    />
                    <div className="font-medium text-[#1c1b1b]">
                      {field.name} {field.required && <span className="text-red-500">*</span>}
                    </div>
                  </label>
                )}
              </div>
            ))}

            {activeAcara.enableCatatan !== false && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1c1b1b]">
                  Catatan
                </label>
                <textarea
                  name="catatan"
                  rows={3}
                  placeholder="Alasan keterlambatan atau ketidakhadiran (jika ada)..."
                  className="w-full rounded-lg border border-[#c3c6d2] px-4 py-3 outline-none ring-[#315ea0] transition focus:ring-2"
                />
              </div>
            )}
            
            {activeAcara.enablePhoto !== false && (
              <button 
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-[#e0e2e8] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1c1b1b] transition hover:bg-[#c3c6d2]"
                onClick={() => alert('Fitur upload foto belum diimplementasikan di demo ini.')}
              >
                <Camera className="size-4" />
                Upload bukti foto
              </button>
            )}
            
            <button 
              disabled={isSubmitting}
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#002957] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-70"
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Absensi'}
            </button>
          </form>
        ) : (
          <div className="mt-8 rounded-lg border border-dashed border-[#c3c6d2] p-8 text-center text-[#737781]">
            Saat ini tidak ada acara yang membuka sesi absensi.
          </div>
        )}
      </MaritimePanel>

      <div className="space-y-8">
        <MaritimePanel className="p-8">
          <SectionHeading
            eyebrow="Filter"
            title="Rekapitulasi Saat Ini"
            description="Angka kehadiran *real-time* untuk acara yang sedang berlangsung."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-[#f6f3f2] p-5">
              <div className="font-serif text-4xl text-[#003f7f]">{initialSummary.total}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.22em] text-[#434750]">Total Peserta</div>
            </div>
            <div className="rounded-xl bg-[#f6f3f2] p-5">
              <div className="font-serif text-4xl text-[#003f7f]">{initialSummary.hadir}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.22em] text-[#434750]">Hadir Tepat Waktu</div>
            </div>
            <div className="rounded-xl bg-[#f6f3f2] p-5">
              <div className="font-serif text-4xl text-[#003f7f]">{initialSummary.terlambat}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.22em] text-[#434750]">Terlambat</div>
            </div>
            <div className="rounded-xl bg-[#f6f3f2] p-5">
              <div className="font-serif text-4xl text-[#003f7f]">{initialSummary.tidakHadir}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.22em] text-[#434750]">Tidak Hadir</div>
            </div>
          </div>
        </MaritimePanel>

        {activeAcara && (
          <MaritimePanel className="p-8">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#434750]">Acara</div>
                <div className="font-medium text-[#1c1b1b]">{activeAcara.title}</div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#434750]">Tanggal</div>
                <div className="font-medium text-[#1c1b1b]">
                  {new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(activeAcara.tanggal))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#434750]">Kategori</div>
                <div className="font-medium capitalize text-[#1c1b1b]">{activeAcara.kategori}</div>
              </div>
            </div>
          </MaritimePanel>
        )}
      </div>
    </div>
  )
}
