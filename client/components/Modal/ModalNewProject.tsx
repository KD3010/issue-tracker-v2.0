import { useCreateProjectMutation } from '@/store/api';
import React, { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import Modal from './index';
import { useAppSelector } from '@/app/StoreProvider';
import { Alert, Snackbar } from '@mui/material';

type Props = {
    isOpen: boolean,
    onClose: () => void;
}

const defaultFormInputs = {
    name: "",
    description: "",
    version: ""
}

const ModalNewProject = ({ isOpen, onClose }: Props) => {
    const [ createProject, { isLoading } ] = useCreateProjectMutation();
    const { currentWorkspace } = useAppSelector((state) => state.global)
    const [ showToast, setShowToast ] = useState<boolean>(false);
    const [ { name, description, version }, setFormInputs ] = useState(defaultFormInputs)

    useEffect(() => {
        if(!isOpen) {
            setFormInputs(defaultFormInputs)
        }
    }, [isOpen])

    const handleChange = (e: ChangeEvent<any>) => {
        setFormInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!name || !version) {
            return;
        }

        try {
            await createProject({ name, description, version, workspaceId: parseInt(currentWorkspace.toString()) }).unwrap();
            setFormInputs(defaultFormInputs);
            onClose();
        } catch (error) {
            setShowToast(true);
        }
    }

    const isFormValid = () => {
        return name && version;
    }

    const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus-none"

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
        <form className='mt-4 space-y-6' onSubmit={handleSubmit}>
            <input type="text" name="name" className={inputStyles} placeholder='Project Name' value={name} onChange={handleChange} />
            <textarea name="description" placeholder='Description' value={description} className={inputStyles} onChange={handleChange} />
            <input type="text" name="version" className={inputStyles} placeholder='Version' value={version} onChange={handleChange} />
            
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
                {"Couldn't create new project"}
            </Alert>
        </Snackbar>
    </Modal>
  )
}

export default ModalNewProject