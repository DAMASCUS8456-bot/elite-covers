"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

export type Toast = { id: number; title?: string; message: string }

type ToastCtx = {
  toasts: Toast[]
  show: (t: Omit<Toast, 'id'>) => void
  dismiss: (id: number) => void
}

const Ctx = createContext<ToastCtx | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  function show(t: Omit<Toast, 'id'>) {
    setToasts((arr) => {
      const id = (arr.at(-1)?.id ?? 0) + 1
      setTimeout(() => dismiss(id), 3000)
      return [...arr, { id, ...t }]
    })
  }
  function dismiss(id: number) { setToasts((arr) => arr.filter((t) => t.id !== id)) }
  return (
    <Ctx.Provider value={{ toasts, show, dismiss }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div key={t.id} className="bg-black text-white rounded px-4 py-2 shadow text-sm">
            {t.title && <div className="font-medium">{t.title}</div>}
            <div>{t.message}</div>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}