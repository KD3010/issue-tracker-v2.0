import { useCreateTaskMutation, useGetAllProjectsQuery } from '@/store/api';
import React, { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import Modal from './index';
import { Priority, Status } from '@/store/api';
import { formatISO } from 'date-fns';
import { Alert, Snackbar } from '@mui/material';

type Props = {
    isOpen: boolean,
    onClose: () => void;
}

const defaultFormInputs = {
    title: "", 
    description: "", 
    priority: Priority.Minor, 
    tags: "", 
    startDate: "", 
    dueDate: "", 
    points: 0, 
    projectId: "",
    assignedUserId: ""
}

const ModalNewTask = ({ isOpen, onClose }: Props) => {
    const [ createTask, { isLoading } ] = useCreateTaskMutation();
    const [ showToast, setShowToast ] = useState<boolean>(false);
    const { data: projects } =  useGetAllProjectsQuery();

    const [ formInputs, setFormInputs ] = useState(defaultFormInputs)

    useEffect(() => {
        if (!isOpen) {
            setFormInputs(defaultFormInputs);
        }
    }, [isOpen])

    const { 
        title, 
        description, 
        priority, 
        tags, 
        startDate, 
        dueDate, 
        points, 
        projectId,
        assignedUserId
    } = formInputs;

    const handleChange = (e: ChangeEvent<any>) => {
        setFormInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!title || !projectId) {
            return;
        }

        const formattedStartDate = startDate && formatISO(new Date(startDate), { representation: "complete" });
        const formattedDueDate = dueDate && formatISO(new Date(dueDate), { representation: "complete" });

        try {
            await createTask({ 
                title, 
                description, 
                status: Status.ToDo, 
                priority, 
                tags, 
                startDate: formattedStartDate, 
                dueDate: formattedDueDate, 
                points, 
                authorUserId: "iamkd30@gmail.com", 
                projectId: Number(projectId), 
                assignedUserId 
            }).unwrap();
            setFormInputs(defaultFormInputs);
            onClose();
        } catch (error: any) {
            setShowToast(true)
        }
    }

    const isFormValid = () => {
        return title && projectId;
    }

    const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus-none"

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
        <form className='mt-4 space-y-6' onSubmit={handleSubmit}>
            <input type="text" name="title" className={inputStyles} placeholder='Task Name' value={title} onChange={handleChange} />
            <textarea name="description" placeholder='Description' value={description} className={inputStyles} onChange={handleChange} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
                <select onChange={handleChange} value={projectId || ""} name="projectId" className={`${inputStyles} dark:focus:outline-none`}>
                    <option hidden value="">Project</option>
                    {projects && projects.map(project => <option key={project.id} value={project.id}>
                        {project.name}
                    </option>)}
                </select>
                <select onChange={handleChange} value={priority || ""} name="priority" className={`${inputStyles} dark:focus:outline-none`}>
                    <option hidden value="">Priority</option>
                    {Object.keys(Priority).map((key, ind) => <option key={ind} value={Priority[key as keyof typeof Priority]}>
                        {Priority[key as keyof typeof Priority]}
                    </option>)}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
                <label className='dark:text-white'>Start Date <input type="date" name="startDate" className={inputStyles} value={startDate} onChange={handleChange} /></label>
                <label className='dark:text-white'>Due Date <input type="date" name="dueDate" className={inputStyles} value={dueDate} onChange={handleChange} /></label>
            </div>
            
            <input type="text" name="assignedUserId" className={inputStyles} placeholder='Assignee Email' value={assignedUserId} onChange={handleChange} />
            <input type="text" name="tags" className={inputStyles} placeholder='Tags (comma seperated)' value={tags} onChange={handleChange} />
            
            <button type='submit' className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focuer:offset-2 ${
                !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
            }`} disabled={!isFormValid() || isLoading}>
                {isLoading ? "Creating..." : "Create"}
            </button>
        </form>

        {/* Show toast if can't create project */}
        <Snackbar 
            open={showToast}
            anchorOrigin={{horizontal: "right", vertical: "top"}}
            onClose={() => setShowToast(false)}
            autoHideDuration={5000}
        >
            <Alert severity='error' sx={{ width: '100%' }} variant='filled' onClose={() => setShowToast(false)}>
                {"Couldn't create new task"}
            </Alert>
        </Snackbar>
    </Modal>
  )
}

export default ModalNewTask