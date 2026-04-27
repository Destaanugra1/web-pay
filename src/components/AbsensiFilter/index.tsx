'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export const AbsensiFilter: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [acaras, setAcaras] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const activeAcara = searchParams.get('where[acara][equals]')

  useEffect(() => {
    // Fetch available Acara from Payload API
    const fetchAcaras = async () => {
      try {
        const res = await fetch('/api/acara?sort=-tanggal&limit=10')
        const data = await res.json()
        setAcaras(data.docs || [])
      } catch (err) {
        console.error('Failed to fetch acara', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAcaras()
  }, [])

  const handleSelect = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Clear page params when filtering
    params.delete('page')
    
    if (id) {
      params.set('where[acara][equals]', id)
    } else {
      params.delete('where[acara][equals]')
    }

    router.push(`?${params.toString()}`)
  }

  if (loading) return null

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '8px' }}>
        Filter Berdasarkan Acara
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => handleSelect(null)}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            border: !activeAcara ? '1px solid #fed65b' : '1px solid var(--theme-border-color)',
            backgroundColor: !activeAcara ? '#fed65b' : 'transparent',
            color: !activeAcara ? '#745c00' : 'inherit',
            transition: 'all 0.2s',
          }}
        >
          Semua Data
        </button>
        {acaras.map((acara) => {
          const isActive = activeAcara === acara.id
          return (
            <button
              key={acara.id}
              onClick={() => handleSelect(acara.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                border: isActive ? '1px solid #fed65b' : '1px solid var(--theme-border-color)',
                backgroundColor: isActive ? '#fed65b' : 'transparent',
                color: isActive ? '#745c00' : 'inherit',
                transition: 'all 0.2s',
              }}
            >
              {acara.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
