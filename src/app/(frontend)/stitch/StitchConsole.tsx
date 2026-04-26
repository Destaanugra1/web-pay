'use client'

import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type ToolDefinition = {
  description?: string
  inputSchema?: {
    properties?: Record<string, unknown>
    required?: string[]
    type?: string
  }
  name: string
}

type StitchStatus = {
  configured: boolean
  endpoint: string
}

type StitchResponse = {
  data?: unknown
  error?: string
  ok?: boolean
  request?: unknown
  status?: number
  toolNames?: string[]
}

const defaultArgs = '{\n  \n}'

const formatJson = (value: unknown) => JSON.stringify(value, null, 2)

export function StitchConsole() {
  const [status, setStatus] = useState<StitchStatus | null>(null)
  const [tools, setTools] = useState<ToolDefinition[]>([])
  const [selectedTool, setSelectedTool] = useState('')
  const [argsText, setArgsText] = useState(defaultArgs)
  const [resultText, setResultText] = useState('')
  const [error, setError] = useState('')
  const [isLoadingStatus, setIsLoadingStatus] = useState(true)
  const [isLoadingTools, setIsLoadingTools] = useState(false)
  const [isRunningTool, setIsRunningTool] = useState(false)

  useEffect(() => {
    const loadStatus = async () => {
      setIsLoadingStatus(true)

      try {
        const response = await fetch('/api/stitch', { cache: 'no-store' })
        const data = (await response.json()) as StitchStatus
        setStatus(data)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load Stitch status.')
      } finally {
        setIsLoadingStatus(false)
      }
    }

    void loadStatus()
  }, [])

  const selectedToolDefinition = useMemo(
    () => tools.find((tool) => tool.name === selectedTool) || null,
    [selectedTool, tools],
  )

  const handleListTools = async () => {
    setError('')
    setIsLoadingTools(true)

    try {
      const response = await fetch('/api/stitch', {
        body: JSON.stringify({ action: 'list-tools' }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const payload = (await response.json()) as StitchResponse

      if (!response.ok) {
        throw new Error(payload.error || 'Failed to load Stitch tools.')
      }

      const nextTools = ((payload.data as { result?: { tools?: ToolDefinition[] } })?.result?.tools ||
        []) as ToolDefinition[]

      setTools(nextTools)
      setSelectedTool((currentValue) => currentValue || nextTools[0]?.name || '')
      setResultText(formatJson(payload.data))
    } catch (listError) {
      setError(listError instanceof Error ? listError.message : 'Failed to load Stitch tools.')
    } finally {
      setIsLoadingTools(false)
    }
  }

  const handleRunTool = async () => {
    setError('')
    setIsRunningTool(true)

    let parsedArgs: Record<string, unknown>

    try {
      parsedArgs = JSON.parse(argsText) as Record<string, unknown>
    } catch {
      setError('Arguments must be valid JSON.')
      setIsRunningTool(false)
      return
    }

    try {
      const response = await fetch('/api/stitch', {
        body: JSON.stringify({
          action: 'call-tool',
          arguments: parsedArgs,
          name: selectedTool,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const payload = (await response.json()) as StitchResponse

      if (!response.ok) {
        throw new Error(payload.error || 'Tool execution failed.')
      }

      setResultText(formatJson(payload.data))
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : 'Tool execution failed.')
    } finally {
      setIsRunningTool(false)
    }
  }

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_32%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,244,245,1))]" />

      <section className="container py-10 md:py-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-border/80 bg-background/80 px-3 py-1 text-xs font-medium tracking-[0.24em] uppercase backdrop-blur">
              Google Stitch MCP
            </span>
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="space-y-3">
                <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
                  Frontend console untuk uji koneksi dan eksekusi tool Stitch.
                </h1>
                <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
                  Halaman ini memakai Tailwind dan route server-side internal agar API key tetap
                  aman. Anda bisa muat daftar tools, pilih salah satu, lalu kirim argumen JSON.
                </p>
              </div>

              <Card className="border-border/70 bg-background/80 shadow-lg backdrop-blur">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-lg">Status Koneksi</CardTitle>
                  <CardDescription>
                    Endpoint dan status konfigurasi server untuk Stitch MCP.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-md border border-border/80 px-3 py-2">
                    <span className="text-muted-foreground">Env</span>
                    <span
                      className={
                        status?.configured
                          ? 'font-medium text-emerald-600'
                          : 'font-medium text-amber-600'
                      }
                    >
                      {isLoadingStatus
                        ? 'Memeriksa...'
                        : status?.configured
                          ? 'Siap'
                          : 'Belum diisi'}
                    </span>
                  </div>
                  <div className="rounded-md border border-border/80 px-3 py-2">
                    <div className="mb-1 text-muted-foreground">Endpoint</div>
                    <code className="block overflow-x-auto text-xs">
                      {status?.endpoint || 'https://stitch.googleapis.com/mcp'}
                    </code>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="border-border/70 bg-background/90 shadow-lg">
              <CardHeader>
                <CardTitle>Tool Browser</CardTitle>
                <CardDescription>
                  Muat daftar tool dari Stitch MCP lalu pilih tool yang ingin dijalankan.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Button
                  className="w-full"
                  onClick={handleListTools}
                  disabled={isLoadingTools || isLoadingStatus || !status?.configured}
                >
                  {isLoadingTools ? 'Memuat tools...' : 'Muat Tools'}
                </Button>

                <div className="space-y-2">
                  <Label htmlFor="stitch-tool-name">Tool</Label>
                  <select
                    id="stitch-tool-name"
                    className="border-input bg-background ring-ring/10 focus-visible:ring-4 focus-visible:outline-1 outline-ring/50 flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-xs"
                    value={selectedTool}
                    onChange={(event) => setSelectedTool(event.target.value)}
                    disabled={!tools.length}
                  >
                    <option value="">Pilih tool</option>
                    {tools.map((tool) => (
                      <option key={tool.name} value={tool.name}>
                        {tool.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 rounded-xl border border-dashed border-border/80 bg-muted/40 p-4">
                  <div className="text-sm font-medium">Deskripsi Tool</div>
                  <p className="text-sm text-muted-foreground">
                    {selectedToolDefinition?.description || 'Belum ada tool yang dipilih.'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="stitch-args">Arguments JSON</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => setArgsText(defaultArgs)}
                    >
                      Reset
                    </Button>
                  </div>
                  <Textarea
                    id="stitch-args"
                    className="min-h-64 font-mono text-sm"
                    value={argsText}
                    onChange={(event) => setArgsText(event.target.value)}
                    placeholder='{"project":"my-project"}'
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleRunTool}
                  disabled={!selectedTool || isRunningTool || !status?.configured}
                >
                  {isRunningTool ? 'Menjalankan tool...' : 'Jalankan Tool'}
                </Button>

                {error ? (
                  <div className="rounded-md border border-error bg-error/30 px-3 py-2 text-sm">
                    {error}
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-border/70 bg-background/90 shadow-lg">
                <CardHeader>
                  <CardTitle>Schema Hint</CardTitle>
                  <CardDescription>
                    Skema input dari tool terpilih untuk membantu menyusun argumen JSON.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="max-h-72 overflow-auto rounded-xl border border-border/80 bg-zinc-950 p-4 text-xs leading-6 text-zinc-100">
                    {selectedToolDefinition
                      ? formatJson(selectedToolDefinition.inputSchema || {})
                      : 'Pilih tool untuk melihat input schema.'}
                  </pre>
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-background/90 shadow-lg">
                <CardHeader>
                  <CardTitle>Result</CardTitle>
                  <CardDescription>
                    Response mentah dari route internal yang memanggil endpoint Stitch MCP.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="stitch-endpoint-preview">Endpoint Aktif</Label>
                      <Input
                        id="stitch-endpoint-preview"
                        value={status?.endpoint || ''}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stitch-tool-count">Jumlah Tool Terdeteksi</Label>
                      <Input
                        id="stitch-tool-count"
                        value={String(tools.length)}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>

                  <pre className="min-h-96 overflow-auto rounded-2xl border border-border/80 bg-zinc-950 p-5 text-xs leading-6 text-zinc-100">
                    {resultText || 'Belum ada response. Klik "Muat Tools" atau jalankan tool.'}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
