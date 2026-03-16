<?php

namespace App\Jobs;

use App\Models\Task;
use App\Mail\TaskAssignedMail;
use App\Notifications\TaskAssignedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class NotifyUserOnTask implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Task $task)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if ($this->task->assigned_to) {
            $user = $this->task->assignedTo;
            if ($user && $user->email) {
                $user->notify(new TaskAssignedNotification($this->task));
            }
        }
    }
}
