import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Project, Task } from '@/types';

interface Props {
    project: {
        data: Project & { tasks: { data: Task[] } };
    };
}

export default function Show({ project }: Props) {
    const data = project.data;
    
    const statusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500';
            case 'in_progress': return 'bg-blue-500';
            case 'completed': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const priorityColor = (priority: string) => {
        switch (priority) {
            case 'low': return 'text-gray-500';
            case 'medium': return 'text-yellow-500';
            case 'high': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Project: {data.name}
                    </h2>
                    <div className="flex space-x-2">
                        <Link
                            href={route('projects.edit', data.id)}
                            className="bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600"
                        >
                            Edit
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Project: ${data.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Project Info Card */}
                        <div className="md:col-span-1 bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{data.description || 'No description provided'}</p>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</label>
                                        <p className="mt-1">
                                            <span className={`px-2 py-1 rounded text-white text-xs ${statusColor(data.status)}`}>
                                                {data.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Due Date</label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{data.due_date || 'No due date'}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Created By</label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{data.created_by.name}</p>
                                </div>
                            </div>
                        </div>

                        {/* Task List (Kanban Board placeholder) */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Tasks</h3>
                                    <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow text-sm hover:bg-emerald-600">
                                        Add Task
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {data.tasks.data.length > 0 ? (
                                        data.tasks.data.map((task) => (
                                            <div key={task.id} className="p-4 border dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">{task.name}</h4>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{task.description}</p>
                                                    </div>
                                                    <span className={`text-xs font-bold uppercase ${priorityColor(task.priority)}`}>
                                                        {task.priority}
                                                    </span>
                                                </div>
                                                <div className="mt-4 flex justify-between items-center">
                                                    <div className="flex items-center space-x-3">
                                                        <span className={`px-2 py-0.5 rounded text-white text-[10px] ${statusColor(task.status)}`}>
                                                            {task.status.replace('_', ' ').toUpperCase()}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400">Due: {task.due_date || 'N/A'}</span>
                                                    </div>
                                                    <div className="text-[10px] text-gray-500 italic">
                                                        Assigned to: {task.assigned_to?.name || 'Unassigned'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center py-12 text-gray-500 dark:text-gray-400">No tasks found for this project.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
