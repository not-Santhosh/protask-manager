<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('name')->paginate(10);


        return Inertia::render('Users/Index', [
            'users' => UserResource::collection($users)
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create', []);
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
            'user' => new UserResource($user)
        ]);
    }

    public function update(StoreUserRequest $request, User $user)
    {
        $user->syncRoles($request->validated('roles'));

        return redirect()
            ->route('users.index')
            ->with('success', "Roles for \"{$user->name}\" updated successfully.");
    }
}
