import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useTodoStore from './Store/useTodoStore';
import Header from './components/Header';
import Stats from './components/Stats';
import TodoForm from './components/TodoForm';
import Filters from './components/Filters';
import TodoList from './components/TodoList';

function App() {
  const { darkMode } = useTodoStore();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f4f6f2] via-[#f8f7f2] to-[#eaf1ec] dark:from-slate-950 dark:via-slate-900 dark:to-[#1c2924] transition-colors duration-500" dir="rtl">
      
      {/* دوائر ضبابية زخرفية */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b7cdbd]/25 dark:bg-emerald-900/20 rounded-full blur-3xl float" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d9dfd5]/35 dark:bg-slate-700/20 rounded-full blur-3xl float" style={{ animationDelay: '3s' }} />

      {/* المحتوى */}
      <div className="relative z-10 min-h-screen flex items-start justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-3xl"
        >
          {/* الحاوية الرئيسية */}
          <div className="glass rounded-[2.5rem] shadow-2xl overflow-hidden glow">
            
            <Header />
            
            <div className="p-6 md:p-10">
              <Stats />
              <TodoForm />
              <Filters />
              <TodoList />
            </div>

          </div>

          {/* تذييل */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8 font-medium"
          >
            صُنع بـ <span className="text-red-500 animate-pulse inline-block">❤️</span> باستخدام React + Zustand + Tailwind + Framer Motion
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;