<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\User;

// require __DIR__."/../src/V1/Api/User/Routes/channels.php"; //

Broadcast::channel("App.Models.User.{id}", fn (User $user, int|string $id) => (string) $user->id === (string) $id);
