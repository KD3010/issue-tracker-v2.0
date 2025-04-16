import { AlertCircle, AlertOctagon, AlertTriangle, EllipsisVertical, Layers3, MessageSquareMore, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { Task } from "@/store/api";
import { useDrag } from "react-dnd";
import { useState } from "react";
import { format } from "date-fns";

type BoardItemProps = {
    task: Task
}

const BoardItem = ({ task }: BoardItemProps) => {
    const [ { isDragging }, drag ] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor: any) => ({
                isDragging: !!monitor.isDragging()
        })
    }));
    const [showAuthorUsername, setShowAuthorUsername] = useState<boolean>(false)
    const [showAssigneeUsername, setShowAssigneeUsername] = useState<boolean>(false)

    const taskTagsSplit = task.tags ? task.tags.split(",") : [];
    const formattedStartDate = task.startDate ? format(new Date(task.startDate), "P") : "" 
    const formattedDueDate = task.dueDate ? format(new Date(task.dueDate), "P") : ""
    const numberOfComments = (task.comments && task.comments.length) || 0;
    const PriorityTag = ({ priority } : { priority: Task["priority"] }) => (
        <div 
            className={`rounded-full px-2 py-1 text-xs font-semibold flex flex-nowrap gap-1 ${
                priority === "Blocker" ? 
                "bg-red-200 text-red-700" : priority === "Critical" ?
                "bg-yellow-200 text-yellow-700" : priority === "Major" ? 
                "bg-green-200 text-green-700" : priority === "Minor" ?
                "bg-blue-200 text-blue-700": 
                "bg-gray-200 text-gray-700"
            }`}
        >
            {
                priority === "Blocker" ? 
                <AlertCircle className='h-4 w-4'/> : priority === "Critical" ?
                <ShieldAlert className='h-4 w-4'/> : priority === "Major" ? 
                <AlertTriangle className='h-4 w-4'/> : priority === "Minor" ?
                <AlertOctagon className='h-4 w-4'/> : 
                <Layers3 className='h-4 w-4'/>
            } {" "}
            {priority}
        </div>
    )

    return (
        <div ref={(instance) => {
            drag(instance)
        }}
            className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${
                isDragging ? "opacity-50" : "opacity-100"
            }`}
        >
            <div className='p-4 md:p-6'>
                <div className="flex items-center justify-between">
                    <div className="flex flex-1 wrap items-center gap-2">
                        {task.priority && <PriorityTag priority={task.priority} />}    
                    </div>
                    <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
                        <EllipsisVertical size={26}/>
                    </button>
                </div>

                <div className='mt-3'>
                    <div className="flex gap-1">
                        {taskTagsSplit.map(tag => (
                            <div key={tag} className='rounded-full bg-blue-100 px-2 py-1 text-xs text-center'>
                                {" "}{tag}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='my-3 flex justify-between'>
                    <h4 className="text-md text-bold dark:text-white truncate">{task.taskId}</h4>
                    {typeof task.points === "number" && (
                        <div className="text-xs font-semibold dark:text-white ">
                            {task.points} pts
                        </div>
                    )}
                </div>

                <div className="text-xs text-gray-500 dark:text-neutral-500">
                    {formattedStartDate  && <span>{formattedStartDate}</span>} {" - "}
                    {formattedDueDate  && <span>{formattedDueDate}</span>}
                </div>

                <p className='text-sm text-gray-600 dark:text-neutral-500 truncate'>
                    {task.title}
                </p>

                <div className='mt-4 border-t border-gray-200 dark:border-stroke-dark' />

                <div className='mt-3 flex items-center justify-between'>
                    <div className="flex -space-x-[4px]">
                        {task.author && (
                            <div className='relative'>
                                {/* Tooltip */}
                                {showAuthorUsername && (
                                    <div className='absolute bottom-9 rounded-md px-2 py-1 z-50 left-1/2 transform -translate-x-1/2 whitespace-nowrap border bg-gray-50 border-gray-200 dark:bg-dark-bg dark:border-gray-800 dark:text-white'>
                                        {task.author.username}
                                    </div>
                                )}
                                {/* Tooltip Trigger */}
                                <Image 
                                    key={task.author.userId}
                                    src={`/${task.author.profilePictureUrl}`}
                                    alt={task.author.username}
                                    width={30}
                                    height={30}
                                    onMouseEnter={() => setShowAuthorUsername(true)}
                                    onMouseLeave={() => setShowAuthorUsername(false)}
                                    className='h-8 w-8 cursor-pointer rounded-full border-2 border-white object-cover dark:border-dark-secondary hover:scale-105 transition-transform duration-100'
                                />
                            </div>
                        )}
                        {task.assignee && (
                            <div className='relative'>
                                {showAssigneeUsername && (
                                    <div className='absolute bottom-9 rounded-md px-2 py-1 z-50 left-1/2 transform -translate-x-1/2 whitespace-nowrap border bg-gray-50 border-gray-200 dark:bg-dark-bg dark:border-gray-800 dark:text-white'>
                                        {task.assignee.username}
                                    </div>
                                )}
                                <Image 
                                    key={task.assignee.userId}
                                    src={`/${task.assignee.profilePictureUrl}`}
                                    alt={task.assignee.username}
                                    width={30}
                                    height={30}
                                    onMouseEnter={() => setShowAssigneeUsername(true)}
                                    onMouseLeave={() => setShowAssigneeUsername(false)}
                                    className='h-8 w-8 cursor-pointer rounded-full border-2 border-white object-cover dark:border-dark-secondary hover:scale-105 transition-transform duration-100'
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center text-gray-500 dark:text-neutral-500">
                        <MessageSquareMore size={20}/>
                        <span className='ml-1 text-sm dark:text-neutral-400'>
                            {numberOfComments}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoardItem;