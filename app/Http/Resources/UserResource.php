<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\MissingValue;

use function Pest\Laravel\instance;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'status' => $this->status,
            'phone_number' => $this->phone_number,
            'role' => $this->whenLoaded('roles') instanceof MissingValue ? [] : $this->whenLoaded('roles')[0],
            'created_at' => $this->created_at?->format('Y-m-d'),
        ];
    }
}