"use client";
import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader';
import BoardView from '../BoardView';
import { useGetProjectDetailsQuery } from '@/store/api';
import Timeline from '../TimelineView';
import TableView from '../TableView';
import DetailsView from '../DetailsView';

type Props = {
    params: {
      projectId: string
    }
}

const Projects = ({ params }: Props) => {
    const { projectId } = params;
    const [ activeTab, setActiveTab ] = useState<string>("Board");

    const { data: project, isLoading } = useGetProjectDetailsQuery({id: Number(projectId)});
    
  return (
    <div className='bg-gray-50 dark:bg-dark-bg'>
        {!isLoading && <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} title={project?.name} />}
        {activeTab === "Board" && (
          <BoardView id={projectId} />
        )}
        {activeTab === "Details" && (
          <DetailsView id={projectId} />
        )}
        {activeTab === "Table" && (
          <TableView id={projectId} />
        )}
        {activeTab === "Timeline" && (
          <Timeline id={projectId} />
        )}
    </div>
  )
}

export default Projects