export const PRIORITIES = {
  low: { label: 'منخفضة', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300', dot: 'bg-emerald-500' },
  medium: { label: 'متوسطة', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', dot: 'bg-amber-500' },
  high: { label: 'عالية', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300', dot: 'bg-red-500' },
};

export const CATEGORIES = {
  'عام': { emoji: '📌', color: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200' },
  'عمل': { emoji: '💼', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  'شخصي': { emoji: '🏠', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  'دراسة': { emoji: '📚', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  'صحة': { emoji: '💪', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
};

export const FILTERS = [
  { key: 'all', label: 'الكل' },
  { key: 'active', label: 'النشطة' },
  { key: 'completed', label: 'المكتملة' },
];