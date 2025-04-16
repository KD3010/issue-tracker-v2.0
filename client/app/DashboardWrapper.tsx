"use client";
// Since Navbar is mostly static with just dark mode and settings button which redirects to another page
import Navbar from '@/components/Navbar'
import SidebarPlaceholder from '@/components/Sidebar/SidebarPlaceholder';
import React, { Suspense, useEffect, type ReactNode } from 'react'
import StoreProvider, { useAppSelector } from './StoreProvider'

const Sidebar = React.lazy(() => import("@/components/Sidebar"));

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const {isSidebarCollapsed, isDarkMode} = useAppSelector(state => state.global);

  useEffect(() => {
    if(isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <div className='flex min-h-screen w-full bg-gray-50 text-gray-900'>
        <Suspense fallback={isSidebarCollapsed ? null : <SidebarPlaceholder />}>
          <Sidebar />
        </Suspense>
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