type QuotePayload = {
  name?: string
  phone?: string
  email?: string
  service?: string
  date?: string
  message?: string
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export async function POST(request: Request) {
  const ENDPOINT = process.env.FORMSPREE_ENDPOINT

  let data: QuotePayload
  try {
    data = (await request.json()) as QuotePayload
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const name = data.name?.trim() ?? ''
  const phone = data.phone?.trim() ?? ''
  const email = data.email?.trim() ?? ''
  const service = data.service?.trim() ?? ''
  const date = data.date?.trim() ?? ''
  const message = data.message?.trim() ?? ''

  if (!name || !phone || !email || !service) {
    return Response.json(
      { ok: false, error: 'Please fill in your name, phone, email, and the service you need.' },
      { status: 400 },
    )
  }
  if (!isEmail(email)) {
    return Response.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 })
  }

  if (!ENDPOINT) {
    return Response.json(
      { ok: false, error: 'The quote form is not configured yet. Add FORMSPREE_ENDPOINT to .env.local.' },
      { status: 500 },
    )
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        email,
        service,
        'preferred date': date || 'Not specified',
        message: message || '(no message provided)',
        _subject: `New quote request - ${name} (${service})`,
      }),
    })

    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { errors?: { message: string }[] } | null
      const error =
        body?.errors?.map((e) => e.message).join(', ') ||
        'We could not send your request right now. Please call or text us instead.'
      return Response.json({ ok: false, error }, { status: 502 })
    }

    return Response.json({ ok: true })
  } catch {
    return Response.json(
      { ok: false, error: 'Network error while sending. Please try again in a moment.' },
      { status: 502 },
    )
  }
}
