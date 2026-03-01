import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message } = body as { name?: string; email?: string; message?: string }
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Example: Log to console; in production, integrate with email provider (SendGrid, SES, Resend)
    // Never log sensitive content in real systems without safeguards.
    console.log('Contact form submission:', { name, email, message })

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}






