"use client";
import Header from "@/components/Header";
import ModalNewProject from "@/components/Modal/ModalNewProject";
import { useGetMyWorkspacesQuery, type Workspace } from "@/store/api";
import { ChevronRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { data: workspaces } = useGetMyWorkspacesQuery({ user: "iamkd30@gmail.com" });
  const [showNewProjectModal, setShowNewProjectModal] = useState<boolean>(false);

  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col p-4 pt-8">
      {showNewProjectModal && (<ModalNewProject isOpen={showNewProjectModal} onClose={() => setShowNewProjectModal(false)} />)}
      <Header title="Dashboard" />

      {/* ACTION BUTTONS */}
      <div className="w-full flex flex-col sm:flex-row mt-4 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setShowNewProjectModal(true)} className="px-3 py-1 bg-blue-primary text-white rounded border border-blue-400 hover:bg-blue-500 hover:border-blue-200 transition-all duration-100">
            <span>New Project</span>
          </button>
          <button className="px-3 py-1 rounded bg-gray-50 dark:bg-dark-secondary dark:text-white border border-gray-300 hover:bg-white hover:border-gray-200 dark:border-gray-900 hover:dark:border-gray-800 transition-all duration-100">
            <span>New Workspace</span>
          </button>
        </div>
        <div className="relative">
          <Search className="absolute top-1.5 left-2 text-gray-400 h-5 w-5"/>
          <input placeholder="Search Project" className="w-full rounded border border-gray-300 px-2 pl-8 py-1 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus-none outline-none" />
        </div>
      </div>

      {/* WORKSPACES AND PROJECTS */}
      <div className="mt-4 flex flex-col gap-4 md:gap-8 dark:text-gray-200 text-dark-tertiary">
        {workspaces && workspaces.map((workspace: Workspace) => (<div className="flex flex-col gap-2" key={workspace.id}>
          <h2 className="text-lg font-semibold">{workspace.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
            {workspace.projects.map((project) => (
              <button 
                onClick={() => router.push(`/projects/${project.id}`)}
                key={project.id} 
                className="h-20 w-full transition-all duration-200 bg-white hover:bg-gray-100 dark:bg-dark-secondary hover:dark:bg-neutral-950 shadow px-4 py-4 rounded-md">
                <div className="w-full flex items-center justify-between"><p>{project.name}</p> <ChevronRight /></div>
              </button>
            ))}
          </div>
        </div>))}
      </div>
    </div>
  );
}
