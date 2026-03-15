import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Task } from '@/types';

interface Props {
    totalProjects: number;
    myProjects: number;
    totalTasks: number;
    myTasks: number;
    pendingTasks: number;
    inProgressTasks: number;
    completedTasks: number;
    activeTasks: { data: Task[] };
}

export default function Dashboard({
    totalProjects,
    myProjects,
    totalTasks,
    myTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,
    activeTasks,
}: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <h3 className="text-gray-500 text-sm font-medium uppercase">Total Projects</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{totalProjects}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-blue-500">
                            <h3 className="text-gray-500 text-sm font-medium uppercase">My Projects</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{myProjects}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <h3 className="text-gray-500 text-sm font-medium uppercase">Total Tasks</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{totalTasks}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-emerald-500">
                            <h3 className="text-gray-500 text-sm font-medium uppercase">My Active Tasks</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{myTasks}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Task Status Overview */}
                        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-6">Task Status Overview</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">Pending</span>
                                    <span className="font-bold text-yellow-500">{pendingTasks}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(pendingTasks/totalTasks)*100}%` }}></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">In Progress</span>
                                    <span className="font-bold text-blue-500">{inProgressTasks}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(inProgressTasks/totalTasks)*100}%` }}></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">Completed</span>
                                    <span className="font-bold text-emerald-500">{completedTasks}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(completedTasks/totalTasks)*100}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Active Tasks */}
                        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold">My Active Tasks</h3>
                                <Link href={route('tasks.index')} className="text-sm text-blue-500 hover:underline">View All</Link>
                            </div>
                            <div className="space-y-4">
                                {activeTasks.data.map((task) => (
                                    <div key={task.id} className="flex items-center justify-between p-3 border-b dark:border-gray-700 last:border-0">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 dark:text-gray-100">{task.name}</p>
                                            <p className="text-xs text-gray-500">{task.project.name}</p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] text-white ${task.status === 'in_progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                                                {task.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                            <Link href={route('projects.show', task.project_id)} className="text-gray-400 hover:text-gray-600">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                                {activeTasks.data.length === 0 && (
                                    <p className="text-center py-6 text-gray-500">No active tasks assigned to you.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
