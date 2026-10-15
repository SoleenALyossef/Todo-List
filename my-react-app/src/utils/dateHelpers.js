import { formatDistanceToNow, isToday, isYesterday, format, isValid } from 'date-fns';
import { ar } from 'date-fns/locale';

export const formatRelativeDate = (isoString) => {
  // حماية من القيم الفارغة أو غير الصالحة
  if (!isoString) return 'منذ قليل';
  
  const date = new Date(isoString);
  
  // التحقق من أن التاريخ صالح
  if (!isValid(date)) return 'منذ قليل';

  try {
    if (isToday(date)) return `اليوم ${format(date, 'HH:mm')}`;
    if (isYesterday(date)) return `أمس ${format(date, 'HH:mm')}`;
    return formatDistanceToNow(date, { addSuffix: true, locale: ar });
  } catch (e) {
    return 'منذ قليل';
  }
};