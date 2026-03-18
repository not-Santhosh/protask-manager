import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { User } from '@/types';

interface Props {
    user: { data: User };
    roles: string[];
}

const roleColor = (role: string) => {
    switch (role) {
        case 'admin': return 'bg-red-500 border-red-600';
        case 'manager': return 'bg-purple-500 border-purple-600';
        case 'developer': return 'bg-blue-500 border-blue-600';
        case 'viewer': return 'bg-gray-500 border-gray-600';
        default: return 'bg-teal-500 border-teal-600';
    }
};

const roleDescription = (role: string) => {
    switch (role) {
        case 'admin': return 'Full access to all features and settings.';
        case 'manager': return 'Can manage projects, tasks, and team members.';
        case 'developer': return 'Can create and update tasks and projects.';
        case 'viewer': return 'Read-only access to projects and tasks.';
        default: return 'Custom role with specific permissions.';
    }
};

export default function Edit({ user, roles }: Props) {
    const u = user.data;

    const { data, setData, put, processing, errors } = useForm({
        roles: u.roles ?? [] as string[],
    });

    const toggleRole = (role: string) => {
        setData('roles',
            data.roles.includes(role)
                ? data.roles.filter(r => r !== role)
                : [...data.roles, role]
        );
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('users.update', u.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Manage Roles: <span className="text-indigo-500">{u.name}</span>
                    </h2>
                    <Link
                        href={route('users.index')}
                        className="bg-gray-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-600"
                    >
                        Back
                    </Link>
                </div>
            }
        >
            <Head title={`Manage Roles: ${u.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8 space-y-6">

                    {/* User Card */}
                    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                                {u.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{u.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{u.email}</div>
                                <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Member since {u.created_at}</div>
                            </div>
                        </div>
                    </div>

                    {/* Role Assignment Form */}
                    <form onSubmit={submit}>
                        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                Assign Roles
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Select one or more roles for this user. Roles define what the user can access throughout the application.
                            </p>

                            {errors.roles && (
                                <div className="mb-4 text-sm text-red-600 dark:text-red-400">
                                    {errors.roles}
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {roles.map(role => {
                                    const isSelected = data.roles.includes(role);
                                    return (
                                        <button
                                            key={role}
                                            type="button"
                                            onClick={() => toggleRole(role)}
                                            className={`relative flex items-start gap-3 p-4 rounded-lg border-2 text-left transition-all duration-150 ${
                                                isSelected
                                                    ? `${roleColor(role)} text-white shadow-md scale-[1.01]`
                                                    : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-400 dark:hover:border-indigo-500'
                                            }`}
                                        >
                                            {/* Checkbox indicator */}
                                            <div className={`mt-0.5 h-5 w-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-colors ${
                                                isSelected
                                                    ? 'border-white bg-white/20'
                                                    : 'border-gray-400 dark:border-gray-500'
                                            }`}>
                                                {isSelected && (
                                                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div>
                                                <div className={`font-semibold capitalize text-sm ${isSelected ? 'text-white' : ''}`}>
                                                    {role}
                                                </div>
                                                <div className={`text-xs mt-0.5 ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                                                    {roleDescription(role)}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {data.roles.length === 0
                                        ? 'No roles selected — user will have no special access.'
                                        : `${data.roles.length} role${data.roles.length > 1 ? 's' : ''} selected: ${data.roles.join(', ')}`
                                    }
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-emerald-500 py-2 px-4 text-white rounded-md shadow transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                                >
                                    {processing ? 'Saving...' : 'Save Roles'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
