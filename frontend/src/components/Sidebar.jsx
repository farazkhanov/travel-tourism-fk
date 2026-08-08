import { Link } from 'react-router-dom'

export default function Sidebar({ user }) {
  return (
    <div className="space-y-4">
      <div className="github-card">
        {user ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#30363d] flex items-center justify-center text-xl">
                {user.name[0]}
              </div>
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-xs text-text-secondary">{user.email}</p>
              </div>
            </div>
            <Link to="/profile" className="text-[#58a6ff] text-sm hover:underline">
              View profile
            </Link>
          </>
        ) : (
          <div>
            <p className="text-sm">Sign in to track your travels and earn badges.</p>
            <Link to="/login" className="btn-primary text-sm mt-3 inline-block">
              Sign in
            </Link>
          </div>
        )}
      </div>

      {/* Stats card */}
      <div className="github-card">
        <h4 className="font-semibold mb-2">Pakistan Explorer</h4>
        <div className="text-sm space-y-1 text-text-secondary">
          <p>📍 6+ provinces</p>
          <p>🏔️ 50+ destinations</p>
          <p>⭐ 4.8 average rating</p>
        </div>
      </div>
    </div>
  )
}