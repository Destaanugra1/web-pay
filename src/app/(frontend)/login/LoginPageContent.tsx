import { Media } from '@/components/Media'
import { Globe, Shield } from 'lucide-react'

import { LoginForm } from './page.client'

const iconMap = {
  globe: Globe,
  shield: Shield,
}

export function LoginPageContent({ loginPage }: { loginPage: any }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#d6e3ff] px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,63,127,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(254,214,91,0.18),transparent_28%)]" />
      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-[0_14px_36px_rgba(28,27,27,0.12)] lg:grid-cols-[0.95fr_1.05fr]">
        <section className="relative flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#002957_0%,#003f7f_55%,#315ea0_100%)] px-8 py-20 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(254,214,91,0.16),transparent_26%)]" />
          <div className="relative max-w-lg space-y-6">
            {typeof loginPage.brandImage === 'object' && loginPage.brandImage?.url ? (
              <div className="size-20 overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur">
                <Media resource={loginPage.brandImage} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="flex size-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[#fed65b] backdrop-blur">
                IK
              </div>
            )}
            <p className="text-sm uppercase tracking-[0.24em] text-[#fed65b]">Portal Internal</p>
            <h1 className="font-serif text-5xl font-semibold leading-tight">
              {loginPage.brandTitle || ''}
            </h1>
            {loginPage.brandDescription && (
              <p className="text-lg leading-8 text-[#d6e3ff]">{loginPage.brandDescription}</p>
            )}
          </div>
        </section>

        <section className="flex items-center justify-center bg-[#fcf9f8] px-6 py-16">
          <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(28,27,27,0.08)] md:p-10">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#d6e3ff] text-[#003f7f]">
              <Shield className="size-9" />
            </div>
            <h2 className="mt-6 text-center font-serif text-4xl font-semibold text-[#003f7f]">
              {loginPage.panelTitle || ''}
            </h2>
            {loginPage.panelDescription && (
              <p className="mt-2 text-center text-sm leading-6 text-[#434750]">
                {loginPage.panelDescription}
              </p>
            )}
            <LoginForm
              submitLabel={loginPage.submitLabel || 'Masuk'}
              successRedirect={loginPage.successRedirect || '/admin'}
            />

            {(loginPage.secondaryAuthLabel || (loginPage.secondaryAuthOptions || []).length > 0) && (
              <>
                <div className="my-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#e5e2e1]" />
                  <span className="bg-white px-4 text-sm text-[#434750]">
                    {loginPage.secondaryAuthLabel || ''}
                  </span>
                  <div className="h-px flex-1 bg-[#e5e2e1]" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {(loginPage.secondaryAuthOptions || []).map(
                    (option: {
                      description?: string | null
                      icon?: keyof typeof iconMap | null
                      id?: string | null
                      label?: string | null
                      url?: string | null
                    }) => {
                      const Icon = iconMap[option.icon || 'shield'] || Shield

                      return (
                        <a
                          key={option.id || option.label}
                          className="rounded-lg border border-[#c3c6d2] bg-[#f6f3f2] px-4 py-3 text-sm font-medium text-[#1c1b1b] transition hover:bg-[#f0eded]"
                          href={option.url || '#'}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Icon className="size-4" />
                            {option.label}
                          </div>
                          {option.description && (
                            <p className="mt-2 text-center text-xs text-[#737781]">
                              {option.description}
                            </p>
                          )}
                        </a>
                      )
                    },
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
