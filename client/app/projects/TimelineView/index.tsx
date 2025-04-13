import { useAppSelector } from '@/app/StoreProvider';
import { useGetAllTasksQuery, type Task } from '@/store/api';
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import { LoaderCircle } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import "gantt-task-react/dist/index.css"

type TimelineProps = {
    id: string,
}

type TaskTypeItem = "task" | "milestone" | "project";

const Timeline = ({ id }: TimelineProps) => {

    const { isDarkMode } = useAppSelector(state => state.global);
    const { data: tasks, isLoading, error } = useGetAllTasksQuery({projectId: Number(id)})

    const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
        viewMode: ViewMode.Month,
        locale: "en-Us"
    })

    const gantTasks = useMemo(() => {
        return (
            tasks
            ?.filter(task => task.startDate && task.dueDate)
            ?.map((task: Task) => ({
                start: new Date(task?.startDate as string),
                end: new Date(task?.dueDate as string),
                name: task.title,
                id: `Task-${task.id}`,
                type: "task" as TaskTypeItem,
                progress: task.points ? (task.points / 10) * 100 : 0,
                isDisabled: false,
            })) || []
        )
    }, [tasks]) 

    const handleViewModeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setDisplayOptions((prev) => ({
            ...prev,
            viewMode: event.target.value as ViewMode
        }))
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
    <div className='px-4 xl:px-6 '>
        <div className="flex flex-wrap items-center justify-between gap-2 py-5">
            <h1 className="me-2 text-lg font-bold dark:text-white">
                Project Task Timeline
            </h1>
            <div className="relative inline-block w-64">
                <select 
                    className='focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white'
                    value={displayOptions.viewMode}
                    onChange={handleViewModeChange}
                >
                    <option value={ViewMode.Day}>Day</option>
                    <option value={ViewMode.Week}>Week</option>
                    <option value={ViewMode.Month}>Month</option>
                </select>
            </div>
        </div>

        <div className="overflow-hidden rounded-md border bg-white shadow dark:bg-dark-secondary dark:text-white">
            <div className="timeline">
                <Gantt 
                    tasks={gantTasks} 
                    {...displayOptions} 
                    columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
                    listCellWidth='100px'
                    barBackgroundColor={isDarkMode ? "#101214" : "#aeb8c2"}
                    barBackgroundSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
                />
            </div>
        </div>
    </div>
  )
}

export default Timeline