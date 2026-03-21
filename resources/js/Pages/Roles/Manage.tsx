import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Permission, Role } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Manage({role, permissions}: {role: Role, permissions: Permission[]}) {

    console.log({role, permissions});
    const { data, setData, put, processing, errors } = useForm({
        id: role.id,
        name: role.name || '',
        permissions: role.permissions ? role.permissions.map(p => p.id) : [],
    });

    const submit: FormEventHandler = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('roles.update', role.id));
    }

    return(
        <Authenticated>
            <Head title="Manage Roles"/>
            
           <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <form onSubmit={submit} className="p-4 sm:p-8">
                            <div className="mt-4">
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput 
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                                <div className="grid grid-cols-4 gap-3 mt-3">
                                    {
                                        permissions.map((perm) => {
                                            const isChecked = data.permissions.includes(perm.id);
                                            return (
                                                <div key={perm.id}>
                                                    <label className="inline-flex items-center text-white">
                                                        <Checkbox
                                                            name="permissions[]"
                                                            value={perm.id}
                                                            checked={isChecked}
                                                            onChange={(e) => {
                                                                const value = parseInt(e.target.value);
                                                                if (e.target.checked) {
                                                                    setData('permissions', [...data.permissions, value]);
                                                                } else {
                                                                    setData('permissions', data.permissions.filter((id: number) => id !== value));
                                                                }
                                                            }}
                                                        />
                                                        <span className="ml-2">{perm.name.split('-').join(' ')}</span>
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <PrimaryButton className="mt-4" disabled={processing}>
                                    Update
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}