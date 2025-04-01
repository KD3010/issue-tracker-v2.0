import React, { type Dispatch, type SetStateAction } from 'react'

type Props = {
    activeTab: string,
    setActiveTab: Dispatch<SetStateAction<string>>
}

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div>ProjectHeader</div>
  )
}

export default ProjectHeader