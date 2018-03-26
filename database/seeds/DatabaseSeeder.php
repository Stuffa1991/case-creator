<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        echo "Creating image references \r\n";
        $this->call(create_image_references::class);
        echo "Calling steamlytics api to create items \r\n";
        $this->call(create_items_via_steamlytics::class);
        echo "Done";
    }
}
