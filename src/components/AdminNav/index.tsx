'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { NavIcons } from './icons'

type NavItem = {
  href: string
  label: string
  icon: React.ElementType
}

type NavGroup = {
  label: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    label: 'Konten',
    items: [
      { href: '/admin/collections/posts', label: 'Berita & Artikel', icon: NavIcons.Posts },
      { href: '/admin/collections/pages', label: 'Halaman', icon: NavIcons.Pages },
      { href: '/admin/collections/media', label: 'Media', icon: NavIcons.Media },
      { href: '/admin/collections/categories', label: 'Kategori', icon: NavIcons.Categories },
    ],
  },
  {
    label: 'Absensi',
    items: [
      { href: '/admin/collections/acara', label: 'Acara', icon: NavIcons.Acara },
      { href: '/admin/collections/absensi', label: 'Data Kehadiran', icon: NavIcons.Absensi },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { href: '/admin/globals/site-settings', label: 'Pengaturan Situs', icon: NavIcons.Settings },
      { href: '/admin/globals/home-page', label: 'Home Page', icon: NavIcons.Home },
      { href: '/admin/globals/news-page', label: 'Halaman Berita', icon: NavIcons.NewsPage },
      { href: '/admin/globals/organization-structure', label: 'Struktur Org.', icon: NavIcons.Structure },
      { href: '/admin/globals/gallery-page', label: 'Galeri', icon: NavIcons.Gallery },
      { href: '/admin/globals/registration-page', label: 'Pendaftaran', icon: NavIcons.Registration },
      { href: '/admin/globals/login-page', label: 'Login Page', icon: NavIcons.Login },
    ],
  },
  {
    label: 'Navigasi',
    items: [
      { href: '/admin/globals/header', label: 'Header', icon: NavIcons.Header },
      { href: '/admin/globals/footer', label: 'Footer', icon: NavIcons.Footer },
    ],
  },
  {
    label: 'Sistem',
    items: [
      { href: '/admin/collections/users', label: 'Pengguna', icon: NavIcons.Users },
      { href: '/admin/collections/forms', label: 'Formulir', icon: NavIcons.Forms },
      { href: '/admin/collections/form-submissions', label: 'Kiriman Form', icon: NavIcons.Submissions },
      { href: '/admin/collections/search', label: 'Pencarian', icon: NavIcons.Search },
    ],
  },
]

export function CustomNav() {
  const pathname = usePathname()
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (label: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  return (
    <nav
      className="custom-admin-nav"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflowY: 'auto',
        backgroundColor: '#0d1b2a',
        color: 'white',
        fontFamily: 'inherit',
        /* Custom scrollbar styles */
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.2) transparent',
      }}
    >
      {/* Brand header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '20px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: '#fed65b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '13px',
            color: '#745c00',
            flexShrink: 0,
          }}
        >
          IK
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>Dashboard Admin</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '1px' }}>
            IKMA Management
          </div>
        </div>
      </div>

      {/* Dashboard link */}
      <div style={{ padding: '12px 10px 0' }}>
        <Link
          href="/admin"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            backgroundColor: pathname === '/admin' ? '#fed65b' : 'transparent',
            color: pathname === '/admin' ? '#745c00' : 'rgba(255,255,255,0.7)',
            transition: 'all 0.15s',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <NavIcons.Dashboard size={16} strokeWidth={2} />
          </span>
          <span>Dashboard</span>
        </Link>
      </div>

      {/* Nav groups */}
      <div style={{ flex: 1, padding: '8px 10px 24px', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '8px' }}>
        {navGroups.map((group) => {
          const isCollapsed = collapsedGroups[group.label]

          return (
            <div key={group.label}>
              {/* Group label (Clickable) */}
              <button
                onClick={() => toggleGroup(group.label)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  padding: '4px 12px',
                  marginBottom: '4px',
                  textAlign: 'left',
                }}
              >
                <span>{group.label}</span>
                <span
                  style={{
                    fontSize: '8px',
                    transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                >
                  ▼
                </span>
              </button>

              {/* Items */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
                  maxHeight: isCollapsed ? '0px' : '500px',
                  opacity: isCollapsed ? 0 : 1,
                }}
              >
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '7px 12px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: isActive ? 600 : 400,
                        textDecoration: 'none',
                        backgroundColor: isActive ? '#fed65b' : 'transparent',
                        color: isActive ? '#745c00' : 'rgba(255,255,255,0.65)',
                        transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <item.icon size={16} strokeWidth={2} />
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.05em',
        }}
      >
        Payload CMS · IKMA Portal
      </div>
    </nav>
  )
}
