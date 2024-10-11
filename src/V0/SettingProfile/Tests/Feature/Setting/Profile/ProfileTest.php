<?php

namespace Src\V0\SettingProfile\Tests\Feature\Setting\Profile;

use Tripteki\Helpers\Traits\UserFactoryTrait;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase, UserFactoryTrait;

    /**
     * @return void
     */
    public function test_users_can_viewAny_profile()
    {
        $user = $this->user();
        $this->actingAs($user);

        $this->test_users_can_update_profile();

        $data = $this->get(/* config("adminer.route.user") ?? */"api"."/profiles");
        $data->assertStatus(200);
    }

    /**
     * @return void
     */
    public function test_users_can_update_profile()
    {
        $admin = $this->post(/* config("adminer.route.admin") ?? */"api/admin"."/profiles", [

            "variable" => "theme",
            "value" => "light",
        ]);

        $user = $this->user();
        $this->actingAs($user);

        $data = $this->put(/* config("adminer.route.user") ?? */"api"."/profiles/theme", [

            "value" => "dark",
        ]);
        $data->assertStatus(201);
    }
};
