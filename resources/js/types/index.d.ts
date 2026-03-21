import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    phone_number: string;
    role?: Role | null;
    created_at: string;
    email_verified_at?: string;
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    permissions?: Permission[];
    created_at: string;
    updated_at: string;
}

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    due_date: string;
    created_by: User;
    created_at: string;
}

export interface Task {
    id: number;
    name: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    due_date: string;
    project_id: number;
    project: Project;
    assigned_to: User;
    created_by: User;
    created_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
