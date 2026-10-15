import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiCheck, FiEdit2, FiChevronDown, FiPlus, FiX } from 'react-icons/fi';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useTodoStore from '../Store/useTodoStore';
import { PRIORITIES, CATEGORIES } from '../utils/constants';
import { formatRelativeDate } from '../utils/dateHelpers';

export default function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');

  const { toggleTodo, removeTodo, updateTodo, addSubtask, toggleSubtask, removeSubtask } = useTodoStore();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 'auto',
  };

  const priority = PRIORITIES[todo.priority] || PRIORITIES.medium;
  const category = CATEGORIES[todo.category] || CATEGORIES['عام'];
  const completedSubtasks = todo.subtasks?.filter((s) => s.completed).length || 0;
  const totalSubtasks = todo.subtasks?.length || 0;

  const handleSaveEdit = () => {
    if (editText.trim() && editText !== todo.text) updateTodo(todo.id, editText.trim());
    else setEditText(todo.text);
    setIsEditing(false);
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    addSubtask(todo.id, newSubtask.trim());
    setNewSubtask('');
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: -100 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      whileHover={{ scale: 1.01 }}
      className={`group relative rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
        todo.completed
          ? 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-700/50'
          : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/60 dark:border-white/10 shadow-lg shadow-indigo-500/5 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-[#8eae9a]300/50'
      }`}
    >
      {/* شريط لون الأولوية */}
      <div className={`absolute top-0 right-0 bottom-0 w-1.5 ${priority.dot}`} />

      <div className="flex items-center gap-3 p-5 pr-6">
        {/* مقبض السحب */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-slate-300 dark:text-slate-600 hover:text-[#527b64] touch-none transition-colors"
        >
          <div className="grid grid-cols-2 gap-0.5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-current" />
            ))}
          </div>
        </button>

        {/* زر الإكمال */}
        <motion.button
          onClick={() => toggleTodo(todo.id)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
            todo.completed
              ? 'bg-gradient-to-br from-[#8cae9a] to-[#628c74] border-emerald-500 text-white shadow-lg shadow-emerald-500/40'
              : 'border-slate-300 dark:border-slate-600 text-transparent hover:border-[#8eae9a]400 hover:bg-[#789b84]50 dark:hover:bg-[#789b84]900/20'
          }`}
        >
          <FiCheck className="text-base" />
        </motion.button>

        {/* المحتوى */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
              autoFocus
              className="w-full bg-transparent border-b-2 border-[#8eae9a]400 text-slate-700 dark:text-slate-100 text-lg focus:outline-none pb-1"
            />
          ) : (
            <div>
              <span
                onDoubleClick={() => setIsEditing(true)}
                className={`block text-base md:text-lg transition-all duration-300 cursor-text font-medium ${
                  todo.completed
                    ? 'line-through text-slate-400 dark:text-slate-500'
                    : 'text-slate-700 dark:text-slate-100'
                }`}
              >
                {todo.text}
              </span>
              <div className="flex items-center flex-wrap gap-2 mt-2">
                <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${priority.color}`}>
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${priority.dot} ml-1 align-middle`} />
                  {priority.label}
                </span>
                <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${category.color}`}>
                  {category.emoji} {todo.category}
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  {formatRelativeDate(todo.createdAt)}
                </span>
                {totalSubtasks > 0 && (
                  <button
                    onClick={() => setShowSubtasks(!showSubtasks)}
                    className="text-[11px] text-[#527b64] hover:text-[#527b64]700 flex items-center gap-1 font-bold"
                  >
                    <motion.span animate={{ rotate: showSubtasks ? 180 : 0 }}>
                      <FiChevronDown />
                    </motion.span>
                    {completedSubtasks}/{totalSubtasks}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* الأزرار */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSubtasks(!showSubtasks)}
            className="text-slate-400 hover:text-[#527b64] p-2.5 rounded-xl hover:bg-[#789b84]50 dark:hover:bg-[#789b84]900/20 transition-colors"
            title="المهام الفرعية"
          >
            <FiPlus />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsEditing(true)}
            className="text-slate-400 hover:text-blue-500 p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            title="تعديل"
          >
            <FiEdit2 />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => removeTodo(todo.id)}
            className="text-slate-400 hover:text-red-500 p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="حذف"
          >
            <FiTrash2 />
          </motion.button>
        </div>
      </div>

      {/* المهام الفرعية */}
      <AnimatePresence>
        {showSubtasks && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-100 dark:border-slate-700/50"
          >
            <div className="p-5 pr-6 space-y-2 bg-slate-50/50 dark:bg-slate-900/30">
              {todo.subtasks?.map((st) => (
                <motion.div
                  key={st.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 group/st"
                >
                  <button
                    onClick={() => toggleSubtask(todo.id, st.id)}
                    className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all ${
                      st.completed
                        ? 'bg-[#789b84]500 border-[#8eae9a]500 text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {st.completed && <FiCheck className="text-xs" />}
                  </button>
                  <span className={`flex-1 text-sm ${st.completed ? 'line-through text-slate-400' : 'text-slate-600 dark:text-slate-300'}`}>
                    {st.text}
                  </span>
                  <button
                    onClick={() => removeSubtask(todo.id, st.id)}
                    className="opacity-0 group-hover/st:opacity-100 text-slate-400 hover:text-red-500 transition-all"
                  >
                    <FiX className="text-sm" />
                  </button>
                </motion.div>
              ))}
              <form onSubmit={handleAddSubtask} className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  placeholder="أضف مهمة فرعية..."
                  className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!newSubtask.trim()}
                  className="bg-gradient-to-br from-[#648a74] to-[#527b64] disabled:from-slate-300 disabled:to-slate-400 text-white px-4 rounded-xl text-sm transition-all shadow-lg"
                >
                  <FiPlus />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}