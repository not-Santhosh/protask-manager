<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

use App\Notifications\TaskAssignedNotification;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use App\Services\TaskService;
use Illuminate\Support\Facades\Notification;

it('dispatches the TaskAssignedNotification when a task is created and assigned', function () {
    Notification::fake();

    $user = User::factory()->create();
    $project = Project::factory()->create([
        'created_by' => $user->id,
    ]);

    $service = new TaskService();
    
    // Simulate auth
    \Illuminate\Support\Facades\Auth::login($user);

    $task = $service->createTask([
        'name' => 'Complete tests',
        'description' => 'Write test cases',
        'status' => 'pending',
        'priority' => 'high',
        'project_id' => $project->id,
        'assigned_to' => $user->id,
    ]);

    Notification::assertSentTo(
        [$user], TaskAssignedNotification::class, function ($notification) use ($task) {
            return $notification->task->id === $task->id;
        }
    );
});

it('does not dispatch the notification when task is unassigned on creation', function () {
    Notification::fake();

    $user = User::factory()->create();
    $project = Project::factory()->create([
        'created_by' => $user->id,
    ]);

    $service = new TaskService();
    \Illuminate\Support\Facades\Auth::login($user);

    $task = $service->createTask([
        'name' => 'Complete tests',
        'description' => 'Write test cases',
        'status' => 'pending',
        'priority' => 'high',
        'project_id' => $project->id,
        'assigned_to' => null,
    ]);

    Notification::assertNothingSent();
});

it('builds the task assigned email from the notification', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com'
    ]);
    
    $project = Project::factory()->create([
        'created_by' => $user->id,
    ]);

    $task = Task::factory()->create([
        'assigned_to' => $user->id,
        'project_id' => $project->id,
        'created_by' => $user->id,
    ]);

    $notification = new TaskAssignedNotification($task);
    
    $mail = $notification->toMail($user);
    
    expect($mail)->toBeInstanceOf(App\Mail\TaskAssignedMail::class);
    expect($mail->task->id)->toBe($task->id);
});
