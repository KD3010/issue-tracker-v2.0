import React, { type Dispatch, type SetStateAction } from 'react'
import ReactDOM from 'react-dom';
import Header from '../Header';
import { X } from 'lucide-react';

type Props = {
    children: React.ReactNode,
    isOpen: boolean,
    onClose: () => void,
    name: string
}

const Modal = ({ children, isOpen, onClose, name }: Props) => {
  return ReactDOM.createPortal(
    <div key={name} className='z-[100] fixed inset-0 h-full w-full overflow-y-auto flex items-center justify-center bg-gray-600 bg-opacity-50 p-4'>
        <div className={`w-full max-w-xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary animate-zoom_in`}>
            <Header title={name} buttonComponent={
                <button 
                    className='flex h-7 w-7 items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-600 '
                    onClick={onClose}
                >
                    <X size={18}/>
                </button>
            } isSmallText/>
                {children}
        </div>
    </div>,
    document.body
  )
}

export default Modal