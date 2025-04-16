import { useAppSelector } from '@/app/StoreProvider';
import { useGetAllTasksQuery } from '@/store/api';
import { LoaderCircle } from 'lucide-react';
import React from 'react'
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import { formatDate } from 'date-fns';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import Link from 'next/link';

type TableProps = {
    id: string,
}

const columns: GridColDef[] = [
    {
        field: "taskId",
        headerName: "ID",
        width: 100,
        renderCell: (params) => (
            <Link className='text-blue-primary' href={`/tasks/${params.value}`}>{params.value}</Link>
        ),
    },
    {
        field: "title",
        headerName: "Title",
        width: 220
    },
    {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params) => (
            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 
                ${params.value === "To Do" ? 
                    "bg-red-200 text-red-700" : params.value === "Under Review" ?
                    "bg-yellow-200 text-yellow-700" : params.value === "Closed" ? 
                    "bg-green-200 text-green-700" : params.value === "In Progress" &&
                    "bg-blue-200 text-blue-700"}
            `}>
                {params.value}
            </span>
        )
    },
    {
        field: "priority",
        headerName: "Priority",
        width: 75
    },
    {
        field: "tags",
        headerName: "Tags",
        width: 200
    },
    {
        field: "startDate",
        headerName: "Start Date",
        width: 130,
        renderCell: (params) => params.value ? (<span>{formatDate(new Date(params.value), "P")}</span>) : "-"
    },
    {
        field: "dueDate",
        headerName: "Due Date",
        width: 130,
        renderCell: (params) => params.value ? (<span>{formatDate(new Date(params.value), "P")}</span>) : "-"
    },
    {
        field: "author",
        headerName: "Reporter",
        width: 100,
        renderCell: (params) => params.value.username || "Unknown" 
    },
    {
        field: "assignee",
        headerName: "Assignee",
        width: 100,
        renderCell: (params) => params.value.username || "Unassigned" 
    },
]

const TableView = ({ id }: TableProps) => {
    const { isDarkMode } = useAppSelector(state => state.global);
    const { data: tasks, isLoading, error } = useGetAllTasksQuery({projectId: Number(id)});

    if(isLoading) {
        return <div className='w-full h-40 flex justify-center items-center'>
            <LoaderCircle className='animate-spin text-gray-500 dark:text-neutral-500' size={40}/>
        </div>
    } else if (error) {
        return <div className='flex w-full h-40 justify-center items-center text-lg'>
            An error occured while fetching the tasks
        </div>
    }

  return (
    <div className='h-[450px] w-full px-4 pb-8 xl:px-6'>
        <DataGrid 
            pageSizeOptions={[10, 20, 50]}
            rows={tasks || []}
            columns={columns}
            className={dataGridClassNames}
            sx={dataGridSxStyles(isDarkMode)}
        />
    </div>
  )
}

export default TableView