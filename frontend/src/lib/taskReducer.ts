export type Task = {
  id: string;
  title: string;
  status: "todo" | "progress" | "done";
};

export type TaskAction =
  | { type: "ADD"; title: string }
  | { type: "EDIT"; id: string; title: string }
  | { type: "DELETE"; id: string }
  | { type: "TOGGLE"; id: string };

export function taskReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "ADD":
      return [
        ...tasks,
        { id: crypto.randomUUID(), title: action.title, status: "todo" },
      ];

    case "EDIT":
      return tasks.map((task) =>
        task.id === action.id ? { ...task, tilte: action.title } : task
      );

    case "DELETE":
      return tasks.filter((task) => task.id !== action.id);

    case "TOGGLE":
      return tasks.map((t) =>
        t.id === action.id
          ? { ...t, status: t.status === "done" ? "todo" : "progress" }
          : t
      );
    default:
      return tasks;
  }
}
