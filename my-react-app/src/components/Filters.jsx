import { motion } from 'framer-motion';
import { FiSearch, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useTodoStore from '../Store/useTodoStore';
import { FILTERS } from '../utils/constants';

export default function Filters() {
  const { filter, setFilter, searchQuery, setSearchQuery, clearCompleted, todos } = useTodoStore();

  const handleClearCompleted = () => {
    const count = todos.filter((t) => t.completed).length;
    if (count === 0) {
      toast.error('لا توجد مهام مكتملة');
      return;
    }
    clearCompleted();
    toast.success(`تم حذف ${count} مهمة`);
  };

  return (
    <div className="space-y-4 mb-6">
      {/* البحث */}
      <div className="relative group">
        <FiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#527b64] transition-colors text-lg" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن مهمة..."
          className="w-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-white/10 text-slate-700 dark:text-slate-100 text-sm rounded-2xl pr-14 pl-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#91b19b]/50 focus:bg-white dark:focus:bg-slate-800 transition-all placeholder:text-slate-400"
        />
      </div>

      {/* الفلاتر */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-1.5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-1.5 border border-white/40 dark:border-white/10">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="relative px-4 md:px-5 py-2 text-sm rounded-xl transition-all"
            >
              {filter === f.key && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-gradient-to-l from-[#648a74] to-[#527b64] rounded-xl shadow-lg"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative font-bold ${filter === f.key ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                {f.label}
              </span>
            </button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClearCompleted}
          className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-red-500 flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all border border-transparent hover:border-red-200"
        >
          <FiTrash2 />
          <span>حذف المكتملة</span>
        </motion.button>
      </div>
    </div>
  );
}