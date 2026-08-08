import { getContributionLevel } from '../utils/constants'

export default function ContributionBadge({ bookingsCount, reviewsCount }) {
  const { level, color } = getContributionLevel(bookingsCount, reviewsCount)

  return (
    <div className="github-card flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm font-semibold" style={{ color }}>
        {level} Traveler
      </span>
      <span className="text-xs text-text-secondary">
        {bookingsCount + reviewsCount} contributions
      </span>
    </div>
  );
}