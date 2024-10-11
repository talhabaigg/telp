<?php

namespace Src\V0\Setting\Tests\Feature\Setting;

use Tripteki\Helpers\Traits\UserFactoryTrait;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SettingTest extends TestCase
{
    use RefreshDatabase, UserFactoryTrait;

    /**
     * @return void
     */
    public function test_users_can_viewAny_setting()
    {
        $user = $this->user();
        $this->actingAs($user);

        $this->test_users_can_update_setting();

        $data = $this->get(/* config("adminer.route.user") ?? */"api"."/settings");
        $data->assertStatus(200);
    }

    /**
     * @return void
     */
    public function test_users_can_update_setting()
    {
        $data = $this->post(/* config("adminer.route.admin") ?? */"api/admin"."/settings", [

            "key" => "ads",
            "value" => "0",
        ]);
        $data->assertStatus(201);

        $user = $this->user();
        $this->actingAs($user);

        $data = $this->put(/* config("adminer.route.user") ?? */"api"."/settings/ads", [

            "value" => "1",
        ]);
        $data->assertStatus(201);
    }

    /**
     * @return void
     */
    public function test_users_can_delete_setting()
    {
        $user = $this->user();
        $this->actingAs($user);

        $this->test_users_can_update_setting();

        $data = $this->delete(/* config("adminer.route.user") ?? */"api"."/settings/ads");
        $data->assertStatus(200);
    }
};
