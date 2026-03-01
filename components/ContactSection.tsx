'use client'

import { useState } from 'react'

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError('Could not send via serverless function. See README for EmailJS fallback snippet.')
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h2 className="text-3xl font-bold">Contact</h2>
      <p className="mt-2 text-white/70">Let’s build something impactful together.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="glass rounded-xl p-4">
          <label className="block text-sm text-white/70" htmlFor="name">Name</label>
          <input id="name" name="name" required className="focus-ring mt-1 w-full rounded-md border border-white/10 bg-transparent px-3 py-2" />
        </div>
        <div className="glass rounded-xl p-4">
          <label className="block text-sm text-white/70" htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required className="focus-ring mt-1 w-full rounded-md border border-white/10 bg-transparent px-3 py-2" />
        </div>
        <div className="glass rounded-xl p-4">
          <label className="block text-sm text-white/70" htmlFor="message">Message</label>
          <textarea id="message" name="message" required rows={5} className="focus-ring mt-1 w-full rounded-md border border-white/10 bg-transparent px-3 py-2" />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="focus-ring rounded-tab bg-neon/20 px-6 py-3 font-semibold disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        {status === 'success' && (
          <div className="text-cyan">Message sent! I will get back to you soon.</div>
        )}
        {status === 'error' && <div className="text-red-400">{error}</div>}
      </form>

      <div className="mt-10 text-sm text-white/60">
        Email: <a className="hover:text-white" href="mailto:chethan130904@gmail.com">chethan130904@gmail.com</a>
      </div>
    </div>
  )
}






