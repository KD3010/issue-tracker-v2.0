import { useGetAllTasksQuery, useUpdateTaskStatusMutation } from '@/store/api';
import React, { Suspense } from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LoaderCircle } from 'lucide-react';
import BoardPlaceHolder from './BoardPlaceHolder';

const BoardColumn = React.lazy(() => import('./BoardColumn'));

type BoardProps = {
    id: string,
}

const taskStatus = ["To Do", "In Progress", "Under Review", "Closed"];

const BoardView = ({ id }: BoardProps) => {
    const { data:  tasks, isLoading, error } = useGetAllTasksQuery({ projectId: Number(id) });
    const [updateTaskStatus] = useUpdateTaskStatusMutation();

    const moveTask = ( taskId: number, toStatus: string ) => {
        updateTaskStatus({ taskId, status: toStatus })
    }

    if(isLoading) {
        return <div className='w-full h-40 flex justify-center items-center'>
            <LoaderCircle className='animate-spin text-gray-500 dark:text-neutral-500' size={40}/>
        </div>
    } else if (error) {
        return <div className='flex w-full h-40 justify-center items-center text-lg'>
            An error occured while fetching the tasks
        </div>
    }

  return (
    <DndProvider backend={HTML5Backend}>
        <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4 min-h-[65vh]'>
            {taskStatus.map((status) => (
                <Suspense fallback={<BoardPlaceHolder />}>
                    <BoardColumn key={status} status={status} tasks={tasks || []} moveTask={moveTask} />
                </Suspense>
            ))}
        </div>
    </DndProvider>
  )
}

export default BoardView