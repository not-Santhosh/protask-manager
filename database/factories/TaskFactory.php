<?php

namespace Database\Factories;

use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'status' => fake()->randomElement([TaskStatus::PENDING, TaskStatus::IN_PROGRESS, TaskStatus::COMPLETED]),
            'priority' => fake()->randomElement([TaskPriority::LOW, TaskPriority::MEDIUM, TaskPriority::HIGH]),
            'due_date' => fake()->dateTimeBetween('now', '+6 months'),
            'created_by' => 1,
            'assigned_to' => 1,
            'project_id' => 1,
        ];
    }
}
