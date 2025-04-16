"use client";
import { useAppDispatch, useAppSelector } from '@/app/StoreProvider';
import { setWorkspace, setIsSidebarCollapsed } from '@/store';
import { useGetAllProjectsQuery, useGetMyWorkspacesQuery } from '@/store/api';
import { Briefcase, ChartLine, ChartPie, ChevronDown, ChevronsUpDown, LockIcon, Plus, Settings, TvMinimal, X, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import ModalNewProject from '../Modal/ModalNewProject';

const SidebarLinksArr = [
    { icon: ChartPie, label: "Dashboard", href: "/" },
    { icon: ChartLine, label: "Analytics", href: "/analytics" },
    { icon: Settings, label: "Settings", href: "/settings" },
]

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const { isSidebarCollapsed, currentWorkspace } = useAppSelector((state) => state.global);

    const { data: projects } = useGetAllProjectsQuery({queries: [`workspace=${currentWorkspace}`]});
    const { data: workspaces } = useGetMyWorkspacesQuery({ user: "iamkd30@gmail.com" });

    const [showProjects, setShowProjects] = useState<boolean>(true)
    const [showWorkspaces, setShowWorkspaces] = useState<boolean>(true);
    const [newProjectModalVisible, setNewProjectModalVisible] = useState<boolean>(false);

    const sidebarClass = `fixed flex flex-col justify-between shadow-xl h-full z-40
        dark:bg-black bg-white ${isSidebarCollapsed ? "w-0" : "w-64"}
    transition-[width] duration-300 overflow-hidden ease-in-out text-nowrap`

    const currWorkspace = useMemo(() => {
        return workspaces?.find(ws => ws.id === currentWorkspace);
    }, [workspaces, currentWorkspace]);      

  return (
    <div className={sidebarClass}>
        {newProjectModalVisible && (<ModalNewProject isOpen={newProjectModalVisible} onClose={() => setNewProjectModalVisible(false)}/>)}
        <div className={`flex h-[100%] w-full flex-col transition-all duration-200 justify-start ${isSidebarCollapsed ? "opacity-0" : "opacity-100"}`} >
            {/* TOP LOGO */}
            <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-5 pt-3 dark:bg-black">
                <div className='text-xl font-bold text-blue-primary'>
                    Issue Tracker 2.0
                </div>
                {isSidebarCollapsed ? null : (
                    <button className='py-3' onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
                        <X className='h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white' />
                    </button>
                )}
            </div>

            {/* WORKSPACES */}
            <div className='flex flex-col items-center border-y-[1.5px] border-gray-200 pt-4 dark:border-gray-700'>
                <div className='w-full flex items-center justify-between px-5 mb-2'>
                    <div>
                        <h3 className='text-md font-bold tracking-wide dark:text-gray-200'>{currWorkspace?.name}</h3>
                        <div className="flex mt-1 items-start gap-2">
                            <LockIcon className='mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400 ' />
                            <p className='text-xs text-gray-500'>Private</p>
                        </div>
                    </div>
                    <ChevronsUpDown onClick={() => setShowWorkspaces(!showWorkspaces)} className='h-6 w-6 text-gray-600 cursor-pointer'/>
                </div>
                <div className={`w-full mb-4 overflow-hidden transition-[max-height] duration-300 ease-in-out ${showWorkspaces ? "max-h-40" : "max-h-0"}`}>
                    {workspaces?.filter(workspace => workspace.id !== currentWorkspace).map((workspace, ind) => (
                        <button 
                            key={ind}
                            onClick={() => {
                                dispatch(setWorkspace(workspace.id));
                            }}
                            className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 justify-start w-full px-5 py-3`}
                        >
                            <TvMinimal className='h-6 w-6 text-gray-800 dark:text-gray-100' />
                            <span className='font-medium text-gray-800 dark:text-gray-100'>{workspace.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* NAVBAR LINKS */}
            <nav className='z-10 mt-2 w-full overflow-x-hidden'>
                {/* MAIN MENU LINKS */}
                {SidebarLinksArr.map((link, ind) => <SidebarLink key={ind} icon={link.icon} label={link.label} href={link.href}/>)}
                {/* PROJECTS LINKS */}
                <button 
                    onClick={() => setShowProjects((prev) => !prev)} 
                    className='flex w-full items-center justify-between px-5 py-3 text-gray-500'
                >
                    <span className='pb-2'>Projects</span>
                    <ChevronDown className={`h-5 w-5 transform-all duration-100 ${showProjects ? "-rotate-180" : "rotate-0"}`}/>
                </button>
                <div className={`w-full flex flex-col overflow-hidden transition-[max-height] duration-300 ease-in-out ${showProjects ? "max-h-60" : "max-h-0"}`}>
                    <button 
                        onClick={() => setNewProjectModalVisible(true)}
                        className='flex items-center justify-center mx-5 mb-4 rounded-sm dark:text-gray-500 px-2 py-0.5 border border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-50'
                    >
                        <Plus className='mr-2 w-5 h-5'/> Create New Project
                    </button>
                    {projects?.map((project) => (
                        <SidebarLink key={project.id} icon={Briefcase} label={project.name} href={`/projects/${project.id}`}/>
                    ))}
                </div>
            </nav>
        </div>
    </div>
  )
}

interface SidebarLinkProps {
    href: string,
    icon: LucideIcon,
    label: string,
    // isCollapsed: boolean
}

const SidebarLink = ({href, icon: Icon, label}: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href} className={`relative w-full flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700
            ${isActive ? "bg-gray-100 text-white dark:bg-gray-800" : ""}
            justify-start px-5 py-3`}>
                {isActive && (<div className='absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200'/>)}

                <Icon className='h-6 w-6 text-gray-800 dark:text-gray-100' />
                <span className='font-medium text-gray-800 dark:text-gray-100'>{label}</span>
        </Link>
    )
}

export default Sidebar;