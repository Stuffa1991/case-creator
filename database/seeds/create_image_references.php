<?php

use Illuminate\Database\Seeder;
use App\Caseimages;

class create_image_references extends Seeder
{
    /**
     * Run the image reference seeder
     *
     * @return void
     */
    public function run()
    {
         for($i = 1; $i < 7; $i++) {
           Caseimages::updateOrCreate([
             'imageurl' => '/images/cases/' . $i . '.png'
           ]);
         }
    }
}
