<?php

use Illuminate\Database\Seeder;
use App\Http\Controllers\SteamLyticsController;

class create_items_via_steamlytics extends Seeder
{
    /**
     * Run the item seeder
     *
     * @return void
     */
    public function run()
    {
        $controller = new SteamLyticsController();
        $controller->populate();
    }
}
