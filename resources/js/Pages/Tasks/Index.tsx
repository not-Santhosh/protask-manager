import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { Task } from '@/types';

interface Props {
    tasks: {
        data: Task[];
        meta: any;
        links: any;
    };
}

export default function Index({ tasks }: Props) {
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
            case 'low': return 'text-gray-200';
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
                        All Tasks
                    </h2>
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">Task</th>
                                        <th className="px-4 py-2">Project</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Priority</th>
                                        <th className="px-4 py-2">Due Date</th>
                                        <th className="px-4 py-2">Assigned To</th>
                                        <th className="px-4 py-2 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.data.map((task) => (
                                        <tr key={task.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-4 py-2 text-sm">{task.id}</td>
                                            <td className="px-4 py-2">
                                                <p className="font-medium text-gray-900 dark:text-gray-100">{task.name}</p>
                                                <p className="text-xs text-gray-400 line-clamp-1">{task.description}</p>
                                            </td>
                                            <td className="px-4 py-2 text-sm">
                                                <Link href={route('projects.show', task.project_id)} className="text-blue-500 hover:underline">
                                                    {task.project.name}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className={`block px-2 py-0.5 rounded text-white text-[10px] text-nowrap text-center font-semibold ${statusColor(task.status)}`}>
                                                    {task.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className={`text-[10px] font-bold uppercase ${priorityColor(task.priority)}`}>
                                                    {task.priority}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-sm">{task.due_date}</td>
                                            <td className="px-4 py-2 text-sm italic">{task.assigned_to?.name || 'Unassigned'}</td>
                                            <td className="px-4 py-2 text-right">
                                                <Link href={route('tasks.edit', task.id)} className="text-blue-500 hover:underline mx-2">
                                                    Edit
                                                </Link>
                                                <button className="text-red-500 hover:underline mx-2">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {tasks.meta && <Pagination links={tasks.meta.links} />}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
