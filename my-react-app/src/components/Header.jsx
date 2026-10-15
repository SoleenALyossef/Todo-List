import { motion } from 'framer-motion';
import { FiMoon, FiSun, FiCheckCircle } from 'react-icons/fi';
import useTodoStore from '../Store/useTodoStore';

export default function Header() {
  const { darkMode, toggleDarkMode } = useTodoStore();

  return (
    <header className="relative overflow-hidden px-6 py-8 md:px-10 md:py-10 bg-gradient-to-br from-[#edf3ef] via-[#f7f5ef] to-[#e8f0ed] dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 border-b border-[#dce6df] dark:border-slate-700">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 rounded-full bg-white/75 dark:bg-slate-700/80 border border-[#dce6df] dark:border-slate-600 px-4 py-2 text-sm font-bold text-[#527264] dark:text-emerald-200">
          <FiCheckCircle className="text-lg" />
          <span>مساحة أكثر هدوءًا</span>
        </div>
        <motion.button
          onClick={toggleDarkMode}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="p-3 rounded-xl bg-white/80 dark:bg-slate-700 text-[#527264] dark:text-emerald-100 border border-[#dce6df] dark:border-slate-600 hover:bg-white transition-colors"
          title={darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
          aria-label={darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
        >
          {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
        </motion.button>
      </div>
      <div className="text-center">
        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
          className="text-4xl md:text-5xl font-black text-[#36594b] dark:text-emerald-100 mb-3 tracking-tight">
          مهامي اليومية
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-[#73867c] dark:text-slate-300 text-base md:text-lg">
          رتّب أولوياتك، وأنجز يومك بخطوات بسيطة
        </motion.p>
        <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#9bb9a7]" />
      </div>
    </header>
  );
}
