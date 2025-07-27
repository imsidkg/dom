// src/components/TaskFilter.tsx
export default function TaskFilter({
  current,
  onChange,
}: {
  current: string;
  onChange: (f: string) => void;
}) {
  const filters = ['all', 'todo', 'progress', 'done'];
  return (
    <div className="flex gap-2">
      {filters.map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-2 py-1 rounded ${current === f ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}