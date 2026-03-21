<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->orderBy('name')->paginate(10);

        return Inertia::render('Users/Index', [
            'users' => UserResource::collection($users)
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create', [
            'roles' => Role::all()
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();

        $user = User::create($validated);

        return redirect()
            ->route('users.index')
            ->with('success', "User \"{$user->name}\" created successfully.");
    }


    public function edit(User $user)
    {
        $user->load('roles');
        
        return Inertia::render('Users/Edit', [
            'user' => new UserResource($user),
            'roles' => Role::all()
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->syncRoles($request->validated()['role']);

        $user->update([
            'name' => $request->validated()['name'],
            'email' => $request->validated()['email'],
            'status' => $request->validated()['status'],
            'phone_number' => $request->validated()['phone_number']
        ]);

        return redirect()
            ->route('users.index')
            ->with('success', "Roles for \"{$user->name}\" updated successfully.");
    }

    public function resetPassword(User $user)
    {
        
    }
}
