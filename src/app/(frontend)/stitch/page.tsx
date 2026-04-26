import type { Metadata } from 'next'

import { StitchConsole } from './StitchConsole'

export const metadata: Metadata = {
  title: 'Stitch Console',
  description: 'Frontend console untuk menguji Google Stitch MCP dari aplikasi Next.js ini.',
}

export default function StitchPage() {
  return <StitchConsole />
}
