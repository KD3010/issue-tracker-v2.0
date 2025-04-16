import Header from '@/components/Header';
import ModalNewTask from '@/components/Modal/ModalNewTask';
import { Clock, Filter, NotebookTabs, Plus, Search, Share2, StretchVertical, Table } from 'lucide-react';
import React, { useState, type Dispatch, type SetStateAction } from 'react'

type Props = {
    activeTab: string,
    setActiveTab: Dispatch<SetStateAction<string>>,
    title?: string
}

const ProjectHeader = ({ activeTab, setActiveTab, title }: Props) => {
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState<boolean>(false);
  return (
    <div className='px-4 xl:px-6'>
        {isModalNewTaskOpen && <ModalNewTask isOpen={isModalNewTaskOpen} onClose={() => setIsModalNewTaskOpen(false)}/>}
        <div className='py-6 lg:pb-4 lg:pt-8 flex items-center justify-between'>
            <Header title={title ? title : "Project Design Development"} />
            <button 
                onClick={() => setIsModalNewTaskOpen(!isModalNewTaskOpen)}
                className='w-min flex flex-nowrap items-center justify-center gap-1 text-white rounded bg-blue-primary hover:bg-blue-600 pl-2 pr-3 py-2 transition-colors duration-200 ease-in-out'
            >
                <Plus className='h-5 w-5'/>
                <p className='text-nowrap'>Create Task</p>
            </button>
        </div>

        <div className='flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center'>
            <div className='flex flex-1 items-center gap-2 md:gap-4'>
                <TabButton title='Board' icon={<StretchVertical className='h-5 w-5'/>} setActiveTab={setActiveTab} activeTab={activeTab} />
                <TabButton title='Details' icon={<NotebookTabs className='h-5 w-5'/>} setActiveTab={setActiveTab} activeTab={activeTab} />
                <TabButton title='Table' icon={<Table className='h-5 w-5'/>} setActiveTab={setActiveTab} activeTab={activeTab} />
                <TabButton title='Timeline' icon={<Clock className='h-5 w-5'/>} setActiveTab={setActiveTab} activeTab={activeTab} />
            </div>
            <div className="flex items-center gap-2">
                <button className='text-gray-500 hover:text-gray-600 dark:text-neutral-500 hover:dark:text-gray-300'>
                    <Filter className='h-5 w-5' />
                </button>
                <button className='text-gray-500 hover:text-gray-600 dark:text-neutral-500 hover:dark:text-gray-300'>
                    <Share2 className='h-5 w-5' />
                </button>
                <div className="relative">
                    <input type="text" placeholder='Search Task'
                        className='rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white'
                    />
                    <Search className='h-5 w-5 absolute left-3 top-2 text-gray-400 dark:text-neutral-500'/>
                </div>
            </div>
        </div>
    </div>
  )
}

type TabButtonProps = {
    title: string,
    icon: React.ReactNode,
    activeTab: string,
    setActiveTab: Dispatch<SetStateAction<string>>
}

const TabButton = ({ title, icon, activeTab, setActiveTab }: TabButtonProps) => {
    const isActive = activeTab === title;

    return (
        <button className={`relative flex items-center font-semibold gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 
            ${isActive ? "text-blue-500 after:bg-blue-500 dark:text-white" : ""}`}
            onClick={() => setActiveTab(title)}
            >
                {icon} {title}
        </button>
    )
}

export default ProjectHeader