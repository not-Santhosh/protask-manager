<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Services\TaskService;
use Inertia\Inertia;

class TaskController extends Controller
{
    protected TaskService $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::query()
            ->with(['project', 'assignedTo', 'creator'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Tasks/Index', [
            'tasks' => TaskResource::collection($tasks),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = \App\Models\Project::orderBy('name')->get();
        $users = \App\Models\User::orderBy('name')->get();

        return Inertia::render('Tasks/Create', [
            'projects' => \App\Http\Resources\ProjectResource::collection($projects),
            'users' => \App\Http\Resources\UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $this->taskService->createTask($request->validated());

        return redirect()->route('projects.show', $request->project_id)
            ->with('success', 'Task created successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = \App\Models\Project::orderBy('name')->get();
        $users = \App\Models\User::orderBy('name')->get();

        return Inertia::render('Tasks/Edit', [
            'task' => new TaskResource($task),
            'projects' => \App\Http\Resources\ProjectResource::collection($projects),
            'users' => \App\Http\Resources\UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $this->taskService->updateTask($task, $request->validated());

        return redirect()->route('projects.show', $task->project_id)
            ->with('success', "Task \"{$task->name}\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $this->taskService->deleteTask($task);

        return redirect()->back()
            ->with('success', "Task \"{$name}\" was deleted");
    }
}
