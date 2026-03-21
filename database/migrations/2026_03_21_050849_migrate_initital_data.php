<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $role = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);

        $permissions = [
            ['name' => 'manage-roles', 'guard_name' => 'web'],
            ['name' => 'alter-project', 'guard_name' => 'web'],
            ['name' => 'view-project', 'guard_name' => 'web'],
            ['name' => 'delete-project', 'guard_name' => 'web'],
            ['name' => 'alter-task', 'guard_name' => 'web'],
            ['name' => 'view-task', 'guard_name' => 'web'],
            ['name' => 'delete-task', 'guard_name' => 'web'],
            ['name' => 'alter-users', 'guard_name' => 'web'],
            ['name' => 'view-users', 'guard_name' => 'web'],
            ['name' => 'delete-users', 'guard_name' => 'web'],
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate($permission);
            $role->givePermissionTo($permission['name']);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $permissionNames = [
            'manage-roles', 'alter-project', 'view-project', 'delete-project',
            'alter-task', 'view-task', 'delete-task', 'alter-users', 
            'view-users', 'delete-users'
        ];

        Permission::whereIn('name', $permissionNames)->delete();
        Role::where('name', 'admin')->delete();
    }
};
