<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\User;

Broadcast::channel("v1.user.{id}", fn (User $user, int|string $id) => (string) $user->id === (string) $id);
