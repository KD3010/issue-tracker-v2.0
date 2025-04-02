"use client";
import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader';
import BoardView from '../BoardView';
import { useGetProjectDetailsQuery } from '@/store/api';

type Props = {
    params: {
        id: string
    }
}

const Projects = ({ params }: Props) => {
    const { id } = params;
    const [activeTab, setActiveTab] = useState<string>("Board");
    const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState<boolean>(false);

    const { data: project, isLoading } = useGetProjectDetailsQuery({id: Number(id)});

  return (
    <div>
        {!isLoading && <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} title={project?.name} />}
        {activeTab === "Board" && (
          <BoardView id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
        )}
    </div>
  )
}

export default Projects