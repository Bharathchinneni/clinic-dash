'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">Something went wrong!</h2>
        <p className="text-amber-600 mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded"
        >
          Try again
        </button>
      </div>
    </div>
  )
} 