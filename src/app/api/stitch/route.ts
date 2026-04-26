import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_STITCH_URL = 'https://stitch.googleapis.com/mcp'

type StitchAction = 'list-tools' | 'call-tool'

type ListToolsResponse = {
  result?: {
    tools?: Array<{
      name: string
      description?: string
      inputSchema?: Record<string, unknown>
    }>
  }
}

const parseJsonOrText = (raw: string) => {
  try {
    return JSON.parse(raw)
  } catch {
    return raw
  }
}

const buildRpcPayload = (body: Record<string, unknown>) => {
  const action = body.action as StitchAction | undefined

  if (action === 'list-tools') {
    return {
      id: 1,
      jsonrpc: '2.0',
      method: 'tools/list',
    }
  }

  if (action === 'call-tool') {
    const name = body.name
    const args = body.arguments

    if (typeof name !== 'string' || !name.trim()) {
      throw new Error('Tool name is required.')
    }

    return {
      id: 1,
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        arguments: typeof args === 'object' && args !== null ? args : {},
        name,
      },
    }
  }

  throw new Error('Unsupported Stitch action.')
}

export async function GET() {
  return NextResponse.json({
    configured: Boolean(process.env.GOOGLE_STITCH_API_KEY),
    endpoint: process.env.GOOGLE_STITCH_MCP_URL || DEFAULT_STITCH_URL,
  })
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_STITCH_API_KEY
  const endpoint = process.env.GOOGLE_STITCH_MCP_URL || DEFAULT_STITCH_URL

  if (!apiKey) {
    return NextResponse.json(
      {
        error: 'Missing GOOGLE_STITCH_API_KEY on the server.',
      },
      { status: 500 },
    )
  }

  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request body.' }, { status: 400 })
  }

  let rpcPayload: Record<string, unknown>

  try {
    rpcPayload = buildRpcPayload(body)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid Stitch request.' },
      { status: 400 },
    )
  }

  try {
    const response = await fetch(endpoint, {
      body: JSON.stringify(rpcPayload),
      cache: 'no-store',
      headers: {
        Accept: 'application/json, text/event-stream',
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
      method: 'POST',
    })

    const raw = await response.text()
    const data = parseJsonOrText(raw)

    if (!response.ok) {
      return NextResponse.json(
        {
          data,
          error: 'Upstream Stitch MCP request failed.',
          request: rpcPayload,
          status: response.status,
        },
        { status: response.status },
      )
    }

    const toolNames =
      (data as ListToolsResponse)?.result?.tools?.map((tool) => tool.name).filter(Boolean) || []

    return NextResponse.json({
      data,
      endpoint,
      ok: true,
      request: rpcPayload,
      toolNames,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to reach Stitch MCP endpoint.',
      },
      { status: 502 },
    )
  }
}
