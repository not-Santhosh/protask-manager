<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Support\Facades\Auth;

class ProjectService
{
    /**
     * Create a new project.
     */
    public function createProject(array $data): Project
    {
        $data['created_by'] = Auth::id();

        return Project::create($data);
    }

    /**
     * Update a project.
     */
    public function updateProject(Project $project, array $data): bool
    {
        return $project->update($data);
    }

    /**
     * Delete a project.
     */
    public function deleteProject(Project $project): ?bool
    {
        return $project->delete();
    }
}
