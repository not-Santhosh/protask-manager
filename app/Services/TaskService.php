<?php

namespace App\Services;

use App\Models\Task;
use App\Jobs\NotifyUserOnTask;
use Illuminate\Support\Facades\Auth;

class TaskService
{
    /**
     * Create a new task.
     */
    public function createTask(array $data): Task
    {
        $data['created_by'] = Auth::id();

        $task = Task::create($data);

        // Notify user if assigned upon creation
        if ($task->assigned_to) {
            $task->assignedTo->notify(new \App\Notifications\TaskAssignedNotification($task));
        }

        return $task;
    }

    /**
     * Update a task.
     */
    public function updateTask(Task $task, array $data): bool
    {
        $oldAssignee = $task->assigned_to;
        
        $updated = $task->update($data);

        // Notify new user if re-assigned during update
        if ($updated && $task->assigned_to && $oldAssignee !== $task->assigned_to) {
            $task->assignedTo->notify(new \App\Notifications\TaskAssignedNotification($task));
        }

        return $updated;
    }

    /**
     * Delete a task.
     */
    public function deleteTask(Task $task): ?bool
    {
        return $task->delete();
    }
}
