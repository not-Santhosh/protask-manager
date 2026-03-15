<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskService
{
    /**
     * Create a new task.
     */
    public function createTask(array $data): Task
    {
        $data['created_by'] = Auth::id();

        return Task::create($data);
    }

    /**
     * Update a task.
     */
    public function updateTask(Task $task, array $data): bool
    {
        return $task->update($data);
    }

    /**
     * Delete a task.
     */
    public function deleteTask(Task $task): ?bool
    {
        return $task->delete();
    }
}
