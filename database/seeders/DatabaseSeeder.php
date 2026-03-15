<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password123'),
        ]);

        Project::factory(5)->create([
            'created_by' => $user->id,
        ])->each(function ($project) use ($user) {
            Task::factory(10)->create([
                'project_id' => $project->id,
                'created_by' => $user->id,
                'assigned_to' => $user->id,
            ]);
        });
    }
}
