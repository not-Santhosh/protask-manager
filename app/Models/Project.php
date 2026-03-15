<?php

namespace App\Models;

use App\Enums\ProjectStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'status',
        'created_by',
        'due_date',
    ];

    protected $casts = [
        'due_date' => 'datetime',
        'status' => ProjectStatus::class,
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Scope a query to only include pending projects.
     */
    public function scopePending($query)
    {
        return $query->where('status', ProjectStatus::PENDING);
    }

    /**
     * Scope a query to only include in progress projects.
     */
    public function scopeInProgress($query)
    {
        return $query->where('status', ProjectStatus::IN_PROGRESS);
    }

    /**
     * Scope a query to only include completed projects.
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', ProjectStatus::COMPLETED);
    }
}
