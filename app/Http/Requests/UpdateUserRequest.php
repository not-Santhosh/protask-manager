<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $this->user->id],
            'status' => ['required', 'string', 'in:active,inactive'],
            'role' => ['required', 'string', 'exists:roles,name'],
            'phone_number' => ['required', 'string', 'regex:/^[0-9]{10}$/']
        ];
    }
}