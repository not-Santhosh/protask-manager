import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Role, User } from '@/types';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';

interface Props {
    user: { data: User };
    roles: Role[];
}

export default function Edit({ user, roles }: Props) {
    const u = user.data;

    const { data, setData, put, processing, errors } = useForm({
        name: u.name || "",
        email: u.email || "",
        role: u.role?.name || "",
        phone_number: u.phone_number || "",
        status: u.status || "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('users.update', u.id));
    };

     return (
            <AuthenticatedLayout>
                <Head title="Update User" />
    
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="p-4 sm:p-8">
                                <h3 className='font-bold text-white text-2xl mb-5'>Update User</h3>
                                <form onSubmit={submit}>
                                    <div className='grid grid-cols-2 gap-6'>
    
                                        <div>
                                            <InputLabel htmlFor="name" value="Name" />
                                            <TextInput
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                className="mt-1 block w-full"
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>
    
                                        <div>
                                            <InputLabel htmlFor="email" value="Email" />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="mt-1 block w-full"
                                                autoComplete="username"
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.email} className="mt-2" />
                                        </div>
    
                                        <div>
                                            <InputLabel htmlFor='phone_number' value='Phone Number' />
                                            <TextInput 
                                                id='phoneNumber'
                                                type='text'
                                                name='phone_number'
                                                value={data.phone_number}
                                                className='mt-1 block w-full'
                                                autoComplete='phone_number'
                                                onChange={(e) => setData('phone_number', e.target.value)}
                                                pattern='[0-9]*'
                                                required
                                            />
                                            <InputError message={errors.phone_number} className='mt-2' />
                                        </div>
    
                                        <div>
                                            <InputLabel htmlFor='role' value='Role' />
                                            <SelectInput 
                                                name='role' 
                                                options={roles.map(role => ({value: role.name, label: role.name}))}
                                                value={data.role}
                                                onChange={(e) => setData('role', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.role} className='mt-2' />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor='status' value='Status' />
                                            <SelectInput 
                                                name='status' 
                                                options={[{value: 'active', label: 'Active'}, {value: 'inactive', label: 'Inactive  '}]}
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.status} className='mt-2' />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-end">
                                        <PrimaryButton className="ms-4" disabled={processing}>
                                            Save
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
}
