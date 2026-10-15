import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all', // all | active | completed
      searchQuery: '',
      darkMode: false,

      // ===== إدارة المهام =====
      addTodo: (text, priority = 'medium', category = 'عام') => {
        const newTodo = {
          id: Date.now(),
          text,
          completed: false,
          priority, // low | medium | high
          category,
          createdAt: new Date().toISOString(),
          subtasks: [],
        };
        set((state) => ({ todos: [newTodo, ...state.todos] }));
        return newTodo;
      },

      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      })),

      updateTodo: (id, newText) => set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        ),
      })),

      removeTodo: (id) => set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      })),

      reorderTodos: (newTodos) => set({ todos: newTodos }),

      // ===== المهام الفرعية =====
      addSubtask: (todoId, text) => set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === todoId
            ? { ...todo, subtasks: [...todo.subtasks, { id: Date.now(), text, completed: false }] }
            : todo
        ),
      })),

      toggleSubtask: (todoId, subtaskId) => set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                subtasks: todo.subtasks.map((st) =>
                  st.id === subtaskId ? { ...st, completed: !st.completed } : st
                ),
              }
            : todo
        ),
      })),

      removeSubtask: (todoId, subtaskId) => set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === todoId
            ? { ...todo, subtasks: todo.subtasks.filter((st) => st.id !== subtaskId) }
            : todo
        ),
      })),

      // ===== أدوات مساعدة =====
      clearCompleted: () => set((state) => ({
        todos: state.todos.filter((todo) => !todo.completed),
      })),

      setFilter: (filter) => set({ filter }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      toggleDarkMode: () => set((state) => {
        const newMode = !state.darkMode;
        if (newMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        return { darkMode: newMode };
      }),

      // ===== الإحصائيات =====
      getStats: () => {
        const todos = get().todos;
        const total = todos.length;
        const completed = todos.filter((t) => t.completed).length;
        const active = total - completed;
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
        return { total, completed, active, percent };
      },

      // ===== تصدير / استيراد =====
      exportData: () => {
        const data = JSON.stringify(get().todos, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todos-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      },

      importData: (jsonData) => {
        try {
          const parsed = JSON.parse(jsonData);
          if (Array.isArray(parsed)) set({ todos: parsed });
        } catch (e) {
          console.error('فشل استيراد البيانات', e);
        }
      },
    }),
    {
      name: 'todo-storage',
      partialize: (state) => ({
        todos: state.todos,
        darkMode: state.darkMode,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.darkMode) document.documentElement.classList.add('dark');
      },
    }
  )
);

export default useTodoStore;