type LinkReference = {
  relationTo?: 'pages' | 'posts' | null
  value?: { slug?: string | null } | string | number | null
} | null

type LinkData = {
  label?: string | null
  newTab?: boolean | null
  reference?: LinkReference
  type?: 'custom' | 'reference' | null
  url?: string | null
} | null

export const resolveCMSLink = (link: LinkData): { href: string; label: string; newTab: boolean } | null => {
  if (!link?.label) return null

  if (link.type === 'custom' && link.url) {
    return {
      href: link.url,
      label: link.label,
      newTab: Boolean(link.newTab),
    }
  }

  if (
    link.type === 'reference' &&
    link.reference?.relationTo &&
    typeof link.reference.value === 'object' &&
    link.reference.value?.slug
  ) {
    const slug = link.reference.value.slug
    const href =
      link.reference.relationTo === 'posts'
        ? `/berita/${slug}`
        : slug === 'home'
          ? '/'
          : `/${slug}`

    return {
      href,
      label: link.label,
      newTab: Boolean(link.newTab),
    }
  }

  return null
}
