<?php

use App\Caseimages;
use Illuminate\Database\Seeder;

class create_image_references extends Seeder
{
    /**
     * Run the image reference seeder
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i < 7; $i++) {
            (new Caseimages)->updateOrCreate([
                'imageurl' => '/images/cases/' . $i . '.png'
            ]);
        }
    }
}
