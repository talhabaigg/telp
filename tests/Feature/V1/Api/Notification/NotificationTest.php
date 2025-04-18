<?php

namespace Tests\Feature\V1\Api\Notification;

use App\Models\User;
use Tests\TestCase;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NotificationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->actingAs($this->user, "api");
    }

    /**
     * @return void
     */
    public function test_notifications_index(): void
    {
        $test = $this->getJson("/api/v1/notifications");

        $test->assertStatus(200);
    }
}
