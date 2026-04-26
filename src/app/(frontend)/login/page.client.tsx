'use client'

import { ArrowRight, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { useState, useTransition } from 'react'

export function LoginForm({
  submitLabel,
  successRedirect,
}: {
  submitLabel: string
  successRedirect: string
}) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    setError(null)

    const email = String(formData.get('email') || '')
    const password = String(formData.get('password') || '')

    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: 'include',
    })

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { errors?: { message?: string }[] } | null
      setError(payload?.errors?.[0]?.message || 'Login gagal. Periksa email dan password Anda.')
      return
    }

    startTransition(() => {
      router.replace(successRedirect)
      router.refresh()
    })
  }

  return (
    <form
      action={handleSubmit}
      className="mt-8 space-y-6"
    >
      <IconField icon={<Mail className="size-5" />} label="Email Address" name="email" placeholder="taruna@ikma.edu" type="email" />
      <IconField icon={<Lock className="size-5" />} label="Password" name="password" placeholder="••••••••" type="password" />
      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <button
        className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#fed65b] px-6 text-sm font-semibold text-[#002957] transition hover:bg-[#ffe088] disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isPending}
        type="submit"
      >
        {isPending ? 'Memproses...' : submitLabel}
        <ArrowRight className="size-4" />
      </button>
    </form>
  )
}

function IconField({
  icon,
  label,
  name,
  placeholder,
  type = 'text',
}: {
  icon: ReactNode
  label: string
  name: string
  placeholder: string
  type?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1c1b1b]">{label}</label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#737781]">
          {icon}
        </div>
        <input
          className="h-12 w-full rounded-lg border border-[#c3c6d2] bg-white pl-12 pr-4 text-[#1c1b1b] outline-none ring-[#315ea0] transition focus:ring-2"
          name={name}
          placeholder={placeholder}
          required
          type={type}
        />
      </div>
    </div>
  )
}
