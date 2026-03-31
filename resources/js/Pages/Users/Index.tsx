import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { User } from '@/types';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler, useState } from 'react';

interface Props {
    users: {
        data: User[];
        meta: any;
    };
}

export default function Index({ users }: Props) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Simplified toggle handler
    const toggleModal = (user: User | null = null) => {
        setSelectedUser(user);
        setShowModal(!showModal);
    };

    const statusBadge = (status: string) => {
        const isActive = status === 'active';
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isActive 
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }`}>
                {isActive ? 'Active' : 'Inactive'}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    User Management
                </h2>
            }
        >
            <Head title="Users" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4">
                        <Link
                            href={route('users.create')}
                            className="bg-emerald-700 py-1 px-3 text-white rounded shadow hover:bg-emerald-800 transition-all font-semibold"
                        >
                            Add New
                        </Link>
                    </div>
                    
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Role</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => (
                                        <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-4 py-2 text-sm">{user.id}</td>
                                            <td className="px-4 py-2">{user.name}</td>
                                            <td className="px-4 py-2">{user.email}</td>
                                            <td className="px-4 py-2 text-sm">{user.role?.name}</td>
                                            <td className="px-4 py-2 text-sm">{statusBadge('active')}</td>
                                            <td className="px-4 py-2 text-right">
                                                <Link href={route('users.edit', user.id)} className="text-blue-500 hover:underline mx-2">
                                                    Edit
                                                </Link>
                                                <button className="text-red-500 hover:underline mx-2">
                                                    Delete
                                                </button>
                                                <button 
                                                    className="text-yellow-500 hover:underline mx-2" 
                                                    onClick={() => toggleModal(user)}
                                                >
                                                    Reset Password
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {users.meta && <Pagination links={users.meta.links} />}
                </div>
            </div>

            {showModal && (
                <ResetPassword 
                    user={selectedUser} 
                    onClose={() => toggleModal(null)} 
                />
            )}
        </AuthenticatedLayout>
    );
}

/**
 * RESET PASSWORD COMPONENT
 */
const ResetPassword = ({ user, onClose }: { user: User | null; onClose: () => void }) => {
    const { data, setData, put, errors, processing, reset } = useForm({
        password: '',
        password_confirmation: '', // Laravel usually expects password_confirmation
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('users.reset-password', user?.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-gray-900/50 backdrop-blur-sm" onClick={onClose}>
            <div
                className="rounded-lg shadow-xl max-w-md w-full overflow-hidden transform transition-all mt-20 bg-white dark:bg-gray-900"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Reset Password: <span className="text-emerald-500">{user?.name}</span>
                    </h3>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <form onSubmit={submit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <InputLabel htmlFor="password" value="New Password" />
                            <TextInput
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full"
                                required
                                isFocused
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                    </div>

                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
                        <SecondaryButton onClick={onClose} disabled={processing}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {processing ? 'Updating...' : 'Update Password'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};