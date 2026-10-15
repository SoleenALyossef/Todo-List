import { motion } from 'framer-motion';
import { FiList, FiActivity, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import useTodoStore from '../Store/useTodoStore';

export default function Stats() {
  const todos = useTodoStore((s) => s.todos);
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const cards = [
    { label: 'الكل', value: total, icon: FiList, gradient: 'from-slate-500 to-slate-700', delay: 0 },
    { label: 'نشطة', value: active, icon: FiActivity, gradient: 'from-indigo-500 to-blue-600', delay: 0.1 },
    { label: 'مكتملة', value: completed, icon: FiCheckCircle, gradient: 'from-[#8cae9a] to-[#628c74]', delay: 0.2 },
    { label: 'الإنجاز', value: `${percent}%`, icon: FiTrendingUp, gradient: 'from-[#a6b8aa] to-[#7d9b87]', delay: 0.3 },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {cards.map((c) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: c.delay, type: 'spring', stiffness: 200 }}
            whileHover={{ y: -5, scale: 1.03 }}
            className="relative group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity`} />
            <div className={`relative bg-gradient-to-br ${c.gradient} rounded-2xl p-4 text-white shadow-xl`}>
              <div className="flex items-center justify-between mb-2">
                <c.icon className="text-2xl opacity-80" />
              </div>
              <div className="text-3xl md:text-4xl font-black mb-1">{c.value}</div>
              <div className="text-xs md:text-sm font-medium opacity-90">{c.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* شريط التقدم */}
      {total > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-5 border border-white/40 dark:border-white/10"
        >
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-3 font-bold">
            <span>📊 نسبة الإنجاز</span>
            <span className="text-[#527b64] dark:text-emerald-300">{percent}%</span>
          </div>
          <div className="h-3 bg-slate-200/60 dark:bg-slate-700/60 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
              className="h-full bg-gradient-to-l from-[#7fa58d] via-[#8eae9a] to-[#6e9580] rounded-full relative overflow-hidden"
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}