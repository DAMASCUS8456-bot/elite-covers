"use client"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div className="p-6 text-red-700">
          <h2 className="text-xl font-semibold">Something went wrong!</h2>
          <pre className="mt-2 bg-red-50 p-2 rounded overflow-auto max-w-full">{error?.message}</pre>
          <button className="mt-4 bg-blue-600 text-white px-3 py-2 rounded" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
