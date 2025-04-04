"use client";
import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader';
import BoardView from '../BoardView';
import { useGetProjectDetailsQuery } from '@/store/api';
import Timeline from '../TimelineView';
import TableView from '../TableView';

type Props = {
    params: {
        id: string
    }
}

const Projects = ({ params }: Props) => {
    const { id } = params;
    const [activeTab, setActiveTab] = useState<string>("Board");

    const { data: project, isLoading } = useGetProjectDetailsQuery({id: Number(id)});
    
  return (
    <div className='bg-white dark:bg-dark-bg'>
        {!isLoading && <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} title={project?.name} />}
        {activeTab === "Board" && (
          <BoardView id={id} />
        )}
        {activeTab === "Table" && (
          <TableView id={id} />
        )}
        {activeTab === "Timeline" && (
          <Timeline id={id} />
        )}
    </div>
  )
}

export default Projects