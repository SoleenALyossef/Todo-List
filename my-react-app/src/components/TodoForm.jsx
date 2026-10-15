import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiChevronDown } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useTodoStore from '../Store/useTodoStore';
import { PRIORITIES, CATEGORIES } from '../utils/constants';

export default function TodoForm() {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('عام');
  const [showOptions, setShowOptions] = useState(false);
  const addTodo = useTodoStore((s) => s.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text.trim(), priority, category);
    toast.success('تمت إضافة المهمة ✨');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      {/* حقل الإدخال الرئيسي */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-l from-[#7fa58d] via-[#8eae9a] to-[#6e9580] rounded-3xl blur opacity-30 group-focus-within:opacity-70 transition-opacity" />
        <div className="relative flex gap-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl p-2 border border-white/40 dark:border-white/10">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="ما الذي تود إنجازه اليوم؟"
            className="flex-1 bg-transparent text-slate-700 dark:text-slate-100 text-base px-5 py-3 focus:outline-none placeholder:text-slate-400"
          />
          <motion.button
            type="submit"
            disabled={!text.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-l from-[#648a74] to-[#527b64] hover:from-[#527b64] hover:to-[#416b54] disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-600 text-white p-4 rounded-2xl transition-all shadow-lg shadow-[#71977f]/20 disabled:shadow-none flex items-center justify-center"
          >
            <FiPlus className="text-2xl" />
          </motion.button>
        </div>
      </div>

      {/* زر الخيارات المتقدمة */}
      <button
        type="button"
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-[#527b64] mt-3 px-3 py-2 rounded-xl transition-colors"
      >
        <motion.span animate={{ rotate: showOptions ? 180 : 0 }}>
          <FiChevronDown />
        </motion.span>
        خيارات متقدمة
      </button>

      {/* الخيارات */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-3">
              {/* الأولوية */}
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">الأولوية</label>
                <div className="flex gap-2">
                  {Object.entries(PRIORITIES).map(([key, val]) => (
                    <motion.button
                      key={key}
                      type="button"
                      onClick={() => setPriority(key)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 px-4 py-2.5 text-sm rounded-2xl transition-all flex items-center justify-center gap-2 border-2 ${
                        priority === key
                          ? `${val.color} border-current font-bold shadow-lg`
                          : 'bg-white/60 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-transparent hover:border-slate-300'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${val.dot}`} />
                      {val.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* التصنيف */}
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">التصنيف</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(CATEGORIES).map(([key, val]) => (
                    <motion.button
                      key={key}
                      type="button"
                      onClick={() => setCategory(key)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2.5 text-sm rounded-2xl transition-all border-2 ${
                        category === key
                          ? `${val.color} border-current font-bold shadow-lg`
                          : 'bg-white/60 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-transparent hover:border-slate-300'
                      }`}
                    >
                      {val.emoji} {key}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}