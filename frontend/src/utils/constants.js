// Static lookup constants — no mock data, no fake records
export const PROVINCES = [
  'Gilgit-Baltistan',
  'Khyber Pakhtunkhwa',
  'Punjab',
  'Sindh',
  'Balochistan',
  'Azad Kashmir',
  'Islamabad',
];

export const CATEGORIES = [
  'Northern Areas',
  'Historical Sites',
  'Cultural Places',
  'Adventure Spots',
  'Religious Sites',
];

export const getContributionLevel = (bookingsCount = 0, reviewsCount = 0) => {
  const total = bookingsCount + reviewsCount;
  if (total >= 50) return { level: 'Diamond',  color: '#b388ff' };
  if (total >= 30) return { level: 'Platinum', color: '#79c0ff' };
  if (total >= 15) return { level: 'Gold',     color: '#d4a72c' };
  if (total >= 5)  return { level: 'Silver',   color: '#c0c0c0' };
  return              { level: 'Bronze',   color: '#cd7f32' };
};
