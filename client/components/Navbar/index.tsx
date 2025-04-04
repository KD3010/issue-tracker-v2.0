import React from 'react'
import { Menu, Moon, Settings, Sun } from "lucide-react"
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/StoreProvider'
import { setIsDarkMode, setIsSidebarCollapsed } from '@/store'

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode, isSidebarCollapsed } = useAppSelector(state => state.global);

  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 dark:bg-black'>
      {/* Search Bar */}
      <div className='flex items-center gap-8'>
        {!isSidebarCollapsed ? null : (
          <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
            <Menu className='h-8 w-8 dark:text-white'/>
          </button>
        )}
        {/* <div className='relative flex h-min w-[200px]'>
          <Search className='absolute left-[4px] top-2.5 mr-2 h-5 w-5 -translate-y-0.5 transform cursor-pointer dark:text-white' />
          <input 
            className='w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder:text-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder:text-white'
            placeholder='Search...'
            type='search'
          />
        </div> */}
        <div className='relative flex h-min'>
          <button className='flex items-center shadow justify-center rounded-md w-[80px] py-2 bg-gray-100 hover:bg-gray-200 dark:bg-dark-secondary dark:hover:bg-gray-800 dark:text-white'>
            Create
          </button>
        </div>
      </div>

      {/* Icons */}
      <div className='flex items-center'>
        <button onClick={() => {
          console.log(isDarkMode)
          dispatch(setIsDarkMode(!isDarkMode));
        }}
          className='h-min w-min rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
        >
          {isDarkMode ? (<Sun className='h-6 w-6 text-white' />) : (<Moon className='h-6 w-6'/>)}
        </button>
        <Link href={"/settings"} className='h-min w-min rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800' >
          <Settings className='h-6 w-6 cursor-pointer dark:text-white' />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  )
}

export default Navbar