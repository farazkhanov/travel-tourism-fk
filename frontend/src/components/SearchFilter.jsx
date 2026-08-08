import { PROVINCES, CATEGORIES } from '../utils/constants'

export default function SearchFilter({ filters, setFilters }) {
  return (
    <div className="github-card flex flex-wrap gap-3">
      <select
        value={filters.province}
        onChange={(e) => setFilters({...filters, province: e.target.value})}
        className="bg-bg-primary border border-border-default rounded-md px-3 py-1.5 text-sm"
      >
        <option value="all">All Provinces</option>
        {PROVINCES.map(p => <option key={p}>{p}</option>)}
      </select>

      <select
        value={filters.category}
        onChange={(e) => setFilters({...filters, category: e.target.value})}
        className="bg-bg-primary border border-border-default rounded-md px-3 py-1.5 text-sm"
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
      </select>

      <input
        type="number"
        placeholder="Max price ($)"
        value={filters.maxPrice}
        onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
        className="bg-bg-primary border border-border-default rounded-md px-3 py-1.5 text-sm w-32"
      />

      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => setFilters({...filters, search: e.target.value})}
        className="bg-bg-primary border border-border-default rounded-md px-3 py-1.5 text-sm flex-1"
      />
    </div>
  );
}