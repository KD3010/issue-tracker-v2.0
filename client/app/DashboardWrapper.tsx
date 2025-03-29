"use client";
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React, { useEffect, type ReactNode } from 'react'
import StoreProvider, { useAppSelector } from './StoreProvider'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const {isSidebarCollapsed, isDarkMode} = useAppSelector(state => state.globalReducer);

  useEffect(() => {
    if(isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <div className='flex min-h-screen w-full bg-gray-50 text-gray-900'>
        <Sidebar />
        <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg 
            ${isSidebarCollapsed ? "" : "md:pl-64"}
          `}>
            <Navbar />
            {children}
        </main>
    </div>
  )
}

const DashboardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper;