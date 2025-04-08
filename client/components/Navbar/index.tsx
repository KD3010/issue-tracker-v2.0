import React, { useState, type ChangeEvent } from 'react'
import { Menu, Moon, Settings, Sun } from "lucide-react"
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/StoreProvider'
import { setIsDarkMode, setIsSidebarCollapsed } from '@/store'
import ModalNewProject from '../Modal/ModalNewProject'
import ModalNewTask from '../Modal/ModalNewTask'

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode, isSidebarCollapsed } = useAppSelector(state => state.global);
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const [ viewModal, setViewModal ] = useState<string>("");

  const handleCreateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setViewModal(e.target.value);
    setIsModalOpen(true);
    e.target.value = "none";
  }

  return (
    <div className='w-full relative flex items-center justify-between bg-white px-4 py-2.5 dark:bg-black'>
      {/* Modal */}
      {
        isModalOpen && viewModal === "project" ? 
        <ModalNewProject isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/> : viewModal === "task" ?
        <ModalNewTask isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/> : null
      }
      {/* Sidebar Nav */}
      <div className='flex items-center gap-8'>
        {!isSidebarCollapsed ? null : (
          <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
            <Menu className='h-8 w-8 dark:text-white'/>
          </button>
        )}

        {/* Create Task or Project Button */}
        <div className='relative flex h-min'>
          <select onChange={(e) => handleCreateChange(e)} className='rounded-md px-6 py-2 border border-gray-200 bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-dark-bg dark:border-neutral-800 dark:text-white appearance-none focus:outline-none'>
            <option value="none" hidden>Create</option>
            <option value="task" className='px-2 py-4 bg-white dark:bg-black dark:hover:bg-gray-800 text-start min-w-60'>Task</option>
            <option value="project" className='px-2 py-4 bg-white dark:bg-black dark:hover:bg-gray-800 text-start min-w-60'>Project</option>
          </select>
        </div>
      </div>

      {/* Icons */}
      <div className='flex items-center'>
        <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className='h-min w-min rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
        >
          {isDarkMode ? (<Sun className='h-6 w-6 text-white' />) : (<Moon className='h-6 w-6'/>)}
        </button>
        <Link href={"/settings"} className='h-min w-min rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800' >
          <Settings className='h-6 w-6 cursor-pointer dark:text-white' />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block" />
      </div>
    </div>
  )
}

export default Navbar