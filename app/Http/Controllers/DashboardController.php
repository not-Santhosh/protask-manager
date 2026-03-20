<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Services\DashboardService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Concurrency;
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
        $user = Auth::user();

        [$metrics, $activeTasks] = Concurrency::run([
            fn() => $this->dashboardService->getMetrics($user),
            fn() => $this->dashboardService->getActiveTasks($user),
        ]);

        return Inertia::render('Dashboard', [
             ...$metrics,
            'activeTasks' => TaskResource::collection($activeTasks),
        ]);
    }
}
