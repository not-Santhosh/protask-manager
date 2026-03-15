<?php

namespace App\Services;

use App\Enums\TaskStatus;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class DashboardService
{
    /**
     * Get dashboard metrics.
     */
    public function getMetrics(): array
    {
        $user = Auth::user();

        return [
            'totalProjects' => Project::count(),
            'myProjects' => Project::where('created_by', $user->id)->count(),
            'totalTasks' => Task::count(),
            'myTasks' => Task::where('assigned_to', $user->id)->count(),
            'pendingTasks' => Task::pending()->count(),
            'inProgressTasks' => Task::inProgress()->count(),
            'completedTasks' => Task::completed()->count(),
        ];
    }

    /**
     * Get active tasks for the current user.
     */
    public function getActiveTasks(int $limit = 10): \Illuminate\Database\Eloquent\Collection
    {
        return Task::query()
            ->with(['project', 'assignedTo', 'creator'])
            ->where('assigned_to', Auth::id())
            ->whereIn('status', [TaskStatus::PENDING, TaskStatus::IN_PROGRESS])
            ->limit($limit)
            ->get();
    }
}
