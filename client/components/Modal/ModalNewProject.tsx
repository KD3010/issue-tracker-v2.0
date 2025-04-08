import { useCreateProjectMutation } from '@/store/api';
import React, { useState, type ChangeEvent } from 'react'
import Modal from './index';
import { formatISO } from 'date-fns';

type Props = {
    isOpen: boolean,
    onClose: () => void;
}

const ModalNewProject = ({ isOpen, onClose }: Props) => {
    const [ createProject, { isLoading } ] = useCreateProjectMutation();
    const [ { name, description, startDate, endDate }, setFormInputs ] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
    })

    const handleChange = (e: ChangeEvent<any>) => {
        setFormInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handelSubmit = async () => {
        if(!name || !startDate || !endDate) {
            return;
        }
        const formattedStartDate = formatISO(new Date(startDate), { representation: "complete" });
        const formattedEndDate = formatISO(new Date(endDate), { representation: "complete" });

        try {
            await createProject({ name, description, startDate: formattedStartDate, endDate: formattedEndDate });
            onClose();
        } catch (error) {
            
        }
    }

    const isFormValid = () => {
        return name && description && startDate && endDate;
    }

    const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus-none"

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
        <form className='mt-4 space-y-6' onSubmit={(e) => {
            e.preventDefault();
            handelSubmit();
        }}>
            <input type="text" name="name" className={inputStyles} placeholder='Project Name' value={name} onChange={handleChange} />
            <textarea name="description" placeholder='Description' value={description} className={inputStyles} onChange={handleChange} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
                <label className='dark:text-white'>Start Date <input type="date" name="startDate" className={inputStyles} value={startDate} onChange={handleChange} /></label>
                <label className='dark:text-white'>End Date <input type="date" name="endDate" className={inputStyles} value={endDate} onChange={handleChange} /></label>
            </div>
            <button type='submit' className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focuer:offset-2 ${
                !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
            }`} disabled={!isFormValid() || isLoading}>
                {isLoading ? "Creating..." : "Create"}
            </button>
        </form>
    </Modal>
  )
}

export default ModalNewProject