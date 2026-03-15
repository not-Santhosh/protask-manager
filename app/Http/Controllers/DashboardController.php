<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Services\DashboardService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected DashboardService $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function index()
    {
        $metrics = $this->dashboardService->getMetrics();
        $activeTasks = $this->dashboardService->getActiveTasks();

        return Inertia::render('Dashboard', array_merge($metrics, [
            'activeTasks' => TaskResource::collection($activeTasks),
        ]));
    }
}
