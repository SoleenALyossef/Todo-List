import { useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import useTodoStore from '../Store/useTodoStore';
import TodoItem from './TodoItem';
import confetti from 'canvas-confetti';

export default function TodoList() {
  const { todos, filter, searchQuery, reorderTodos } = useTodoStore();

  const filteredTodos = useMemo(() => {
    let result = todos;
    if (filter === 'active') result = result.filter((t) => !t.completed);
    if (filter === 'completed') result = result.filter((t) => t.completed);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) => t.text.toLowerCase().includes(q));
    }
    return result;
  }, [todos, filter, searchQuery]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = todos.findIndex((t) => t.id === active.id);
    const newIndex = todos.findIndex((t) => t.id === over.id);
    reorderTodos(arrayMove(todos, oldIndex, newIndex));
  };

  useEffect(() => {
    if (todos.length > 0 && todos.every((t) => t.completed)) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
      });
    }
  }, [todos]);

  if (filteredTodos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl mb-6"
        >
          {searchQuery ? '🔍' : filter === 'completed' ? '🎯' : '🍃'}
        </motion.div>
        <p className="text-slate-400 dark:text-slate-500 font-medium text-lg">
          {searchQuery
            ? 'لا توجد نتائج مطابقة'
            : filter === 'completed'
            ? 'لم تكمل أي مهمة بعد'
            : 'لا توجد مهام حالياً. استمتع بيومك!'}
        </p>
      </motion.div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={filteredTodos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTodos.map((todo, i) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <TodoItem todo={todo} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  );
}