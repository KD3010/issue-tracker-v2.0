import { getRoleText } from '@/lib/utils';
import { useGetProjectDetailsQuery, type Project } from '@/store/api'
import { Plus, Users } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const DetailsView = ({ id }: { id: string }) => {

  const { data: project } = useGetProjectDetailsQuery({ id: Number(id) });
  console.log(project)

  return (
    <div className='text-black dark:text-white p-6'>
      <div className='flex flex-col gap-4 sm:gap-6'>
        {/* Project Details */}
        <div className='flex flex-col'>
          <h2 className='font-semibold text-lg'>Project Description :</h2>
          <p className='text-gray-600 dark:text-gray-400'>{project ? project?.description : "No description provided"}</p>
        </div>
        {/* Current Version */}
        <div className='flex gap-3 items-center'>
          <h2 className='font-semibold text-lg'>Current Version :</h2>
          <span className='text-gray-600 dark:text-gray-400'>{project ? project?.version : "No description provided"}</span>
        </div>
        {/* Project Members -> Manager, Team Leads, Contributors */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8'>
          <div className='flex flex-col h-min gap-1 border border-gray-400 dark:border-gray-700 rounded-md px-4 pt-4 '>
            <h2 className='font-semibold text-lg'>Teams</h2>
            <div className='w-full flex flex-nowrap mb-4'>
              <button className='flex w-full gap-2 rounded-md text-nowrap border border-dashed px-4 py-2 text-blue-primary dark:text-blue-400 border-blue-primary dark:border-blue-400 mt-2'>
                <Plus />Add New Team
              </button>
            </div>
            {project && project?.teams?.length > 0 && (project?.teams.map((team: any) => (
              <div key={team.id} className='-mx-4 px-4 py-4 hover:bg-gray-100 hover:dark:bg-gray-800'>
                <span className='flex flex-nowrap gap-2 cursor-default'><Users /> {" " + team.name} </span>
              </div>
            )))}
          </div>
          <div className='flex flex-col h-min gap-1 border border-gray-400 dark:border-gray-700 rounded-md px-4 pt-4 '>
            <h2 className='font-semibold text-lg'>Project Members</h2>
            <div className='w-full flex flex-nowrap mb-4'>
              <button className='flex w-full gap-2 rounded-md text-nowrap border border-dashed px-4 py-2 text-blue-primary dark:text-blue-400 border-blue-primary dark:border-blue-400 mt-2'>
                <Plus />Add New Member
              </button>
            </div>
            {project && project?.ProjectMembers?.length > 0 && (project?.ProjectMembers.map((user: any) => (
                <div key={user.id} className='-mx-4 px-4 py-2 hover:bg-gray-100 hover:dark:bg-gray-800 flex flex-nowrap items-center gap-3'>
                  <Image 
                    src={`/${user.member.profilePictureUrl}`} 
                    alt={"User Avatar"} 
                    width={30} 
                    height={30} 
                    className='w-10 h-10 rounded-full'
                  />
                  <div className='flex flex-col'>
                    <p className='flex flex-nowrap gap-2 cursor-default'>{user.member.username}</p>
                    <p className='text-gray-500 text-xs'>{getRoleText(user.role)}</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsView