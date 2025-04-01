"use client";
import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader';

type Props = {
    params: {
        id: string
    }
}

const Projects = ({ params }: Props) => {
    const { id } = params;
    const [activeTab, setActiveTab] = useState<string>("Board");
    const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState<boolean>(false);

  return (
    <div>
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab}>
            
        </ProjectHeader>
    </div>
  )
}

export default Projects