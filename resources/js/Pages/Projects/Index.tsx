import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { Project } from '@/types';

interface Props {
    projects: {
        data: Project[];
        meta: any;
        links: any;
    };
}

export default function Index({ projects }: Props) {
    const statusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500';
            case 'in_progress': return 'bg-blue-500';
            case 'completed': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Projects" />   
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-end items-center mb-4">
                        <Link
                            href={route('projects.create')}
                            className="bg-emerald-700 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-800 font-semibold"
                        >
                            Add New
                        </Link>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Due Date</th>
                                        <th className="px-4 py-2">Created By</th>
                                        <th className="px-4 py-2 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project) => (
                                        <tr key={project.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-4 py-2">{project.id}</td>
                                            <td className="px-4 py-2">
                                                <Link href={route('projects.show', project.id)} className="text-blue-500 hover:underline">
                                                    {project.name}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor(project.status)}`}>
                                                    {project.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">{project.due_date}</td>
                                            <td className="px-4 py-2">{project.created_by.name}</td>
                                            <td className="px-4 py-2 text-right">
                                                <Link href={route('projects.edit', project.id)} className="text-blue-500 hover:underline mx-2">
                                                    Edit
                                                </Link>
                                                <form action={route('projects.destroy', project.id)} method="post" className="inline">
                                                    <input type="hidden" name="_method" value="DELETE" />
                                                    <button type="submit" className="text-red-500 hover:underline mx-2">
                                                        Delete
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {projects.meta && <Pagination links={projects.meta.links} />}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
