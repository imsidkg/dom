'use client';
import { useReducer, useEffect } from 'react';

import { ErrorBoundary } from './ErrorFallback';
import { Task, taskReducer } from '../lib/taskReducer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDebounce } from '../hooks/useDebounce';
import { useTaskFilter } from '../hooks/useTaskFilter';
import TaskCard from './TaskCard';
import TaskFilter from './TaskFilter';
import ThemeToggle from './ThemeToggle';


export default function TaskBoard() {
  const [tasks, dispatch] = useReducer(
    taskReducer,
    [],
    
    (initial) => {
      try {
        const item = window.localStorage.getItem('tasks');
        return item ? JSON.parse(item) : initial;
      } catch (error) {
        console.error('Error reading tasks from localStorage', error);
        return initial;
      }
    }
  );

  useEffect(() => {
    try {
      window.localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage', error);
    }
  }, [tasks]);

  const [filter, setFilter] = useLocalStorage<string>('filter', 'all');
  const debouncedFilter = useDebounce(filter, 300);
  const filtered = useTaskFilter(tasks, debouncedFilter);

  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div className="p-4 bg-red-100">
          <p>{error.message}</p>
          <button onClick={reset}>Reset</button>
        </div>
      )}
    >
      <div className="max-w-xl mx-auto p-4 space-y-4">
        <ThemeToggle/>
        <TaskFilter current={filter} onChange={setFilter} />
        <TaskCard tasks={filtered} dispatch={dispatch} />
      </div>
    </ErrorBoundary>
  );
}