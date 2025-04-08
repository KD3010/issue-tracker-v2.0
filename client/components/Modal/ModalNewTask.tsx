import { useCreateTaskMutation } from '@/store/api';
import React, { useState, type ChangeEvent } from 'react'
import Modal from './index';
import { Priority, Status } from '@/store/api';

type Props = {
    isOpen: boolean,
    onClose: () => void;
}

const ModalNewTask = ({ isOpen, onClose }: Props) => {
    const [ createTask, { isLoading } ] = useCreateTaskMutation();
    const [ authorUserId, setAutherUserId ] = useState("");
    const [ assignedUserId, setAssignedUserId ] = useState("");

    const [ formInputs, setFormInputs ] = useState({
        title: "", 
        description: "", 
        status: Status.ToDo, 
        priority: Priority.Minor, 
        tags: "", 
        startDate: "", 
        dueDate: "", 
        points: -1, 
        projectId: -1,
    })

    const { 
        title, 
        description, 
        status, 
        priority, 
        tags, 
        startDate, 
        dueDate, 
        points, 
        projectId
    } = formInputs;

    const handleChange = (e: ChangeEvent<any>) => {
        setFormInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handelSubmit = async () => {
        if(!title || !startDate || !dueDate) {
            return;
        }

        await createTask({ 
            title, 
            description, 
            status, 
            priority, 
            tags, 
            startDate, 
            dueDate, 
            points, 
            authorUserId, 
            projectId, 
            assignedUserId 
        });
    }

    const isFormValid = () => {
        return title && description && startDate && dueDate && status;
    }

    const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus-none"

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
        <form className='mt-4 space-y-6' onSubmit={(e) => {
            e.preventDefault();
            handelSubmit();
        }}>
            <input type="text" name="title" className={inputStyles} placeholder='Task Name' value={title} onChange={handleChange} />
            <textarea name="description" placeholder='Description' value={description} className={inputStyles} onChange={handleChange} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
                <select className={`${inputStyles} dark:focus:outline-none`}>
                    <option hidden value="">Status</option>
                    {Object.keys(Status).map(key => <option value={Status[key as keyof typeof Status]}>
                        {Status[key as keyof typeof Status]}
                    </option>)}
                </select>
                <select className={`${inputStyles} dark:focus:outline-none`}>
                    <option hidden value="">Priority</option>
                    {Object.keys(Priority).map(key => <option value={Priority[key as keyof typeof Priority]}>
                        {Priority[key as keyof typeof Priority]}
                    </option>)}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
                <label className='dark:text-white'>Start Date <input type="date" name="startDate" className={inputStyles} value={startDate} onChange={handleChange} /></label>
                <label className='dark:text-white'>Due Date <input type="date" name="dueDate" className={inputStyles} value={dueDate} onChange={handleChange} /></label>
            </div>

            <input type="text" name="tags" className={inputStyles} placeholder='Tags (comma seperated)' value={tags} onChange={handleChange} />
            
            <button type='submit' className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focuer:offset-2 ${
                !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
            }`} disabled={!isFormValid() || isLoading}>
                {isLoading ? "Creating..." : "Create"}
            </button>
        </form>
    </Modal>
  )
}

export default ModalNewTask