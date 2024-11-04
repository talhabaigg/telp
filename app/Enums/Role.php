<?php

namespace App\Enums;

/**
 * Enum representing roles.
 */
enum Role: string
{
    /**
     * Role for super administrators who have full access.
     */
    case SUPERADMIN = "superadmin";

    /**
     * Role for administrators with limited access.
     */
    case ADMINISTRATOR = "admin";
}
