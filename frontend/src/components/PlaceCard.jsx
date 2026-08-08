import { Link } from 'react-router-dom'
import { StarIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function PlaceCard({ place }) {
  return (
    <div className="github-card hover:bg-[#1f242e] transition-colors">
      <Link to={`/place/${place.id}`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[#58a6ff] font-semibold text-lg hover:underline">
              {place.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-text-secondary">
              <MapPinIcon className="w-4 h-4" />
              <span>{place.province}</span>
              <span className="text-border-default">•</span>
              <span>{place.category}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-[#e3b341]" />
            <span className="text-sm">{place.averageRating}</span>
          </div>
        </div>
        
        <p className="text-sm text-text-primary mt-3 line-clamp-2">
          {place.description}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm">
            {place.price > 0 ? (
              <span className="font-mono">${place.price}</span>
            ) : (
              <span className="text-[#2ea043]">Free</span>
            )}
          </div>
          <div className="text-xs text-text-secondary">
            {place.bestTimeToVisit}
          </div>
        </div>
      </Link>
    </div>
  )
}