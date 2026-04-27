import { PageHero } from '@/components/maritime/site'
import { Sailboat } from 'lucide-react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { AbsensiClient } from './AbsensiClient'

export const dynamic = 'force-dynamic'

export default async function AbsensiPage() {
  const payload = await getPayload({ config: configPromise })
  
  // Find the first open event
  const { docs: acaraDocs } = await payload.find({
    collection: 'acara',
    where: {
      status: {
        equals: 'buka',
      },
    },
    limit: 1,
    sort: '-tanggal',
  })

  const activeAcara = acaraDocs[0] || null

  let summary = {
    total: 0,
    hadir: 0,
    terlambat: 0,
    tidakHadir: 0,
  }

  // If there's an active event, count attendances
  if (activeAcara) {
    const { docs: attendances } = await payload.find({
      collection: 'absensi',
      where: {
        acara: {
          equals: activeAcara.id,
        },
      },
      pagination: false,
    })

    summary.total = attendances.length
    summary.hadir = attendances.filter((a) => a.status === 'hadir').length
    summary.terlambat = attendances.filter((a) => a.status === 'terlambat').length
    summary.tidakHadir = attendances.filter((a) => a.status === 'tidak_hadir').length
  }

  return (
    <>
      <PageHero
        badge={<Sailboat className="size-10 text-[#fed65b]" />}
        title="Absensi"
        description="Pencatatan kehadiran dinamis. Data langsung masuk ke dashboard admin."
      />
      <section className="px-6 py-20 md:px-8">
        <AbsensiClient activeAcara={activeAcara} initialSummary={summary} />
      </section>
    </>
  )
}

