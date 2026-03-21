<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::paginate(10);
        return Inertia::render('Roles/Index', [
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        $role = Role::create($request->validated());
        $permissions = Permission::all();

        return Inertia::render('Roles/Manage', [
            'role' => $role,
            'permissions' => $permissions
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $role = Role::with('permissions')->where('id', $id)->first();

        $allPermissions = Cache::remember('permissions', now()->addMinutes(10), function () {
            return Permission::all();
        });

        return Inertia::render('Roles/Manage', [
            'role' => $role,
            'permissions' => $allPermissions
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, string $id)
    {
        $role = Role::findOrFail($id);

        $role->update([
            'name' => $request->name,
        ]);

        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index')->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return redirect()->route('roles.index')->with('success', 'Role deleted successfully.');
    }
}
