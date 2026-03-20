import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Permission, Role } from "@/types";
import { Head } from "@inertiajs/react";



interface props {
    role: Role
    permissions: Permission
}

export default function Manage({props}: {props: props}) {

    return(
        <Authenticated>
            <Head title="Manage Roles"/>
            
           
        </Authenticated>
    )
}