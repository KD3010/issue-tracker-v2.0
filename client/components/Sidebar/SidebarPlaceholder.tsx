import { useAppSelector } from '@/app/StoreProvider'
import { Skeleton } from '@mui/material'
import React from 'react'

const sidebarClass = `fixed flex flex-col h-[100%] shadow-xl h-full z-40 dark:bg-black bg-white w-64`

const SidebarPlaceholder = () => {
    const isDarkMode = useAppSelector((state) => state.global)
    return (
        <div className={sidebarClass}>
            {/* TOP LOGO */}
            <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-5 pt-3 dark:bg-black">
                <div className='text-xl font-bold text-blue-primary'>
                    Issue Tracker 2.0
                </div>
            </div>
            <div className='w-full flex flex-col gap-2 h-min mt-2 px-5'>
                <div className='w-full h-12 animate-pulse rounded bg-gray-200 dark:bg-dark-secondary'></div>
                <div className='w-full h-4 animate-pulse rounded bg-gray-200 dark:bg-dark-secondary'></div>
                <div className='w-full h-4 animate-pulse rounded bg-gray-200 dark:bg-dark-secondary'></div>
                <div className='w-full h-4 animate-pulse rounded bg-gray-200 dark:bg-dark-secondary'></div>

                <div className='w-full h-12 mt-8 animate-pulse rounded bg-gray-200 dark:bg-dark-secondary'></div>
                <div className='w-full h-4 animate-pulse rounded bg-gray-200 dark:bg-dark-secondary'></div>
                <div className='w-full h-4 animate-pulse rounded bg-gray-200 dark:bg-dark-secondary'></div>
                <div className='w-full h-4 animate-pulse rounded bg-gray-200 dark:bg-dark-secondary'></div>

                <div className='w-full mt-8 h-4 animate-pulse rounded bg-gray-200 dark:bg-dark-secondary'></div>
                <div className='w-full h-4 animate-pulse rounded bg-gray-200 dark:bg-dark-secondary'></div>
                <div className='w-full h-4 animate-pulse rounded bg-gray-200 dark:bg-dark-secondary'></div>
            </div>
        </div>
    )
}

export default SidebarPlaceholder