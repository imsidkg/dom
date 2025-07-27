// src/components/TaskCard.tsx

import { Task, TaskAction } from "../lib/taskReducer";

export default function TaskCard({
  tasks,
  dispatch,
}: {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
}) {
  return (
    <ul className="space-y-2">
      {tasks.map(t => (
        <li key={t.id} className="border p-2 rounded">
          <span>{t.title}</span>
          <button onClick={() => dispatch({ type: 'DELETE', id: t.id })} className="ml-2 text-red-500">
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}