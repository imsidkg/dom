import { useMemo } from "react";
import type { Task } from "../lib/taskReducer";

export function useTaskFilter(tasks: Task[], filter: string){
    return useMemo(() => {
        if(filter === 'all') return tasks
        return tasks.filter((t) => t.status === filter)
    },[tasks, filter])
}
