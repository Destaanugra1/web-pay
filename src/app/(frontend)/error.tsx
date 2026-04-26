'use client'

export default function FrontendError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="px-6 py-16 md:px-8">
      <div className="container max-w-3xl rounded-2xl border border-[#c3c6d2] bg-white p-10 shadow-[0_4px_12px_rgba(28,27,27,0.05)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#735c00]">
          Frontend Error
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-[#002957]">
          Halaman gagal dimuat
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#434750]">
          {error.message || 'Terjadi kesalahan saat mengambil data dari CMS.'}
        </p>
        <button
          className="mt-8 rounded-lg bg-[#fed65b] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#745c00]"
          onClick={reset}
          type="button"
        >
          Coba lagi
        </button>
      </div>
    </main>
  )
}
