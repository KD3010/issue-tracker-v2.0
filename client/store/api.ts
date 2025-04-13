import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
    id: number,
    name: string,
    description?: string,
    version: string,
    workspaceId: number
}

export interface User {
    userId?: number,
    username: string,
    email: string,
    profilePictureUrl?: string,
    cognitoId?: string,
}

export interface Attachment {
    id: number,
    fileURL: string,
    fileName: string,
    taskId: number,
    uploadedById: number
}

export interface Task {
    id: number,
    title: string, 
    description?: string, 
    status?: Status, 
    priority?: Priority, 
    tags?: string, 
    startDate?: string, 
    dueDate?: string, 
    points?: number, 
    projectId: number, 
    authorUserId?: string, 
    assignedUserId?: string,
    
    author?: User,
    assignee?: User,
    comments?: Comment[],
    attachments?: Attachment[],
}

export interface Workspace {
    id: number,
    name: string
}

export enum Status {
    ToDo = "To Do",
    InProgress = "In Progress",
    UnderReview = "Under Review",
    Closed = "Closed"
}

export enum Priority {
    Blocker = "Blocker",
    Critical = "Critical",
    Major = "Major",
    Minor = "Minor",
    Backlog = "Backlog"
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["Projects", "Tasks", "Workspaces"],
    endpoints: (build) => ({
        getAllProjects: build.query<Project[], { queries: String[] }>({
            query: ({ queries }) => `projects?${queries.join(",")}`,
            providesTags: ["Projects"]
        }),
        getProjectDetails: build.query<Project, { id: number }>({
            query: ({ id }) => `projects/${id}`,
            providesTags: ["Projects"]
        }),
        createProject: build.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: "projects",
                method: "POST",
                body: project
            }),
            invalidatesTags: ["Projects"]
        }),
        getAllTasks: build.query<Task[], { projectId: number }>({
            query: ({ projectId }) => `tasks?projectId=${projectId}`,
            providesTags: (result) => (
                result ? result.map(({ id }: { id: any }) => ({type: "Tasks" as const , id})) : [{type: "Tasks" as const}]
            )
        }),
        createTask: build.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: "task",
                method: "POST",
                body: task
            }),
            invalidatesTags: ["Tasks"]
        }),
        updateTaskStatus: build.mutation<Task, { taskId: number, status: string }>({
            query: ({ taskId, status }) => ({
                url: `tasks/${taskId}/status`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: (result, error, { taskId }) => [{type: "Tasks" as const, taskId}]
        }),
        getMyWorkspaces: build.query<Workspace[], { user: string }>({
            query: ({ user }) => `workspaces?user=${user}`,
            providesTags: ["Workspaces"]
        })
    })
});

export const { 
    useGetAllProjectsQuery, 
    useGetProjectDetailsQuery,
    useCreateProjectMutation, 
    useGetAllTasksQuery, 
    useCreateTaskMutation, 
    useUpdateTaskStatusMutation,
    useGetMyWorkspacesQuery,
} = api;