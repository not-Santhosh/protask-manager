<x-mail::message>
# You Have Been Assigned a New Task

**Task Name:** {{ $task->name }}  
**Project:** {{ $task->project->name ?? 'N/A' }}  
**Priority:** {{ ucfirst($task->priority->value ?? $task->priority) }}  
**Due Date:** {{ $task->due_date ? (is_string($task->due_date) ? $task->due_date : $task->due_date->format('M j, Y')) : 'None' }}  

@if($task->description)
### Description  
{{ $task->description }}
@endif

<x-mail::button :url="url('/projects/' . $task->project_id)">
View Project Details
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
