export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">Page Not Found</h2>
        <p className="text-amber-600 mb-4">Could not find the requested resource.</p>
        <a href="/" className="text-amber-600 hover:text-amber-800 underline">
          Return Home
        </a>
      </div>
    </div>
  )
} 