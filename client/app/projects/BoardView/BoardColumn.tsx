import type { Task } from "@/store/api";
import { useDrop } from "react-dnd";
import BoardItem from "./BoardItem";

type BoardColumnProps = {
    status: string,
    tasks: Task[],
    moveTask: (taskId: number, toStatus: string) => void,
}

const BoardColumn = ({status, tasks, moveTask, }: BoardColumnProps) => {
    const [ { isOver }, drop ] = useDrop(() => ({
        accept: "task",
        drop: (item: { id: number }) => moveTask(item.id, status),
        collect: (monitor: any) => ({
                isOver: !!monitor.isOver()
        })
    }));

    const taskCount = tasks.filter((task) => task.status === status).length;
    const statusColor: any = {
        "To Do": "#2563EB",
        "In Progress": "#059669",
        "Under Review": "#D97706",
        "Closed": "#000000"
    }

    return (
        <div ref={(instance) => {
            drop(instance)
        }}
        className={`sm:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-black" : ""}`}
        >
            <div className='mb-3 flex w-full shadow'>
                <div className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`} style={{ backgroundColor: statusColor[status] }}/>
                <div className='flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary'>
                    <h3 className='flex items-center text-lg  font-semibold dark:text-white'>
                        {status}{" "}
                        <span className='ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary'
                            style={{width: "1.5rem", height: "1.5rem"}}
                        >
                            {taskCount}
                        </span>
                    </h3>
                </div>
            </div>

            {tasks.filter((task) => task.status === status).map(task => (
                <BoardItem key={task.id} task={task} />
            ))}
        </div>
    )
}

export default BoardColumn;