import { Role } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { FormEventHandler } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

interface Props {
    roles: {
        data: Role[];
        meta: any;
    };
}

export default function Index({roles}: Props) {
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleClick = () => {
        setShowModal(() => !showModal);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Roles" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-end items-center mb-4">
                        <button
                            onClick={handleClick}
                            className="bg-emerald-700 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-800 font-semibold"
                        >
                            Add New
                        </button>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">Name</th> 
                                        <th className="px-4 py-2 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.data.length > 0 ? roles.data.map((role) => (
                                        <tr key={role.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-4 py-2 text-sm">{role.id}</td>
                                            <td className="px-4 py-2">
                                                {role.name}
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                <Link href={route('roles.edit', role.id)} className="text-blue-500 hover:underline mx-2">
                                                    Manage
                                                </Link>
                                                <button className="text-red-500 hover:underline mx-2">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )):
                                    <tr>
                                        <td colSpan={3} className="px-4 py-2 text-center">No roles found</td>
                                    </tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {roles.meta && <Pagination links={roles.meta.links} />}
                </div>
            </div>

            {showModal && <NewRoleModal showModal={showModal} setShowModal={setShowModal} handleClick={handleClick} />}
        </AuthenticatedLayout>
    );
}

const NewRoleModal = ({
    showModal, 
    setShowModal,
    handleClick
}: {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    handleClick: () => void
}) => {

    const {data, setData, post, processing, errors} = useForm({
        name: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('roles.store'));
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-start justify-center p-4 bg-black-800`} onClick={handleClick}>
            <div
                className=" rounded-lg shadow-xl max-w-md w-full overflow-hidden transform transition-all mt-10 bg-gray-900"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-gray-400 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">New Role</h3>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={handleClick}>
                        &times;
                    </button>
                </div>
                <form onSubmit={submit}>
                    <div className="p-6 text-gray-600 dark:text-white">
                        <InputLabel htmlFor="name" value="Name"/>
                        <TextInput 
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 w-full"
                            required
                        />
                    </div>
                    <div className="px-6 py-4 border-t border-gray-400 bg-white dark:bg-gray-900 flex justify-end gap-3">
                        <SecondaryButton onClick={handleClick}>
                            Close
                        </SecondaryButton>
                        <PrimaryButton>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    )
}